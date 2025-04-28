// User profile types
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  photos: string[];
  interests: string[];
  verified: boolean;
}

// Authentication types
export interface AuthState {
  isAuthenticated: boolean;
  walletAddress: string | null;
  isConnecting: boolean;
  error: string | null;
}

// Match types
export interface Match {
  id: string;
  userId: string;
  matchedUserId: string;
  matchedAt: Date;
  isRead: boolean;
  profile: UserProfile;
}

// Message types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

// Conversation types
export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: Date;
  profile: UserProfile;
}