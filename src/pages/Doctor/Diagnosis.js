import React, { useState, useRef, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import TopNav from '../../components/topNav/TopNav';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import { 
  FiArrowLeft, 
  FiSend, 
  FiUser,
  FiX,
  FiShare2
} from 'react-icons/fi';
import './disgnos.css';

function DiagnosisPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPatientPanel, setShowPatientPanel] = useState(false);
  const [showReferModal, setShowReferModal] = useState(false);
  const [referralData, setReferralData] = useState({
    department: '',
    reason: '',
    instructions: ''
  });
  const messagesEndRef = useRef(null);
  
  // Sample patient data
  const patient = {
    id: 'PAT-789456',
    name: 'John Doe',
    age: 42,
    gender: 'Male',
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    medications: ['Lisinopril 10mg daily', 'Metformin 500mg twice daily'],
    lastVisit: '2023-06-15',
    vitals: {
      bp: '142/88',
      hr: 72,
      temp: 98.6,
      weight: 185
    }
  };

  const departments = [
    'Cardiology',
    'Neurology',
    'Endocrinology',
    'Gastroenterology',
    'Pulmonology',
    'Radiology',
    'Orthopedics',
    'Dermatology'
  ];

  const crumbs = [
    { label: 'Dashboard', path: '/' },
    { label: 'Patients', path: '/patients' },
    { label: 'John Doe', path: '/patients/123' },
    { label: 'AI Diagnosis', path: '/patients/123/diagnosis' }
  ];

  // Initial system message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: 'ai',
        content: `Hello Doctor. I'm your AI diagnostic assistant. I can help analyze ${patient.name}'s case. Here's what I know about the patient:
        
        - Age: ${patient.age}
        - Gender: ${patient.gender}
        - Conditions: ${patient.conditions.join(', ')}
        - Medications: ${patient.medications.join(', ')}
        - Last Visit: ${patient.lastVisit}
        
        How can I assist you with this patient's diagnosis today?`,
        timestamp: new Date().toISOString()
      }
    ]);
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const togglePatientPanel = () => {
    setShowPatientPanel(!showPatientPanel);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = generateAiResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAiResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('suggest') || lowerInput.includes('diagnosis') || lowerInput.includes('possible')) {
      return {
        id: messages.length + 2,
        sender: 'ai',
        content: `Based on the patient's history and your input, here are possible diagnoses to consider:
        
        1. **Uncontrolled Hypertension** (ICD-10: I10)
           - Confidence: 85%
           - Rationale: Patient has history of hypertension and recent elevated BP (${patient.vitals.bp})
        
        2. **Type 2 Diabetes with Hyperglycemia** (ICD-10: E11.65)
           - Confidence: 78%
           - Rationale: Elevated HbA1c levels and patient-reported symptoms
        
        Would you like me to elaborate on any of these or consider other possibilities?`,
        timestamp: new Date().toISOString()
      };
    } else if (lowerInput.includes('treatment') || lowerInput.includes('manage')) {
      return {
        id: messages.length + 2,
        sender: 'ai',
        content: `For treatment options, considering the patient's current medications:
        
        **For Hypertension:**
        - Consider increasing Lisinopril dose or adding a calcium channel blocker
        - Recommend lifestyle modifications (DASH diet, sodium restriction)
        
        **For Diabetes:**
        - Consider adding SGLT2 inhibitor for additional benefits
        - Recommend regular glucose monitoring
        
        Would you like specific medication dosages or alternative treatment options?`,
        timestamp: new Date().toISOString()
      };
    } else {
      return {
        id: messages.length + 2,
        sender: 'ai',
        content: `I've analyzed your query about "${userInput}". For more specific recommendations, could you provide:
        
        - Current symptoms the patient is experiencing
        - Recent lab results or vital signs
        - Any changes in medication adherence
        
        This will help me give you more targeted advice.`,
        timestamp: new Date().toISOString()
      };
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setShowPatientPanel(false); // Auto-close patient panel on mobile when selecting a question
  };

  const handleReferralSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the referral data to your backend
    console.log('Referral submitted:', referralData);
    
    // Add a message to the chat about the referral
    const referralMessage = {
      id: messages.length + 1,
      sender: 'system',
      content: `Patient referred to ${referralData.department} department.
      
      **Reason:** ${referralData.reason}
      
      **Instructions:** ${referralData.instructions}`,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, referralMessage]);
    setShowReferModal(false);
    setReferralData({
      department: '',
      reason: '',
      instructions: ''
    });
  };

  const handleReferralChange = (e) => {
    const { name, value } = e.target;
    setReferralData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <MainLayout isCollapsed={isSidebarCollapsed}>
      <div className="fixed-header">
        <TopNav onMenuClick={toggleSidebar} />
        <BreadCrums items={crumbs} />
      </div>

      <div className="scrollable-content">
        <div className="diagnosis-container">
          <div className="diagnosis-header">
            <div className="header-left">
              <button className="back-button">
                <FiArrowLeft /> Back
              </button>
              <button 
                className="patient-toggle mobile-only"
                onClick={togglePatientPanel}
              >
                {showPatientPanel ? <FiX /> : <FiUser />}
              </button>
            </div>
            <div className="header-actions">
              <button 
                className="refer-button"
                onClick={() => setShowReferModal(true)}
              >
                <FiShare2 /> <span className="desktop-only">Refer Patient</span>
              </button>
            </div>
          </div>

          {/* Referral Modal */}
          {showReferModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Refer Patient to Department</h3>
                  <button 
                    className="close-button"
                    onClick={() => setShowReferModal(false)}
                  >
                    <FiX />
                  </button>
                </div>
                <form onSubmit={handleReferralSubmit}>
                  <div className="form-group">
                    <label>Select Department</label>
                    <select
                      name="department"
                      value={referralData.department}
                      onChange={handleReferralChange}
                      required
                    >
                      <option value="">-- Select Department --</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Reason for Referral</label>
                    <input
                      type="text"
                      name="reason"
                      value={referralData.reason}
                      onChange={handleReferralChange}
                      placeholder="Briefly describe why you're referring the patient"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Instructions for Receiving Department</label>
                    <textarea
                      name="instructions"
                      value={referralData.instructions}
                      onChange={handleReferralChange}
                      placeholder="Any specific tests, evaluations, or treatments you'd like them to consider"
                      rows="4"
                      required
                    />
                  </div>
                  
                  <div className="modal-actions">
                    <button 
                      type="button" 
                      className="cancel-button"
                      onClick={() => setShowReferModal(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="submit-button"
                    >
                      Send Referral
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className={`ai-chat-container ${showPatientPanel ? 'patient-panel-open' : ''}`}>
            <div className={`patient-info-card ${showPatientPanel ? 'mobile-visible' : ''}`}>
              <h3><FiUser /> Patient Information</h3>
              <div className="info-section">
                <h4>Demographics</h4>
                <div className="info-item">
                  <strong>Name:</strong> {patient.name}
                </div>
                <div className="info-item">
                  <strong>Age/Gender:</strong> {patient.age}yo {patient.gender}
                </div>
              </div>

              <div className="info-section">
                <h4>Medical Info</h4>
                <div className="info-item">
                  <strong>Conditions:</strong> {patient.conditions.join(', ')}
                </div>
                <div className="info-item">
                  <strong>Medications:</strong> {patient.medications.join(', ')}
                </div>
                <div className="info-item">
                  <strong>Last Visit:</strong> {patient.lastVisit}
                </div>
              </div>

              <div className="info-section">
                <h4>Recent Vitals</h4>
                <div className="vitals-grid">
                  <div className="vital-item">
                    <div className="vital-label">BP</div>
                    <div className="vital-value">{patient.vitals.bp}</div>
                  </div>
                  <div className="vital-item">
                    <div className="vital-label">HR</div>
                    <div className="vital-value">{patient.vitals.hr}</div>
                  </div>
                  <div className="vital-item">
                    <div className="vital-label">Temp</div>
                    <div className="vital-value">{patient.vitals.temp}°F</div>
                  </div>
                  <div className="vital-item">
                    <div className="vital-label">Weight</div>
                    <div className="vital-value">{patient.vitals.weight}lbs</div>
                  </div>
                </div>
              </div>
              
              <div className="quick-questions">
                <h4>Quick Questions</h4>
                <button onClick={() => handleQuickQuestion("Suggest possible diagnoses")}>
                  Suggest diagnoses
                </button>
                <button onClick={() => handleQuickQuestion("Treatment options?")}>
                  Treatment ideas
                </button>
                <button onClick={() => handleQuickQuestion("Differential diagnosis for fatigue")}>
                  Fatigue DDx
                </button>
                <button onClick={() => handleQuickQuestion("Any medication interactions?")}>
                  Drug interactions
                </button>
              </div>
            </div>

            <div className="chat-window">
              <div className="messages-container">
                {messages.map((message) => (
                  <div key={message.id} className={`message ${message.sender}`}>
                    <div className="message-content">
                      {message.content.split('\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                    <div className="message-timestamp">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="message ai">
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="message-input">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask the AI about this patient's diagnosis..."
                />
                <button type="submit" disabled={isLoading}>
                  <FiSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default DiagnosisPage;