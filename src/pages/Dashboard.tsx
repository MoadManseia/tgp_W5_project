import React, { useState, useEffect } from "react";
import Sidebar from "../components/Layout/Sidebar";
import ChatHeader from "../components/Chat/ChatHeader";
import ChatWindow from "../components/Chat/ChatWindow";
import MessageInput from "../components/Chat/MessageInput";
import ProfileDetails from "../components/Chat/ProfileDetails";
import SettingsPage from "./Settings";
import type { AppUser } from "../App";

export type Chat = {
  id: number;
  name: string;
  lastMessage: string;
  unread: number;
  profilePic?: string;
  lastActiveMinutes?: number;
  phone?: string;
  email?: string;
};

export type Message = {
  id: number;
  content: string;
  senderId: number;
  timestamp: Date;
};

// Mock data
const mockChats: Chat[] = [
  {
    id: 1,
    name: "Support Team",
    lastMessage: "How can I help you?",
    unread: 2,
    profilePic: "https://ui-avatars.com/api/?name=Support+Team",
  },
  {
    id: 2,
    name: "John Smith",
    lastMessage: "Meeting tomorrow at 3 PM",
    unread: 0,
    profilePic: "https://ui-avatars.com/api/?name=John+Smith",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    lastMessage: "Thanks for your help!",
    unread: 1,
    profilePic: "https://ui-avatars.com/api/?name=Sarah+Johnson",
  },
  {
    id: 4,
    name: "Tech Support",
    lastMessage: "Your issue has been resolved",
    unread: 0,
    profilePic: "https://ui-avatars.com/api/?name=Tech+Support",
  },
  {
    id: 5,
    name: "Marketing Team",
    lastMessage: "New campaign launch",
    unread: 3,
    profilePic: "https://ui-avatars.com/api/?name=Marketing+Team",
  },
];

// Initialize messages for each chat
// Use offset to avoid conflicts between user.id and chat.id
// Chat participants use chatId + 1000 as senderId
const getChatParticipantId = (chatId: number): number => chatId + 1000;

const initializeMessages = (userId: number): Map<number, Message[]> => {
  const messagesMap = new Map<number, Message[]>();
  
  // Messages for Support Team (chat id: 1)
  messagesMap.set(1, [
    {
      id: 1,
      content: "Hello! How can I help you today?",
      senderId: getChatParticipantId(1), // Support Team (1001)
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      content: "I need help with my account settings",
      senderId: userId, // Current user
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: 3,
      content: "Sure, I can help with that. What seems to be the issue?",
      senderId: getChatParticipantId(1),
      timestamp: new Date(Date.now() - 900000),
    },
  ]);

  // Messages for John Smith (chat id: 2)
  messagesMap.set(2, [
    {
      id: 4,
      content: "Hi, are we still meeting tomorrow?",
      senderId: getChatParticipantId(2), // John Smith (1002)
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: 5,
      content: "Yes, meeting tomorrow at 3 PM",
      senderId: userId,
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 6,
      content: "Perfect! See you then.",
      senderId: getChatParticipantId(2),
      timestamp: new Date(Date.now() - 1800000),
    },
  ]);

  // Messages for Sarah Johnson (chat id: 3)
  messagesMap.set(3, [
    {
      id: 7,
      content: "Thank you so much for your help!",
      senderId: getChatParticipantId(3), // Sarah Johnson (1003)
      timestamp: new Date(Date.now() - 5400000),
    },
    {
      id: 8,
      content: "You're welcome! Happy to help.",
      senderId: userId,
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 9,
      content: "Thanks for your help!",
      senderId: getChatParticipantId(3),
      timestamp: new Date(Date.now() - 1800000),
    },
  ]);

  // Messages for Tech Support (chat id: 4)
  messagesMap.set(4, [
    {
      id: 10,
      content: "Your issue has been resolved",
      senderId: getChatParticipantId(4), // Tech Support (1004)
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: 11,
      content: "Great! Thank you for the quick response.",
      senderId: userId,
      timestamp: new Date(Date.now() - 3600000),
    },
  ]);

  // Messages for Marketing Team (chat id: 5)
  messagesMap.set(5, [
    {
      id: 12,
      content: "New campaign launch next week",
      senderId: getChatParticipantId(5), // Marketing Team (1005)
      timestamp: new Date(Date.now() - 10800000),
    },
    {
      id: 13,
      content: "Exciting! What's the theme?",
      senderId: userId,
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: 14,
      content: "New campaign launch",
      senderId: getChatParticipantId(5),
      timestamp: new Date(Date.now() - 3600000),
    },
  ]);

  return messagesMap;
};

