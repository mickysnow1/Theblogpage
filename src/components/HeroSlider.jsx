import React, { useState, useEffect, useRef } from 'react';

const HeroSlider = ({ posts, navLinks, onPostSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length),
      5000
    );
    return () => resetTimeout();
  }, [currentIndex, posts.length]);

  const goToNext = () => setCurrentIndex((currentIndex + 1) % posts.length);
  const goToPrev = () => setCurrentIndex((currentIndex - 1 + posts.length) % posts.length);

  if (!posts || posts.length === 0) return null;

  const currentPost = posts[currentIndex];

  return (
    <header className="relative h-screen shadow-lg overflow-hidden text-white">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      ))}

      <div className="relative z-10 h-full flex flex-col">
        <div className="w-full">
          <nav className="max-w-7xl mx-auto flex justify-between items-center px-2 md:px-4 py-4 md:py-6">
            <a href="#" className="text-2xl font-bold font-serif">ZenNest</a>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} className="relative group flex items-center space-x-2 text-sm font-semibold transition-colors">
                  {link.icon}
                  <span>{link.name}</span>
                  <span className="absolute bottom-[-4px] left-0 block w-full h-[2px] bg-white transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span>
                </a>
              ))}
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </button>
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-1 z-20">
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Sign In</a>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Sign Up</a>
                  </div>
                )}
              </div>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md bg-white/20 hover:bg-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </button>
            </div>
          </nav>
        </div>

        {isMenuOpen && (
          <div className="block md:hidden absolute top-24 right-6 w-56 bg-white text-gray-800 rounded-lg shadow-xl p-4 z-20">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md">
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}
            <div className="border-t border-gray-200 mt-2 pt-2">
              <a href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Sign In</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/></svg>
                <span>Sign Up</span>
              </a>
            </div>
          </div>
        )}

        <div className="mt-auto w-full">
          <div className="max-w-7xl mx-auto p-6 md:p-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">{currentPost.category}</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold my-4 leading-tight font-serif">{currentPost.title}</h1>
              <button onClick={() => onPostSelect(currentPost)} className="mt-4 text-white font-bold py-3 text-lg relative group">
                Read Article
                <span className="absolute bottom-0 left-0 block w-full h-[2px] bg-white transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 flex items-center space-x-3">
          <button onClick={goToPrev} className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button onClick={goToNext} className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroSlider;