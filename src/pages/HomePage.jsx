import { BiCheckCircle, BiChevronRight, BiShield } from 'react-icons/bi';
import { BsArrowRight, BsClipboardCheck } from 'react-icons/bs';
import { CgLock, CgSmartphone } from 'react-icons/cg';
import { FaUserSecret } from 'react-icons/fa';
// import { FaMapMarkerAlt, FaBell, FaChartLine } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { LuBuilding2 } from 'react-icons/lu';
// import { MdReport } from 'react-icons/md';
import { Link } from 'react-router-dom';


const HomePage = () => {
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 pb-16 lg:pb-24 bg-white">
      <div className="flex flex-col lg:flex-row items-center max-w-7xl mx-auto">
        <div className="lg:w-1/2 lg:pr-12 xl:pr-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight">
            Your Voice for a{' '}
            <span className="text-secondary">Better</span> Ahmedabad
          </h1>
          <p className="mt-8 text-xl text-black leading-relaxed">
            Empowering citizens with a seamless platform to report, track, and resolve civic issues. Join us in building a more responsive and efficient city.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-6">
            <Link
              to="#"
              className="group px-8 py-4 bg-primary text-white rounded-xl hover:bg-opacity-90 transition-all transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg hover:shadow-primary-200"
            >
              <span className="text-lg">Get Started</span>
              <BsArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group px-8 py-4 glass-card text-primary rounded-xl hover:bg-white/90 transition-all transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg">
              <span className="text-lg">Learn More</span>
              <BiChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 mt-16 lg:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card animate-left p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group md:animate-float-down">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-100 rounded-full transform group-hover:scale-110 transition-transform"></div>
                <BsClipboardCheck className="h-10 w-10 text-primary relative mb-4" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Easy Reporting</h3>
              <p className="text-sm text-black">Submit complaints with just a few clicks. Attach photos and location for faster resolution.</p>
            </div>
            <div className="glass-card p-6 animate-right rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group md:animate-float-up md:delay-100">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-100 rounded-full transform group-hover:scale-110 transition-transform"></div>
                <CgLock className="h-10 w-10 text-primary relative mb-4" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Real-time Tracking</h3>
              <p className="text-sm text-black">Monitor the status of your complaints in real-time with detailed progress updates.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl animate-left shadow-lg hover:shadow-xl transition-all hover:scale-105 group md:animate-float-down md:delay-200">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-100 rounded-full transform group-hover:scale-110 transition-transform"></div>
                <FiMessageCircle className="h-10 w-10 text-primary relative mb-4" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Direct Communication</h3>
              <p className="text-sm text-black">Stay connected with authorities through our integrated messaging system.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl animate-right shadow-lg hover:shadow-xl transition-all hover:scale-105 group md:animate-float-up md:delay-300">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-100 rounded-full transform group-hover:scale-110 transition-transform"></div>
                <BiShield className="h-10 w-10 text-primary relative mb-4" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Secure Platform</h3>
              <p className="text-sm text-black">Your data is protected with enterprise-grade security and encryption.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      </section>

      {/* Features Section */}
      <section className="">
      <div id="impact" className="bg-gradient-to-r from-primary to-secondary py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12 lg:mb-16">Making a Real Impact</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          <div className="rounded-xl p-8 backdrop-blur-lg bg-white/30 transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl font-bold mb-3 text-white">50K+</div>
            <div className="text-white/90 text-lg">Active Users</div>
            <p className="text-white/70 text-sm mt-2">Growing community of engaged citizens</p>
          </div>
          <div className="rounded-xl p-8 backdrop-blur-lg bg-white/30 transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl font-bold mb-3 text-white">85%</div>
            <div className="text-white/90 text-lg">Resolution Rate</div>
            <p className="text-white/70 text-sm mt-2">Issues resolved within 7 days</p>
          </div>
          <div className="rounded-xl p-8 backdrop-blur-lg bg-white/30 transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl font-bold mb-3 text-white">24/7</div>
            <div className="text-white/90 text-lg">Support</div>
            <p className="text-white/70 text-sm mt-2">Round-the-clock assistance</p>
          </div>
          <div className="rounded-xl p-8 backdrop-blur-lg bg-white/30 transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl font-bold mb-3 text-white">15K+</div>
            <div className="text-white/90 text-lg">Issues Resolved</div>
            <p className="text-white/70 text-sm mt-2">Successfully completed cases</p>
          </div>
        </div>
      </div>
    </div>
      </section>

      {/* How It Works Section */}
      <section className="">
      <div id="services" className="py-16 lg:py-24 bg-gradient-to-br from-white via-primary-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose AMC Connect?</h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">Join thousands of citizens who are making a difference in their community every day.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          <div className="bg-primary p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-30">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CgLock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Resolution</h3>
            <p className="text-white">Get your issues resolved faster with our streamlined process and dedicated support team.</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-white">
                <BiCheckCircle className="h-5 w-5 text-white mr-2" />
                <span>Average response time: 24 hours</span>
              </li>
              <li className="flex items-center text-white">
                <BiCheckCircle className="h-5 w-5 text-white mr-2" />
                <span>Priority handling system</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-300">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CgSmartphone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Easy to Use</h3>
            <p className="text-white">User-friendly interface designed for seamless complaint registration and tracking.</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-white">
                <BiCheckCircle className="h-5 w-5 text-white mr-2" />
                <span>Simple 3-step process</span>
              </li>
              <li className="flex items-center text-white">
                <BiCheckCircle className="h-5 w-5 text-white mr-2" />
                <span>Mobile-friendly platform</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-300">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaUserSecret className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Community Driven</h3>
            <p className="text-white">Be part of a growing community working together for a better Ahmedabad.</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-white">
                <BiCheckCircle className="h-5 w-5 text-hwite mr-2" />
                <span>Community updates</span>
              </li>
              <li className="flex items-center text-white">
                <BiCheckCircle className="h-5 w-5 text-hwite mr-2" />
                <span>Success stories sharing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
      </section>
      <section>
            {/* Enhanced Footer */}
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-200 rounded-lg transform rotate-45"></div>
                <LuBuilding2 className="h-8 w-8 text-primary relative" />
              </div>
              <span className="text-xl font-bold text-gray-800">AMC Connect</span>
            </div>
            <p className="text-gray-600">Making Ahmedabad better, one report at a time.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Our Services</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">Stay updated with our latest news and updates.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="w-full px-4 py-2 bg-primary text-black rounded-lg hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} AMC Connect. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
      </section>

    </div>
  );
};


export default HomePage;