type DashboardProps = {
  user: AppUser;
  onLogout: () => void;
};

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messagesMap, setMessagesMap] = useState<Map<number, Message[]>>(
    () => initializeMessages(user.id)
  );
  const [currentView, setCurrentView] = useState<"dashboard" | "settings">(
    "dashboard"
  );
  const [showProfileDetails, setShowProfileDetails] = useState(false);

  // On mount or whenever messagesMap changes, update chats to reflect the actual latest message
  useEffect(() => {
    setChats(prevChats => prevChats.map(chat => {
      const msgs = messagesMap.get(chat.id) || [];
      const last = msgs.length > 0 ? msgs[msgs.length-1].content : chat.lastMessage;
      return { ...chat, lastMessage: last };
    }));
  }, [messagesMap, user]);

  // Get messages for the active chat
  const getActiveChatMessages = (): Message[] => {
    if (!activeChat) return [];
    return messagesMap.get(activeChat.id) || [];
  };

  const handleSendMessage = (content: string) => {
    if (!activeChat) return;

    const chatMessages = messagesMap.get(activeChat.id) || [];
    const newMessageId = Math.max(...chatMessages.map((m) => m.id), 0) + 1;

    const newMessage: Message = {
      id: newMessageId,
      content,
      senderId: user.id,
      timestamp: new Date(),
    };

    // Add user's message to the specific chat
    const updatedMessages = [...chatMessages, newMessage];
    setMessagesMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(activeChat.id, updatedMessages);
      return newMap;
    });

    // Update chat's last message
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChat.id
          ? { ...chat, lastMessage: content }
          : chat
      )
    );

    // Auto-response after a short delay (simulating typing)
    setTimeout(() => {
      const botResponse: Message = {
        id: newMessageId + 1,
        content: getBotResponse(content),
        senderId: getChatParticipantId(activeChat.id), // Use chat participant ID for bot responses
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, botResponse];
      setMessagesMap((prev) => {
        const newMap = new Map(prev);
        newMap.set(activeChat.id, finalMessages);
        return newMap;
      });

      // Update chat's last message with bot response
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChat.id
            ? { ...chat, lastMessage: botResponse.content }
            : chat
        )
      );
    }, 1000);
  };

  // Function to generate bot responses based on user input
  const getBotResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();

    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey")
    ) {
      return "Hello! How can I help you today?";
    } else if (message.includes("help")) {
      return "I'd be happy to help! What do you need assistance with?";
    } else if (message.includes("thank")) {
      return "You're welcome! Is there anything else I can help with?";
    } else if (message.includes("bye") || message.includes("goodbye")) {
      return "Goodbye! Have a great day!";
    } else if (message.includes("how are you")) {
      return "I'm doing well, thank you for asking! How can I assist you?";
    } else {
      // Default responses
      const responses = [
        "I understand. Can you tell me more about that?",
        "That's interesting. How can I help with that?",
        "I see. Let me know if you need any assistance.",
        "Thanks for sharing! Is there something specific you'd like help with?",
        "Got it. Feel free to ask if you have any questions!",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case "settings":
        return (
          <SettingsPage
            user={user}
            onLogout={onLogout}
            onBackToDashboard={() => setCurrentView("dashboard")}
          />
        );
      case "dashboard":
      default:
        if (!activeChat) {
          // Welcome view shown before a chat is selected
          return (
            <div className="flex flex-1 h-full items-center justify-center bg-white">
              <div className="text-center max-w-md px-4">
                <p className="text-lg font-medium text-blue-600 mb-2">
                  Welcome back, {user.name}
                </p>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Select a conversation to get started
                </h2>
           
              </div>
            </div>
          );
        }

        return (
          <div className="flex flex-1 h-full">
            {/* Chat Area */}
            <div className="flex flex-col flex-1 h-full">
              <ChatHeader chat={activeChat} lastMessage={(() => {
                const msgs = getActiveChatMessages();
                return msgs.length > 0 ? msgs[msgs.length-1].content : '';
              })()} onHeaderClick={() => setShowProfileDetails(true)} />
              <ChatWindow
                messages={getActiveChatMessages()}
                currentUser={user}
                chatUser={activeChat}
              />
              <MessageInput onSendMessage={handleSendMessage} />
            </div>
            {/* Profile Details Sidebar for active chat */}
            {showProfileDetails && (
              <ProfileDetails
                chat={activeChat}
                onClose={() => setShowProfileDetails(false)}
              />
            )}
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar - hidden on settings view */}
      {currentView !== "settings" && (
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          chats={chats}
          activeChat={activeChat}
          onSelectChat={setActiveChat}
        />
      )}

      {/* Main Content */}
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
