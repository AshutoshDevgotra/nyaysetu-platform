#!/usr/bin/env python3
"""
NyaySetu Legal RAG Backend
FastAPI server with Ollama and HuggingFace fallback support
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
import httpx
import os
from typing import Optional, List, Dict, Any
import asyncio
from datetime import datetime
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="NyaySetu Legal RAG API",
    description="RAG-powered legal document analysis system",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2")
HF_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
HF_MODEL = os.getenv("HF_MODEL", "microsoft/DialoGPT-medium")

class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    answer: str
    metadata: Dict[str, Any]
    sources: Optional[List[Dict[str, Any]]] = None
    confidence: Optional[float] = None

class RAGBackend:
    def __init__(self):
        self.ollama_available = False
        self.hf_available = bool(HF_API_KEY)
        
    async def check_ollama_availability(self) -> bool:
        """Check if Ollama is available and running"""
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                response = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
                self.ollama_available = response.status_code == 200
                logger.info(f"Ollama availability: {self.ollama_available}")
                return self.ollama_available
        except Exception as e:
            logger.warning(f"Ollama not available: {e}")
            self.ollama_available = False
            return False
    
    async def query_ollama(self, query: str) -> Optional[Dict[str, Any]]:
        """Query Ollama local model"""
        if not await self.check_ollama_availability():
            return None
            
        try:
            legal_prompt = f"""You are a knowledgeable Indian legal assistant. Provide accurate, helpful legal information based on Indian law.

Query: {query}

Please provide:
1. A clear, informative response about the legal matter
2. Relevant legal provisions or acts if applicable
3. Practical guidance where appropriate
4. Disclaimer about seeking professional legal advice

Response:"""

            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{OLLAMA_BASE_URL}/api/generate",
                    json={
                        "model": OLLAMA_MODEL,
                        "prompt": legal_prompt,
                        "stream": False,
                        "options": {
                            "temperature": 0.7,
                            "top_p": 0.9,
                            "num_predict": 512
                        }
                    }
                )
                
                if response.status_code == 200:
                    result = response.json()
                    return {
                        "answer": result.get("response", "No response generated"),
                        "metadata": {
                            "model": OLLAMA_MODEL,
                            "backend": "ollama",
                            "timestamp": datetime.now().isoformat(),
                            "model_info": result.get("model", ""),
                            "prompt_eval_count": result.get("prompt_eval_count", 0),
                            "eval_count": result.get("eval_count", 0)
                        },
                        "confidence": 0.85,
                        "sources": None
                    }
        except Exception as e:
            logger.error(f"Ollama query failed: {e}")
            return None
    
    async def query_huggingface(self, query: str) -> Optional[Dict[str, Any]]:
        """Fallback to HuggingFace API"""
        if not self.hf_available:
            return None
            
        try:
            headers = {"Authorization": f"Bearer {HF_API_KEY}"}
            
            # For legal queries, we'll use a general approach
            legal_context = f"Legal Query: {query}\n\nProvide helpful legal information based on Indian law:"
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"https://api-inference.huggingface.co/models/{HF_MODEL}",
                    headers=headers,
                    json={"inputs": legal_context},
                )
                
                if response.status_code == 200:
                    result = response.json()
                    
                    # Handle different response formats
                    if isinstance(result, list) and len(result) > 0:
                        answer = result[0].get("generated_text", "No response generated")
                    elif isinstance(result, dict):
                        answer = result.get("generated_text", str(result))
                    else:
                        answer = "Unable to process response from HuggingFace"
                    
                    return {
                        "answer": answer,
                        "metadata": {
                            "model": HF_MODEL,
                            "backend": "huggingface",
                            "timestamp": datetime.now().isoformat(),
                            "fallback": True
                        },
                        "confidence": 0.75,
                        "sources": None
                    }
        except Exception as e:
            logger.error(f"HuggingFace query failed: {e}")
            return None
    
    def generate_fallback_response(self, query: str) -> Dict[str, Any]:
        """Generate a static fallback response when all backends fail"""
        return {
            "answer": f"""I apologize, but the AI legal assistant is currently experiencing technical difficulties. Here's some general guidance for your query: "{query}"

**General Legal Resources:**
• Supreme Court of India: sci.gov.in
• Ministry of Law and Justice: lawmin.gov.in  
• Indian Kanoon (free case law database): indiankanoon.org
• Bar Council of India: barcouncilofindia.org

**Common Legal Information:**
• Fundamental Rights: Articles 12-35 of the Indian Constitution
• Criminal Law: Indian Penal Code (IPC) and Criminal Procedure Code (CrPC)
• Civil Law: Code of Civil Procedure (CPC) and Indian Contract Act
• Personal Laws: Vary based on religion and community

**Important Disclaimer:**
This is a general response due to technical difficulties. Always seek professional legal advice for your specific situation. Laws may have changed since the last update.""",
            "metadata": {
                "backend": "static_fallback", 
                "timestamp": datetime.now().isoformat(),
                "fallback": True,
                "reason": "all_backends_unavailable"
            },
            "confidence": 0.3,
            "sources": None
        }

# Initialize RAG backend
rag = RAGBackend()

@app.on_event("startup")
async def startup_event():
    """Initialize the RAG system on startup"""
    logger.info("Starting NyaySetu Legal RAG Backend...")
    await rag.check_ollama_availability()
    logger.info(f"Ollama available: {rag.ollama_available}")
    logger.info(f"HuggingFace available: {rag.hf_available}")

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "NyaySetu Legal RAG Backend",
        "status": "running",
        "ollama_available": rag.ollama_available,
        "huggingface_available": rag.hf_available,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    ollama_status = await rag.check_ollama_availability()
    return {
        "status": "healthy",
        "backends": {
            "ollama": {
                "available": ollama_status,
                "url": OLLAMA_BASE_URL,
                "model": OLLAMA_MODEL
            },
            "huggingface": {
                "available": rag.hf_available,
                "model": HF_MODEL
            }
        },
        "timestamp": datetime.now().isoformat()
    }

@app.post("/ask", response_model=QueryResponse)
async def ask_question(request: QueryRequest):
    """Main endpoint for legal queries"""
    try:
        query = request.query.strip()
        if not query:
            raise HTTPException(status_code=400, detail="Query cannot be empty")
        
        logger.info(f"Processing query: {query[:100]}...")
        
        # Try Ollama first
        result = await rag.query_ollama(query)
        if result:
            logger.info("Successfully processed with Ollama")
            return QueryResponse(**result)
        
        # Fallback to HuggingFace
        result = await rag.query_huggingface(query)
        if result:
            logger.info("Successfully processed with HuggingFace fallback")
            return QueryResponse(**result)
        
        # Final static fallback
        logger.warning("All backends failed, using static fallback")
        result = rag.generate_fallback_response(query)
        return QueryResponse(**result)
        
    except Exception as e:
        logger.error(f"Error processing query: {e}")
        result = rag.generate_fallback_response(request.query)
        return QueryResponse(**result)

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8082"))
    uvicorn.run(app, host="0.0.0.0", port=port, log_level="info")
