import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '../components/common/PageContainer';
import ConversationItem from '../components/messages/ConversationItem';
import MessageBubble from '../components/messages/MessageBubble';
import { Conversation, Message } from '../types';
import { mockConversations, mockMessages } from '../data/mockData';
import { Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MessagesPage: React.FC = () => {
  const { auth } = useAuth();
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (!auth.isAuthenticated) {
      navigate('/');
      return;
    }

    // Load conversations
    setConversations(mockConversations);

    // Set active conversation if ID is provided
    if (conversationId) {
      const conversation = mockConversations.find(c => c.id === conversationId);
      if (conversation) {
        setActiveConversation(conversation);
        setMessages(mockMessages[conversationId] || []);
      } else {
        navigate('/messages');
      }
    } else if (mockConversations.length > 0) {
      // Default to first conversation if none specified
      setActiveConversation(mockConversations[0]);
      setMessages(mockMessages[mockConversations[0].id] || []);
    }
  }, [conversationId, auth.isAuthenticated, navigate]);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectConversation = (id: string) => {
    const conversation = conversations.find(c => c.id === id);
    if (conversation) {
      setActiveConversation(conversation);
      setMessages(mockMessages[id] || []);
      navigate(`/messages/${id}`);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const newMessageObj: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user',
      receiverId: activeConversation.profile.id,
      content: newMessage,
      timestamp: new Date(),
      isRead: false,
    };

    // Update messages
    const updatedMessages = [...messages, newMessageObj];
    setMessages(updatedMessages);
    
    // Update conversation with last message
    const updatedConversations = conversations.map(conv => 
      conv.id === activeConversation.id
        ? { ...conv, lastMessage: newMessageObj, updatedAt: new Date() }
        : conv
    );
    
    // Sort conversations by most recent
    updatedConversations.sort((a, b) => 
      b.updatedAt.getTime() - a.updatedAt.getTime()
    );
    
    setConversations(updatedConversations);
    setNewMessage('');
    
    // Mock response after a delay (1-3 seconds)
    const delay = 1000 + Math.random() * 2000;
    setTimeout(() => {
      const responseMessages = [
        "That sounds great!",
        "I'd love to chat more about that.",
        "Interesting! Tell me more.",
        "I feel the same way about Web3.",
        "Have you checked out the latest Sui updates?",
        "What are your thoughts on decentralized dating?",
        "I'm glad we matched!",
        "Would you like to meet for coffee sometime?",
      ];
      
      const responseMsg: Message = {
        id: `msg-${Date.now()}`,
        senderId: activeConversation.profile.id,
        receiverId: 'current-user',
        content: responseMessages[Math.floor(Math.random() * responseMessages.length)],
        timestamp: new Date(),
        isRead: true,
      };
      
      setMessages(prev => [...prev, responseMsg]);
      
      // Update conversation again
      setConversations(prev => prev.map(conv => 
        conv.id === activeConversation.id
          ? { ...conv, lastMessage: responseMsg, updatedAt: new Date() }
          : conv
      ));
    }, delay);
  };

  return (
    <PageContainer className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Messages</h1>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 min-h-[600px]">
          {/* Conversations List */}
          <div className="md:col-span-1 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800">Conversations</h2>
            </div>
            
            <div className="divide-y divide-gray-100 max-h-[560px] overflow-y-auto">
              {conversations.length > 0 ? (
                conversations.map(conversation => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={activeConversation?.id === conversation.id}
                    onSelect={handleSelectConversation}
                  />
                ))
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500">
                    No conversations yet. Match with someone to start chatting!
                  </p>
                  <button
                    onClick={() => navigate('/explore')}
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-full text-sm"
                  >
                    Explore Profiles
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Messages */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col">
            {activeConversation ? (
              <>
                {/* Conversation Header */}
                <div className="p-4 border-b border-gray-200 flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img
                      src={activeConversation.profile.photos[0]}
                      alt={activeConversation.profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {activeConversation.profile.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {activeConversation.profile.location}
                    </p>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  <div className="space-y-4">
                    {messages.length > 0 ? (
                      messages.map(message => (
                        <MessageBubble
                          key={message.id}
                          message={message}
                          isCurrentUser={message.senderId === 'current-user'}
                        />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">
                          No messages yet. Start the conversation!
                        </p>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Type a message..."
                      className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className={`ml-2 p-2 rounded-full ${
                        newMessage.trim()
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  No Conversation Selected
                </h3>
                <p className="text-gray-500 max-w-md">
                  Choose a conversation from the list or match with new people.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default MessagesPage;