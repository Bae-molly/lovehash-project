import { Conversation, Match, Message, UserProfile } from '../types';

// Mock profiles for development
export const mockProfiles: UserProfile[] = [
  {
    id: '1',
    name: 'Sophia',
    age: 28,
    bio: 'Web3 developer by day, NFT artist by night. Looking for someone to explore virtual galleries with!',
    location: 'San Francisco, CA',
    photos: [
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    interests: ['Blockchain', 'Art', 'Hiking', 'Photography'],
    verified: true,
  },
  {
    id: '2',
    name: 'Jackson',
    age: 31,
    bio: 'DAO founder and crypto enthusiast. Passionate about DeFi and regenerative finance. Let\'s chat about the future of money!',
    location: 'New York, NY',
    photos: [
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    interests: ['DeFi', 'Startups', 'Running', 'Coffee'],
    verified: true,
  },
  {
    id: '3',
    name: 'Emma',
    age: 26,
    bio: 'Smart contract auditor with a love for puzzles and immersive experiences. Seeking someone who appreciates both security and spontaneity.',
    location: 'Austin, TX',
    photos: [
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    interests: ['Security', 'Puzzles', 'Travel', 'Music'],
    verified: true,
  },
  {
    id: '4',
    name: 'Liam',
    age: 29,
    bio: 'Metaverse architect building digital spaces for connection. Looking for someone to share adventures with, both virtual and IRL.',
    location: 'Miami, FL',
    photos: [
      'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    interests: ['Virtual Reality', 'Design', 'Surfing', 'Books'],
    verified: false,
  },
  {
    id: '5',
    name: 'Olivia',
    age: 27,
    bio: 'Community manager for a leading NFT project. I love connecting people and ideas. Let\'s explore art galleries and talk about the future of culture.',
    location: 'Los Angeles, CA',
    photos: [
      'https://images.pexels.com/photos/1082962/pexels-photo-1082962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    interests: ['NFTs', 'Community', 'Art', 'Fashion'],
    verified: true,
  },
  {
    id: '6',
    name: 'Ethan',
    age: 30,
    bio: 'Solidity developer working on Web3 social protocols. Passionate about decentralized identity and governance. Looking for meaningful connections.',
    location: 'Seattle, WA',
    photos: [
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    interests: ['Coding', 'Governance', 'Hiking', 'Philosophy'],
    verified: true,
  }
];

// Mock matches
export const mockMatches: Match[] = mockProfiles.slice(0, 3).map((profile) => ({
  id: `match-${profile.id}`,
  userId: 'current-user',
  matchedUserId: profile.id,
  matchedAt: new Date(Date.now() - Math.random() * 10000000000),
  isRead: Math.random() > 0.5,
  profile,
}));

// Mock messages
export const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      senderId: '1',
      receiverId: 'current-user',
      content: 'Hey! I noticed you\'re also interested in NFTs. Have you checked out the new collection on Sui?',
      timestamp: new Date(Date.now() - 86400000),
      isRead: true,
    },
    {
      id: '2',
      senderId: 'current-user',
      receiverId: '1',
      content: 'Yes! It\'s amazing how the Sui ecosystem is growing. The new collection looks promising!',
      timestamp: new Date(Date.now() - 82800000),
      isRead: true,
    },
    {
      id: '3',
      senderId: '1',
      receiverId: 'current-user',
      content: 'Would you like to grab coffee sometime and talk more about Web3?',
      timestamp: new Date(Date.now() - 79200000),
      isRead: true,
    },
    {
      id: '4',
      senderId: 'current-user',
      receiverId: '1',
      content: 'That sounds great! How about this weekend?',
      timestamp: new Date(Date.now() - 75600000),
      isRead: true,
    },
  ],
  '2': [
    {
      id: '5',
      senderId: '2',
      receiverId: 'current-user',
      content: 'Hi there! I see you\'re into DeFi as well. What projects are you most excited about right now?',
      timestamp: new Date(Date.now() - 172800000),
      isRead: true,
    },
    {
      id: '6',
      senderId: 'current-user',
      receiverId: '2',
      content: 'Hey Jackson! I\'m really interested in what\'s happening with Sui Move and the ecosystem. How about you?',
      timestamp: new Date(Date.now() - 169200000),
      isRead: true,
    },
  ],
};

// Mock conversations
export const mockConversations: Conversation[] = mockProfiles.slice(0, 2).map((profile, index) => ({
  id: profile.id,
  participants: ['current-user', profile.id],
  lastMessage: mockMessages[profile.id]?.slice(-1)[0],
  updatedAt: new Date(Date.now() - index * 3600000),
  profile,
}));