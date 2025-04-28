import React, { useState, useEffect } from 'react';
import PageContainer from '../components/common/PageContainer';
import ProfileCard from '../components/profile/ProfileCard';
import { mockProfiles } from '../data/mockData';
import { UserProfile } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ExplorePage: React.FC = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  const [remainingProfiles, setRemainingProfiles] = useState<UserProfile[]>([]);
  const [matches, setMatches] = useState<string[]>([]);
  const [showMatchAnimation, setShowMatchAnimation] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (!auth.isAuthenticated) {
      navigate('/');
      return;
    }

    // Initialize profiles
    if (mockProfiles.length > 0) {
      setCurrentProfile(mockProfiles[0]);
      setRemainingProfiles(mockProfiles.slice(1));
    }
  }, [auth.isAuthenticated, navigate]);

  const handleLike = () => {
    if (!currentProfile) return;

    // Simulate match with 40% probability
    const isMatch = Math.random() < 0.4;
    
    if (isMatch) {
      setMatches([...matches, currentProfile.id]);
      setMatchedProfile(currentProfile);
      setShowMatchAnimation(true);
      
      // Hide match animation after 3 seconds
      setTimeout(() => {
        setShowMatchAnimation(false);
        setMatchedProfile(null);
        moveToNextProfile();
      }, 3000);
    } else {
      moveToNextProfile();
    }
  };

  const handleSkip = () => {
    moveToNextProfile();
  };

  const moveToNextProfile = () => {
    if (remainingProfiles.length > 0) {
      setCurrentProfile(remainingProfiles[0]);
      setRemainingProfiles(remainingProfiles.slice(1));
    } else {
      setCurrentProfile(null);
    }
  };

  return (
    <PageContainer className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">Explore Matches</h1>
        
        <div className="flex flex-col items-center justify-center min-h-[70vh] relative">
          {currentProfile ? (
            <ProfileCard
              profile={currentProfile}
              onLike={handleLike}
              onSkip={handleSkip}
              className="animate-fade-in"
            />
          ) : (
            <div className="text-center p-8 bg-white rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">No more profiles to explore</h2>
              <p className="text-gray-600 mb-6">
                You've viewed all available profiles for now. 
                Check back later for new potential matches!
              </p>
              <button 
                onClick={() => navigate('/matches')}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-full"
              >
                View Your Matches
              </button>
            </div>
          )}
          
          {/* Match Animation */}
          {showMatchAnimation && matchedProfile && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center animate-fade-in">
              <div className="text-center p-8 max-w-md animate-scale-in">
                <div className="w-24 h-24 mb-6 mx-auto">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">It's a Match!</h2>
                <p className="text-gray-200 mb-8">
                  You and {matchedProfile.name} have liked each other.
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-pink-400">
                    <img
                      src="https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="You"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-pink-400">
                    <img
                      src={matchedProfile.photos[0]}
                      alt={matchedProfile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default ExplorePage;