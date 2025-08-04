"use client";
import React, { useState, useEffect } from "react";
import { Copy, ThumbsUp, ThumbsDown, User, Bot, Check } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatResponseProps {
  messages: ChatMessage[];
  loading?: boolean;
}

const TypingAnimation = () => (
  <div className="typing-animation">
    <div className="typing-dot"></div>
    <div className="typing-dot"></div>
    <div className="typing-dot"></div>
    <style jsx>{`
      .typing-animation {
        display: flex;
        gap: 4px;
        padding: 12px 0;
      }
      
      .typing-dot {
        width: 8px;
        height: 8px;
        background-color: #64748b;
        border-radius: 50%;
        animation: typing 1.4s infinite ease-in-out;
      }
      
      .typing-dot:nth-child(1) { animation-delay: -0.32s; }
      .typing-dot:nth-child(2) { animation-delay: -0.16s; }
      
      @keyframes typing {
        0%, 80%, 100% {
          transform: scale(0);
          opacity: 0.5;
        }
        40% {
          transform: scale(1);
          opacity: 1;
        }
      }
    `}</style>
  </div>
);

const TypewriterEffect = ({ text, speed = 30 }: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}</span>;
};

const MessageBubble = ({ message, showTypewriter = false }: { message: ChatMessage; showTypewriter?: boolean }) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedback = (type: 'up' | 'down') => {
    const newFeedback = feedback === type ? null : type;
    setFeedback(newFeedback);

    // Here you could send feedback to analytics or backend
    if (newFeedback) {
      console.log(`User ${newFeedback === 'up' ? 'liked' : 'disliked'} response:`, message.content.substring(0, 100));
      // Example: sendFeedback(message.id, newFeedback);
    }
  };

  const isUser = message.type === "user";
  
  return (
    <div className={`message-container ${isUser ? 'user-message' : 'assistant-message'}`}>
      <div className="message-avatar">
        {isUser ? (
          <User className="avatar-icon" />
        ) : (
          <Bot className="avatar-icon" />
        )}
      </div>
      
      <div className="message-content">
        <div className="message-header">
          <span className="message-sender">
            {isUser ? "You" : "Legal AI Assistant"}
          </span>
          <span className="message-time">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <div className="message-bubble">
          <div className="message-text">
            {showTypewriter && !isUser ? (
              <TypewriterEffect text={message.content} />
            ) : isUser ? (
              message.content
            ) : (
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>{children}</p>,
                  ul: ({ children }) => <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>{children}</ul>,
                  ol: ({ children }) => <ol style={{ marginLeft: '20px', marginBottom: '12px' }}>{children}</ol>,
                  li: ({ children }) => <li style={{ marginBottom: '4px' }}>{children}</li>,
                  strong: ({ children }) => <strong style={{ fontWeight: '600', color: '#d1fae5' }}>{children}</strong>,
                  em: ({ children }) => <em style={{ fontStyle: 'italic', color: '#a7f3d0' }}>{children}</em>,
                  code: ({ children }) => (
                    <code style={{
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontFamily: 'monospace',
                      color: '#10b981'
                    }}>
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      padding: '12px',
                      borderRadius: '8px',
                      overflow: 'auto',
                      marginBottom: '12px',
                      border: '1px solid rgba(16, 185, 129, 0.2)'
                    }}>
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote style={{
                      borderLeft: '4px solid #10b981',
                      paddingLeft: '16px',
                      marginLeft: '0',
                      marginBottom: '12px',
                      fontStyle: 'italic',
                      color: '#a7f3d0'
                    }}>
                      {children}
                    </blockquote>
                  ),
                  h1: ({ children }) => <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#d1fae5' }}>{children}</h1>,
                  h2: ({ children }) => <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#d1fae5' }}>{children}</h2>,
                  h3: ({ children }) => <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: '#d1fae5' }}>{children}</h3>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
          
          {!isUser && !showTypewriter && (
            <div className="message-actions">
              <button
                onClick={handleCopy}
                className={`action-button copy-button ${copied ? 'copied' : ''}`}
                title="Copy response"
              >
                {copied ? <Check className="action-icon" /> : <Copy className="action-icon" />}
              </button>
              
              <button
                onClick={() => handleFeedback('up')}
                className={`action-button feedback-button ${feedback === 'up' ? 'active' : ''}`}
                title="Good response"
              >
                <ThumbsUp className="action-icon" />
              </button>
              
              <button
                onClick={() => handleFeedback('down')}
                className={`action-button feedback-button ${feedback === 'down' ? 'active' : ''}`}
                title="Poor response"
              >
                <ThumbsDown className="action-icon" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .message-container {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          animation: messageSlideIn 0.3s ease-out;
        }
        
        .user-message {
          flex-direction: row-reverse;
        }
        
        .message-avatar {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }
        
        .user-message .message-avatar {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
        }
        
        .assistant-message .message-avatar {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }
        
        .avatar-icon {
          width: 20px;
          height: 20px;
        }
        
        .message-content {
          flex: 1;
          max-width: calc(100% - 56px);
        }
        
        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          gap: 12px;
        }
        
        .message-sender {
          font-weight: 600;
          color: #e2e8f0;
          font-size: 14px;
        }
        
        .message-time {
          font-size: 12px;
          color: #64748b;
          white-space: nowrap;
        }
        
        .message-bubble {
          position: relative;
          padding: 16px 20px;
          border-radius: 16px;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        
        .user-message .message-bubble {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border-bottom-right-radius: 4px;
        }
        
        .assistant-message .message-bubble {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1));
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #f1f5f9;
          border-bottom-left-radius: 4px;
        }
        
        .message-text {
          line-height: 1.6;
          font-size: 15px;
          white-space: pre-wrap;
        }
        
        .message-actions {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(16, 185, 129, 0.1);
        }
        
        .action-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 8px;
          background: rgba(16, 185, 129, 0.1);
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .action-button:hover {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          transform: scale(1.05);
        }
        
        .action-button.active,
        .action-button.copied {
          background: rgba(16, 185, 129, 0.3);
          color: #10b981;
        }
        
        .action-icon {
          width: 16px;
          height: 16px;
        }
        
        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 640px) {
          .message-container {
            gap: 12px;
            margin-bottom: 20px;
          }
          
          .message-avatar {
            width: 36px;
            height: 36px;
          }
          
          .avatar-icon {
            width: 18px;
            height: 18px;
          }
          
          .message-bubble {
            padding: 12px 16px;
          }
          
          .message-text {
            font-size: 14px;
          }
          
          .message-header {
            margin-bottom: 6px;
          }
        }
      `}</style>
    </div>
  );
};

export default function ChatResponse({ messages, loading = false }: ChatResponseProps) {
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    if (isAtBottom) {
      const chatContainer = document.querySelector('.chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [messages, isAtBottom]);

  const lastMessage = messages[messages.length - 1];
  const shouldShowTypewriter = lastMessage?.type === 'assistant' && !loading;

  return (
    <div className="chat-response-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            showTypewriter={shouldShowTypewriter && index === messages.length - 1}
          />
        ))}
        
        {loading && (
          <div className="message-container assistant-message">
            <div className="message-avatar">
              <Bot className="avatar-icon" />
            </div>
            <div className="message-content">
              <div className="message-header">
                <span className="message-sender">Legal AI Assistant</span>
              </div>
              <div className="message-bubble loading-bubble">
                <TypingAnimation />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .chat-response-container {
          width: 100%;
        }
        
        .chat-messages {
          max-height: 600px;
          overflow-y: auto;
          padding: 20px 0;
          scroll-behavior: smooth;
        }
        
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        
        .chat-messages::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }
        
        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 3px;
        }
        
        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
        
        .loading-bubble {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1));
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-bottom-left-radius: 4px;
        }
        
        .message-container .message-avatar {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }
        
        .avatar-icon {
          width: 20px;
          height: 20px;
        }
      `}</style>
    </div>
  );
}
