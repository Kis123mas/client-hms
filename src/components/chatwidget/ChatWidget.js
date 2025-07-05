import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaCommentMedical } from 'react-icons/fa';
import './ChatWidget.css';

const ChatWidget = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello Doctor! I'm your AI Medical Assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Medical knowledge base (simplified for demo)
  const medicalKnowledge = {
    "hypertension": "Hypertension management includes lifestyle modifications (DASH diet, exercise) and medications like ACE inhibitors, ARBs, or calcium channel blockers.",
    "diabetes": "Diabetes management focuses on glycemic control through diet, exercise, metformin, and possibly insulin. Monitor HbA1c every 3-6 months.",
    "asthma": "Asthma treatment involves inhaled corticosteroids (ICS) for maintenance and SABAs for rescue. Consider LABA combo for uncontrolled asthma.",
    "depression": "First-line antidepressants are SSRIs (e.g., sertraline, escitalopram). Combine with psychotherapy for better outcomes.",
    "default": "I'm a medical AI assistant. For accurate information, please provide more details about the condition, including symptoms, duration, and any relevant test results."
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const query = userMessage.toLowerCase();
      let response = medicalKnowledge.default;
      
      Object.keys(medicalKnowledge).forEach(key => {
        if (query.includes(key) && key !== "default") {
          response = medicalKnowledge[key];
        }
      });
      
      if (query.includes("treatment") || query.includes("management")) {
        response += " Always consider patient comorbidities and contraindications when prescribing.";
      } else if (query.includes("diagnosis") || query.includes("differential")) {
        response = "For diagnosis, consider history, physical exam, and appropriate tests. Differential diagnosis depends on presenting symptoms.";
      }
      
      const aiMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    simulateAIResponse(newMessage);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <div className="header-icon">
              <FaRobot className="ai-icon" />
              <span>AI Assistant</span>
            </div>
            <button 
              className="chat-close-button"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="chat-messages">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`message ${message.sender}`}
              >
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-time">
                  {message.timestamp}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message ai">
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about conditions, treatments..."
              className="chat-input"
            />
            <button type="submit" className="send-button">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      <button 
        className="chat-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
      >
        {isOpen ? <FaTimes /> : <FaCommentMedical />}
      </button>
    </div>
  );
};

export default ChatWidget;