import React from 'react';
import { UserProfile } from '../../types';
import { Heart, X, MessageCircle, Shield, ArrowRight } from 'lucide-react';

interface ProfileCardProps {
  profile: UserProfile;
  onLike?: () => void;
  onSkip?: () => void;
  onViewProfile?: () => void;
  onSendMessage?: () => void;
  isMatch?: boolean;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onLike,
  onSkip,
  onViewProfile,
  onSendMessage,
  isMatch = false,
  className = '',
}) => {
  const {
    name,
    age,
    bio,
    location,
    photos,
    interests,
    verified
  } = profile;

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden max-w-md w-full mx-auto ${className}`}>
      {/* Main Photo */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={photos[0]}
          alt={`${name}'s profile`}
          className="w-full h-full object-cover"
        />
        
        {/* Verification Badge */}
        {verified && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
            <Shield className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-xs font-medium text-green-700">Verified</span>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10 pointer-events-none" />
        
        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-3xl font-bold">{name}, {age}</h2>
          <p className="text-white/90 text-sm mt-1">{location}</p>
        </div>
      </div>
      
      {/* Details */}
      <div className="p-6">
        {/* Bio */}
        <p className="text-gray-700 mb-4">{bio}</p>
        
        {/* Interests */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <span 
                key={index}
                className="text-xs px-3 py-1 rounded-full bg-pink-100 text-pink-700 font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3 justify-between items-center">
          {isMatch ? (
            <>
              <button
                onClick={onViewProfile}
                className="flex-1 py-2.5 px-4 border border-gray-300 rounded-full text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                View Profile
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onSendMessage}
                className="flex-1 py-2.5 px-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                Message
                <MessageCircle className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onSkip}
                className="flex-1 p-3 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>
              <button
                onClick={onLike}
                className="flex-1 p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                <Heart className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;