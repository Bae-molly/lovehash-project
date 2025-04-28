import React, { useState, useEffect } from 'react';
import PageContainer from '../components/common/PageContainer';
import MatchItem from '../components/matches/MatchItem';
import ProfileCard from '../components/profile/ProfileCard';
import { mockMatches } from '../data/mockData';
import { Match } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MatchesPage: React.FC = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (!auth.isAuthenticated) {
      navigate('/');
      return;
    }

    // Load matches
    setMatches(mockMatches);
  }, [auth.isAuthenticated, navigate]);

  const handleSelectMatch = (matchId: string) => {
    const match = matches.find(m => m.id === matchId);
    if (match) {
      setSelectedMatch(match);
      
      // Mark as read if not already
      if (!match.isRead) {
        const updatedMatches = matches.map(m => 
          m.id === matchId ? { ...m, isRead: true } : m
        );
        setMatches(updatedMatches);
      }
    }
  };

  const handleSendMessage = () => {
    if (selectedMatch) {
      navigate(`/messages/${selectedMatch.profile.id}`);
    }
  };

  return (
    <PageContainer className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Your Matches</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Match List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">
                  Recent Matches ({matches.length})
                </h2>
              </div>
              
              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {matches.length > 0 ? (
                  matches.map(match => (
                    <MatchItem
                      key={match.id}
                      match={match}
                      onSelect={handleSelectMatch}
                    />
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">
                      No matches yet. Start exploring to find your match!
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
          </div>
          
          {/* Selected Match Profile */}
          <div className="lg:col-span-2">
            {selectedMatch ? (
              <ProfileCard
                profile={selectedMatch.profile}
                isMatch={true}
                onSendMessage={handleSendMessage}
                onViewProfile={() => {}}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Select a Match
                </h3>
                <p className="text-gray-500 max-w-md">
                  Click on one of your matches to view their profile and start a conversation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default MatchesPage;