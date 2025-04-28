import React, { useState, useEffect } from 'react';
import PageContainer from '../components/common/PageContainer';
import { Heart, MapPin, Edit, LogOut, Image, Plus, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Mock current user profile
const currentUserProfile = {
  id: 'current-user',
  name: 'Alex Chen',
  age: 28,
  bio: 'Web3 enthusiast and blockchain developer. Looking for someone to discuss DeFi, NFTs, and to explore nature trails on weekends.',
  location: 'San Francisco, CA',
  photos: [
    'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ],
  interests: ['Blockchain', 'Hiking', 'Photography', 'Cooking', 'Travel'],
  verified: true,
};

const ProfilePage: React.FC = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(currentUserProfile);
  const [formData, setFormData] = useState(currentUserProfile);

  useEffect(() => {
    // Redirect if not authenticated
    if (!auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth.isAuthenticated, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(profile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(profile);
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddInterest = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newInterest = e.currentTarget.value.trim();
      if (newInterest && !formData.interests.includes(newInterest)) {
        setFormData(prev => ({
          ...prev,
          interests: [...prev.interests, newInterest]
        }));
        e.currentTarget.value = '';
      }
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <PageContainer className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Disconnect Wallet
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="relative h-48 md:h-64 bg-gradient-to-r from-pink-400 to-purple-500">
            {/* Edit Button */}
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-colors"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}
            
            {/* Profile Picture */}
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                <img
                  src={profile.photos[0]}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="pt-20 px-8 pb-8">
            {isEditing ? (
              /* Edit Mode */
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interests
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.interests.map((interest, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-700 rounded-full"
                      >
                        <span>{interest}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveInterest(interest)}
                          className="text-pink-700 hover:text-pink-900"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add interest (press Enter)"
                    onKeyDown={handleAddInterest}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Photos
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden relative">
                        <img
                          src={photo}
                          alt={`${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 p-1 bg-white/80 rounded-full text-gray-700 hover:bg-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-pink-400 transition-colors">
                      <div className="text-center">
                        <Plus className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                        <span className="text-xs text-gray-500">Add Photo</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-white hover:opacity-90 transition-opacity"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <div>
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{profile.name}, {profile.age}</h1>
                    <div className="flex items-center mt-2 text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{profile.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Heart className="w-4 h-4 text-pink-500 mr-1" />
                    <span>Wallet Connected: {auth.walletAddress?.slice(0, 6)}...{auth.walletAddress?.slice(-4)}</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">About Me</h2>
                  <p className="text-gray-700">{profile.bio}</p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Photos</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {profile.photos.map((photo, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={photo}
                          alt={`${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProfilePage;