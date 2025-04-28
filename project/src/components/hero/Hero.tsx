import React from 'react';
import { ArrowRight, Heart, Lock, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const { auth, connectWallet } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    if (!auth.isAuthenticated) {
      await connectWallet();
    } 
    navigate('/explore');
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-pink-50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-50 to-transparent" />
      
      {/* Hero Content */}
      <div className="relative container mx-auto px-4 pt-32 pb-24 md:pt-48 md:pb-40">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-6 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <div className="flex items-center text-pink-600 font-medium text-sm">
              <Heart className="w-4 h-4 mr-2" />
              <span>Blockchain-powered dating for the modern world</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Find your match. On-chain. <br />
            One hash at a time.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the revolution in dating where privacy meets trust. Built on Sui blockchain for users who value authenticity and data ownership.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={handleGetStarted}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all flex items-center justify-center"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button
              className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-colors"
            >
              Learn More
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Data Ownership</h3>
              <p className="text-gray-600 text-sm">
                You own your data, stored securely on the blockchain and IPFS.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Verified Profiles</h3>
              <p className="text-gray-600 text-sm">
                No more fake profiles or bots with our blockchain verification.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Transparent Matching</h3>
              <p className="text-gray-600 text-sm">
                Smart contracts ensure matches are created fairly and transparently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;