import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState } from '../types';

interface AuthContextType {
  auth: AuthState;
  login: (walletAddress: string) => void;
  logout: () => void;
  connectWallet: () => Promise<void>;
}

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  walletAddress: null,
  isConnecting: false,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(defaultAuthState);

  const login = (walletAddress: string) => {
    setAuth({
      isAuthenticated: true,
      walletAddress,
      isConnecting: false,
      error: null,
    });
  };

  const logout = () => {
    setAuth(defaultAuthState);
  };

  const connectWallet = async () => {
    try {
      setAuth({ ...auth, isConnecting: true, error: null });
      
      // Mock wallet connection for now
      // In real implementation, this would connect to Sui Wallet
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock successful connection
      const mockWalletAddress = '0x' + Math.random().toString(16).slice(2, 14);
      login(mockWalletAddress);
      
    } catch (error) {
      setAuth({
        ...auth,
        isConnecting: false,
        error: 'Failed to connect wallet',
      });
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, connectWallet }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};