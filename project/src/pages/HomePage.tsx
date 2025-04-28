import React from 'react';
import PageContainer from '../components/common/PageContainer';
import Footer from '../components/layout/Footer';
import Hero from '../components/hero/Hero';

const HomePage: React.FC = () => {
  return (
    <>
      <PageContainer className="bg-gradient-to-b from-white to-gray-50">
        <Hero />
        
        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Lovehash Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience dating reimagined for the Web3 era. Secure, private, and transparent.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-pink-600 font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Connect Your Wallet</h3>
                <p className="text-gray-600">
                  Start by connecting your Sui wallet to create your secure profile on the blockchain.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
                <p className="text-gray-600">
                  Build your profile with photos and interests. Your data is stored on IPFS and remains your property.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-pink-600 font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Match & Connect</h3>
                <p className="text-gray-600">
                  Find matches based on shared interests and chat securely using our encrypted messaging system.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why People Love Lovehash</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear from our community of blockchain dating enthusiasts.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Sarah" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah K.</h4>
                    <p className="text-sm text-gray-500">Web3 Developer</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Finding someone who understands Web3 was impossible on traditional apps. On Lovehash, I met my partner who shares my passion for blockchain!"
                </p>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Michael" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael T.</h4>
                    <p className="text-sm text-gray-500">Crypto Investor</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "I love that my dating profile is secure and actually owned by me. No more worrying about data breaches or privacy concerns."
                </p>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Jamie" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Jamie L.</h4>
                    <p className="text-sm text-gray-500">DAO Member</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The transparency of knowing how matches are made makes the whole experience more trustworthy. Plus, I've made genuine connections!"
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl overflow-hidden shadow-xl">
              <div className="px-8 py-16 md:p-16 text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to find your on-chain match?
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                  Join thousands of Web3 enthusiasts who have found meaningful connections on Lovehash.
                </p>
                <button className="px-8 py-3 bg-white text-pink-600 font-semibold rounded-full hover:bg-gray-100 transition-colors">
                  Connect Wallet to Begin
                </button>
              </div>
            </div>
          </div>
        </section>
      </PageContainer>
      <Footer />
    </>
  );
};

export default HomePage;