import React from 'react';
import { Match } from '../../types';
import { Circle, CircleDot, MessageCircle } from 'lucide-react';

interface MatchItemProps {
  match: Match;
  onSelect: (matchId: string) => void;
}

const MatchItem: React.FC<MatchItemProps> = ({ match, onSelect }) => {
  const { profile, matchedAt, isRead } = match;
  
  const formatMatchTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return diffInHours === 0 
        ? 'Just now' 
        : `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
  };

  return (
    <div 
      className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg"
      onClick={() => onSelect(match.id)}
    >
      {/* Profile Image */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden">
        <img 
          src={profile.photos[0]} 
          alt={profile.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* User Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{profile.name}, {profile.age}</h3>
          <span className="text-xs text-gray-500">{formatMatchTime(matchedAt)}</span>
        </div>
        <p className="text-sm text-gray-600 truncate">
          {profile.location}
        </p>
      </div>
      
      {/* Read Status or Message Button */}
      <div className="shrink-0">
        {!isRead ? (
          <CircleDot className="w-4 h-4 text-pink-500" />
        ) : (
          <Circle className="w-4 h-4 text-gray-300" />
        )}
      </div>
    </div>
  );
};

export default MatchItem;