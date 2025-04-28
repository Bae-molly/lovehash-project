import React from 'react';
import { Heart, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between pb-8 border-b border-gray-200">
          {/* Brand */}
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-pink-500 mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Lovehash
              </span>
            </div>
            <p className="text-gray-600 max-w-xs">
              Find your match. On-chain. One hash at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Platform</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">How it Works</a></li>
                <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Lovehash. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;