"use client";
import React, { useState } from "react";
import { MessageSquare, RefreshCw, Download, Settings } from "lucide-react";

interface FloatingActionsProps {
  onClearChat: () => void;
  onExportChat: () => void;
  messagesCount: number;
}

export default function FloatingActions({ onClearChat, onExportChat, messagesCount }: FloatingActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExportChat = () => {
    onExportChat();
    setIsOpen(false);
  };

  const handleClearChat = () => {
    onClearChat();
    setIsOpen(false);
  };

  if (messagesCount === 0) return null;

  return (
    <div className="floating-actions">
      <div className={`actions-menu ${isOpen ? 'open' : ''}`}>
        <button
          onClick={handleExportChat}
          className="action-item"
          title="Export Chat"
        >
          <Download className="action-icon" />
          <span>Export</span>
        </button>
        
        <button
          onClick={handleClearChat}
          className="action-item"
          title="Clear Chat"
        >
          <RefreshCw className="action-icon" />
          <span>Clear</span>
        </button>
      </div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fab-button ${isOpen ? 'open' : ''}`}
        title="Chat Actions"
      >
        <Settings className="fab-icon" />
      </button>
      
      <style jsx>{`
        .floating-actions {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
        }
        
        .actions-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
          opacity: 0;
          transform: translateY(10px) scale(0.95);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
        
        .actions-menu.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: all;
        }
        
        .action-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(16, 185, 129, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: white;
          padding: 12px 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
          font-weight: 500;
          min-width: 120px;
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
        }
        
        .action-item:hover {
          background: rgba(16, 185, 129, 1);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
        }
        
        .action-icon {
          width: 16px;
          height: 16px;
        }
        
        .fab-button {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: white;
        }
        
        .fab-button:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 40px rgba(16, 185, 129, 0.5);
        }
        
        .fab-button.open {
          transform: rotate(45deg);
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }
        
        .fab-button.open:hover {
          transform: rotate(45deg) scale(1.1);
          box-shadow: 0 12px 40px rgba(239, 68, 68, 0.5);
        }
        
        .fab-icon {
          width: 24px;
          height: 24px;
          transition: transform 0.3s ease;
        }
        
        @media (max-width: 640px) {
          .floating-actions {
            bottom: 20px;
            right: 20px;
          }
          
          .fab-button {
            width: 48px;
            height: 48px;
          }
          
          .fab-icon {
            width: 20px;
            height: 20px;
          }
          
          .action-item {
            padding: 10px 14px;
            font-size: 13px;
            min-width: 100px;
          }
        }
      `}</style>
    </div>
  );
}
