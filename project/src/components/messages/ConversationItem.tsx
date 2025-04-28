import React from 'react';
import { Conversation } from '../../types';
import { Circle, CircleDot } from 'lucide-react';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (conversationId: string) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ 
  conversation, 
  isActive, 
  onSelect 
}) => {
  const { profile, lastMessage, updatedAt } = conversation;
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const isToday = now.toDateString() === date.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div 
      className={`flex items-center gap-4 p-4 cursor-pointer transition-colors rounded-lg ${
        isActive 
          ? 'bg-pink-50'
          : 'hover:bg-gray-50'
      }`}
      onClick={() => onSelect(conversation.id)}
    >
      {/* Profile Image */}
      <div className="relative w-12 h-12 rounded-full overflow-hidden">
        <img 
          src={profile.photos[0]} 
          alt={profile.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* User Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold ${isActive ? 'text-pink-700' : 'text-gray-900'}`}>
            {profile.name}
          </h3>
          <span className="text-xs text-gray-500">
            {lastMessage && formatTime(updatedAt)}
          </span>
        </div>
        {lastMessage && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 truncate">
              {lastMessage.senderId === profile.id 
                ? lastMessage.content 
                : `You: ${lastMessage.content}`
              }
            </p>
            {!lastMessage.isRead && lastMessage.senderId === profile.id && (
              <CircleDot className="w-3 h-3 text-pink-500 shrink-0 ml-2" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;