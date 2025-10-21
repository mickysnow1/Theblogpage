import React from 'react';
import SocialIcon from './SocialIcon';

const Footer = ({ categories = [] }) => (
  <footer className="bg-white text-gray-700 border-t">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        <div className="md:col-span-2 lg:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-serif">ZenNest</h3>
          </div>
          <p className="text-sm text-gray-600 max-w-sm mb-8">
            Africa’s most trusted rental platform. Find, list, and manage properties with ease—no agents, no stress.
          </p>
          <hr className="w-24 border-gray-300 mb-8" />
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">STAY CONNECTED</h4>
          <p className="text-sm text-gray-600 mb-4">Get updates on new features and market insights.</p>
          <form className="flex">
            <input type="email" placeholder="Your email address" className="w-full px-4 py-2 text-sm border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            <button type="submit" className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-r-md hover:bg-gray-300 text-sm">
              SUBSCRIBE
            </button>
          </form>
        </div>
        <div>
          <h4 className="font-semibold text-gray-500 mb-4 text-xs uppercase tracking-wider">For Renters</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="relative group inline-block"><span>Find Rentals</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a></li>
            <li><a href="#" className="relative group inline-block"><span>Short Stays</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-500 mb-4 text-xs uppercase tracking-wider">For Landlords</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="relative group inline-block"><span>List Property</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a></li>
            <li><a href="#" className="relative group inline-block"><span>For Real Estate Developers</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-500 mb-4 text-xs uppercase tracking-wider">Hosting</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="relative group inline-block"><span>Turn Your Property Into Revenue</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a></li>
            <li><a href="#" className="relative group inline-block"><span>ZenStays Hosting</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-500 mb-4 text-xs uppercase tracking-wider">Blog Categories</h4>
          <ul className="space-y-3 text-sm">
            {categories.slice(0, 4).map(cat => (
              <li key={cat}><a href={`#${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="relative group inline-block"><span>{cat}</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-sm mb-4 md:mb-0">
          <a href="#" className="relative group inline-block"><span>About Us</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a>
          <a href="#" className="relative group inline-block"><span>Careers</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a>
          <a href="#" className="relative group inline-block"><span>Contact</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a>
          <a href="#" className="relative group inline-block"><span>Terms & Privacy</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col-reverse md:flex-row justify-between items-center">
        <p className="text-sm text-gray-500 mt-4 md:mt-0">&copy; 2025 ZenNest. All rights reserved.</p>
        <div className="flex space-x-4">
          <SocialIcon href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></SocialIcon>
          <SocialIcon href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.74 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.74 24 12 24s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98C23.986 15.667 24 15.26 24 12s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg></SocialIcon>
          <SocialIcon href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></SocialIcon>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
