import React from 'react';
import { Wallet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const WalletButton: React.FC = () => {
  const { auth, connectWallet, logout } = useAuth();

  const handleConnect = () => {
    if (auth.isAuthenticated) {
      logout();
    } else {
      connectWallet();
    }
  };

  const formatWalletAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <button
      onClick={handleConnect}
      disabled={auth.isConnecting}
      className={`
        flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium transition-all
        ${
          auth.isAuthenticated
            ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
            : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:opacity-90'
        }
        ${auth.isConnecting ? 'opacity-70 cursor-not-allowed' : ''}
      `}
    >
      <Wallet className="w-4 h-4" />
      {auth.isConnecting
        ? 'Connecting...'
        : auth.isAuthenticated
        ? formatWalletAddress(auth.walletAddress)
        : 'Connect Wallet'}
    </button>
  );
};

export default WalletButton;