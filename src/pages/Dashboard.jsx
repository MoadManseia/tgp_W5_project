import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import ChatList from '../components/Chat/ChatList';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatWindow from '../components/Chat/ChatWindow';
import MessageInput from '../components/Chat/MessageInput';
import SettingsPage from './Settings';

// Mock data
const mockChats = [
  { id: 1, name: 'Support Team', lastMessage: 'How can I help you?', unread: 2 },
  { id: 2, name: 'John Smith', lastMessage: 'Meeting tomorrow at 3 PM', unread: 0 },
  { id: 3, name: 'Sarah Johnson', lastMessage: 'Thanks for your help!', unread: 1 },
  { id: 4, name: 'Tech Support', lastMessage: 'Your issue has been resolved', unread: 0 },
  { id: 5, name: 'Marketing Team', lastMessage: 'New campaign launch', unread: 3 },
];

const mockMessages = [
  { id: 1, content: 'Hello! How can I help you today?', senderId: 2, timestamp: new Date(Date.now() - 3600000) },
  { id: 2, content: 'I need help with my account settings', senderId: 1, timestamp: new Date(Date.now() - 1800000) },
  { id: 3, content: 'Sure, I can help with that. What seems to be the issue?', senderId: 2, timestamp: new Date(Date.now() - 900000) },
  { id: 4, content: 'I cannot find the privacy settings', senderId: 1, timestamp: new Date(Date.now() - 600000) },
  { id: 5, content: 'Go to Settings > Privacy to adjust your preferences', senderId: 2, timestamp: new Date(Date.now() - 300000) },
];

const Dashboard = ({ user, onLogout }) => {
  const [chats] = useState(mockChats);
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    // In a real app, you would fetch messages for the active chat here
    // For now, we're using mock data
  }, [activeChat]);

  const handleSendMessage = (content) => {
    const newMessage = {
      id: messages.length + 1,
      content,
      senderId: user.id,
      timestamp: new Date(),
    };
    
    // Add user's message
    setMessages([...messages, newMessage]);
    
    // Auto-response after a short delay (simulating typing)
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        content: getBotResponse(content),
        senderId: 2, // Bot user ID
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  // Function to generate bot responses based on user input
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! How can I help you today?';
    } else if (message.includes('help')) {
      return 'I\'d be happy to help! What do you need assistance with?';
    } else if (message.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help with?';
    } else if (message.includes('bye') || message.includes('goodbye')) {
      return 'Goodbye! Have a great day!';
    } else if (message.includes('how are you')) {
      return 'I\'m doing well, thank you for asking! How can I assist you?';
    } else {
      // Default responses
      const responses = [
        'I understand. Can you tell me more about that?',
        'That\'s interesting. How can I help with that?',
        'I see. Let me know if you need any assistance.',
        'Thanks for sharing! Is there something specific you\'d like help with?',
        'Got it. Feel free to ask if you have any questions!'
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'settings':
        return <SettingsPage user={user} />;
      case 'dashboard':
      default:
        return (

          // <div className="flex-1 flex flex-col md:flex-row">
          // {/* Chat List - Hidden on mobile when chat is open, shown on desktop */}
          // <div className={`${activeChat ? 'hidden md:block' : 'block'} w-full md:w-80`}>

<div className="flex-1 flex flex-col md:flex-row h-full">
            {/* Chat List */}
            <div className="w-full md:w-80 max-w-full md:max-w-xs border-r border-gray-200 bg-white overflow-y-auto">
              <ChatList 
                chats={chats} 
                activeChat={activeChat} 
                onSelectChat={setActiveChat} 
              />
            </div>
        {/* Chat Area - Show back button on mobile
        <div className="flex-1 flex flex-col"> */}





            {/* Chat Area */}
            <div className="flex flex-col flex-1 h-full">
              <ChatHeader chat={activeChat} />
              <ChatWindow messages={messages} currentUser={user} />
              <MessageInput onSendMessage={handleSendMessage} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        onLogout={onLogout} 
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {/* Main Content */}
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;