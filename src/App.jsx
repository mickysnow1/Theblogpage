// src/App.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useInView } from 'react-intersection-observer';

// --- COMPONENT: SocialIcon ---

const SocialIcon = ({ href, children }) => (
  <a href={href} className="text-gray-500 hover:text-gray-800 transition-colors">
    <span className="sr-only">{href}</span>
    {children}
  </a>
);

// --- COMPONENT: CarouselPostCard ---

const CarouselPostCard = ({ post, onClick }) => {
  const readTime = Math.ceil(post.title.length / 20) + ' min read';
  return (
    <div
      className="cursor-pointer group h-full"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden rounded-lg">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="pt-4">
        <p className="text-xs font-medium text-blue-600 mb-2 uppercase tracking-wide">{post.category}</p>
        <h3 className="text-lg font-semibold font-serif text-gray-900 mb-2 line-clamp-2 relative inline-block group/title">
          <span>{post.title}</span>
          <span className="absolute bottom-[-2px] left-0 block w-full h-[2px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover/title:scale-x-100"></span>
        </h3>
        <p className="text-xs text-gray-500">{post.date} • {readTime}</p>
      </div>
    </div>
  );
};

// --- COMPONENT: PostCard ---

const PostCard = ({ post, onClick, layout = 'default' }) => {
  const readTime = Math.ceil(post.title.length / 20) + ' min read';

  // Featured Layout
  if (layout === 'featured') {
    return (
      <div className="cursor-pointer group" onClick={onClick}>
        <div className="relative h-96 overflow-hidden rounded-lg">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <span className={`mb-2 inline-block px-2 py-1 text-xs font-bold uppercase rounded ${post.type === 'quick' ? 'bg-blue-100 text-blue-800' : post.type === 'deep' ? 'bg-indigo-100 text-indigo-800' : 'bg-blue-100 text-blue-800'}`}>
              {post.category}
            </span>
            <h2 className="text-4xl font-bold font-serif leading-tight">{post.title}</h2>
            <p className="mt-2 text-sm">{post.date} • {readTime}</p>
          </div>
        </div>
      </div>
    );
  }

  // Secondary Layout
  if (layout === 'secondary') {
    return (
        <div className="cursor-pointer group" onClick={onClick}>
            <div className="overflow-hidden rounded-lg h-56 mb-4">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <p className="text-xs font-medium text-blue-600 mb-2 uppercase tracking-wide">{post.category}</p>
            <h3 className="text-xl font-bold font-serif text-gray-900 mb-2 line-clamp-3 relative inline-block group/title">
              <span>{post.title}</span>
              <span className="absolute bottom-[-2px] left-0 block w-full h-[2px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover/title:scale-x-100"></span>
            </h3>
            <p className="text-xs text-gray-500 mt-2">{post.date} • {readTime}</p>
             <div className="mt-3 text-sm font-semibold text-blue-600 relative inline-block group/readmore">
                <span>Read More &rarr;</span>
                <span className="absolute bottom-[-2px] left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover/readmore:scale-x-100"></span>
            </div>
        </div>
    )
  }

  // Default Card
  return (
    <div className="cursor-pointer group" onClick={onClick}>
      <div className="relative h-48 overflow-hidden rounded-lg">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="pt-4">
        <p className="text-xs font-medium text-blue-600 mb-2 uppercase tracking-wide">{post.category}</p>
        <h3 className="text-lg font-semibold font-serif text-gray-900 mb-2 line-clamp-2 relative inline-block group/title">
          <span>{post.title}</span>
          <span className="absolute bottom-[-2px] left-0 block w-full h-[2px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover/title:scale-x-100"></span>
        </h3>
        <p className="text-xs text-gray-500">{post.date} • {readTime}</p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>
         <div className="mt-3 text-sm font-semibold text-blue-600 relative inline-block group/readmore">
            <span>Read More &rarr;</span>
            <span className="absolute bottom-[-2px] left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover/readmore:scale-x-100"></span>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: HeroSlider ---

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
    // Only run if posts are loaded and there's more than one post
    if (posts && posts.length > 1) {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () => setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length),
        5000 // Timeout duration
      );
    }
    // Cleanup timeout on component unmount or when currentIndex/posts.length changes
    return () => resetTimeout();
  }, [currentIndex, posts]); // Rerun effect when currentIndex or posts change

  const goToNext = () => {
    if (posts && posts.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }
  };

  const goToPrev = () => {
     if (posts && posts.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
     }
  };


  if (!posts || posts.length === 0) {
     // Optional: Render a loading state or placeholder if posts are not yet loaded
     return (
       <header className="relative h-screen shadow-lg overflow-hidden text-white bg-gray-900 animate-pulse">
         {/* Placeholder content mimicking the structure */}
         <div className="relative z-10 h-full flex flex-col">
          <nav className="max-w-7xl mx-auto flex justify-between items-center px-2 md:px-4 py-4 md:py-6 w-full">
            <div className="text-2xl font-bold font-serif bg-gray-700 h-8 w-32 rounded"></div> {/* Placeholder for Logo */}
             <div className="hidden md:flex items-center space-x-8">
                {/* Placeholders for nav links */}
                <div className="bg-gray-700 h-6 w-20 rounded"></div>
                <div className="bg-gray-700 h-6 w-20 rounded"></div>
                <div className="bg-gray-700 h-6 w-20 rounded"></div>
                {/* Placeholder for profile icon */}
                <div className="p-2 rounded-full bg-gray-700 h-10 w-10"></div>
             </div>
             {/* Placeholder for mobile menu button */}
             <div className="md:hidden p-2 rounded-md bg-gray-700 h-10 w-10"></div>
          </nav>
          {/* Placeholder for main content area */}
          <div className="mt-auto w-full">
            <div className="max-w-7xl mx-auto p-6 md:p-10">
              <div className="max-w-2xl">
                <div className="h-4 bg-gray-700 w-1/3 rounded mb-4"></div> {/* Placeholder for category */}
                <div className="h-12 bg-gray-700 w-full rounded my-4"></div> {/* Placeholder for title */}
                <div className="h-10 bg-gray-700 w-1/2 rounded mt-4"></div> {/* Placeholder for button */}
              </div>
            </div>
          </div>
           {/* Placeholders for slider controls */}
           <div className="absolute bottom-10 right-10 flex items-center space-x-3">
             <div className="p-3 rounded-full bg-gray-700 h-12 w-12"></div>
             <div className="p-3 rounded-full bg-gray-700 h-12 w-12"></div>
           </div>
        </div>
       </header>
     );
   }

  const currentPost = posts[currentIndex];

  return (
    <header className="relative h-screen shadow-lg overflow-hidden text-white">
      {/* Background Images */}
      {posts.map((post, index) => (
        <div
          key={post.id || index} // Use index as fallback key if id is missing
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark overlay */}
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Navigation */}
        <div className="w-full">
          <nav className="max-w-7xl mx-auto flex justify-between items-center px-2 md:px-4 py-4 md:py-6">
            <a href="#" className="text-2xl font-bold font-serif">ZenNest</a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} className="relative group flex items-center space-x-2 text-sm font-semibold transition-colors">
                  {link.icon}
                  <span>{link.name}</span>
                  <span className="absolute bottom-[-4px] left-0 block w-full h-[2px] bg-white transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span>
                </a>
              ))}
              {/* Profile Dropdown */}
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

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md bg-white/20 hover:bg-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu Panel */}
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

        {/* Slider Content */}
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

        {/* Slider Controls */}
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


// --- COMPONENT: MainContent ---

const MainContent = ({ onPostSelect, loading, allPosts = [], postsByCategory = {}, popularPosts = [] }) => {
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({ threshold: 0.1 });
  const pageSize = 10; // Number of posts per "page" for infinite scroll

  const [expandedCategories, setExpandedCategories] = useState([]);

  // Toggle expansion for a category in the sidebar
  const toggleCategory = (cat) => {
    setExpandedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Effect for infinite scrolling
  useEffect(() => {
    if (inView && !loading) {
      setPage(currentPage => {
        const hasMore = allPosts.length > currentPage * pageSize;
        return hasMore ? currentPage + 1 : currentPage;
      });
    }
  }, [inView, loading, allPosts.length, pageSize]);

  // Memoize the posts to display based on the current page
  const displayedPosts = useMemo(() => {
    return allPosts.slice(0, page * pageSize);
  }, [allPosts, page, pageSize]);

  // Loading state placeholder
  if (loading && displayedPosts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 animate-pulse">
          {/* Main content area placeholders */}
          <div className="lg:col-span-3 space-y-12">
            <div className="h-96 bg-gray-200 rounded-lg w-full mb-6"></div> {/* Featured post placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-200 rounded-lg h-64"></div> {/* Secondary post placeholder */}
              <div className="bg-gray-200 rounded-lg h-64"></div> {/* Secondary post placeholder */}
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
               <div className="bg-gray-200 rounded-lg h-80"></div> {/* Latest post placeholder */}
               <div className="bg-gray-200 rounded-lg h-80"></div> {/* Latest post placeholder */}
               <div className="bg-gray-200 rounded-lg h-80"></div> {/* Latest post placeholder */}
             </div>
          </div>
          {/* Sidebar placeholders */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-gray-200 rounded-lg h-24"></div> {/* Search placeholder */}
            <div className="bg-gray-200 rounded-lg h-32"></div> {/* Subscribe placeholder */}
            <div className="bg-gray-200 rounded-lg h-64"></div> {/* Categories placeholder */}
            <div className="bg-gray-200 rounded-lg h-64"></div> {/* Popular posts placeholder */}
          </aside>
        </div>
      </div>
    );
  }

  // Determine which posts go where based on the fetched and sliced data
  const categories = Object.keys(postsByCategory);
  const featuredPost = displayedPosts[0]; // First post is featured
  const secondaryPosts = displayedPosts.slice(1, 3); // Next two are secondary
  const latestPosts = displayedPosts.slice(3); // The rest are in the grid

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Content Area */}
        <main className="lg:col-span-3 space-y-16">
          {/* Featured Story Section */}
          {featuredPost && (
            <section aria-labelledby="featured-story">
              <h2 id="featured-story" className="sr-only">Featured Story</h2>
              <PostCard post={featuredPost} onClick={() => onPostSelect(featuredPost)} layout="featured" />
            </section>
          )}

          {/* Secondary Stories Section */}
          {secondaryPosts.length > 0 && (
            <section aria-labelledby="secondary-stories">
              <h2 id="secondary-stories" className="sr-only">Secondary Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {secondaryPosts.map(post => (
                  <PostCard key={post.id} post={post} onClick={() => onPostSelect(post)} layout="secondary" />
                ))}
              </div>
            </section>
          )}

          {/* Latest Posts Grid Section */}
          {latestPosts.length > 0 && (
            <section aria-labelledby="latest-posts">
              <h2 id="latest-posts" className="text-2xl font-bold font-serif text-gray-900 border-b border-gray-200 pb-3 mb-8">Latest Updates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {latestPosts.map(post => (
                  <PostCard key={post.id} post={post} onClick={() => onPostSelect(post)} />
                ))}
              </div>
            </section>
          )}

          {/* Intersection Observer target for infinite scroll */}
          <div ref={ref} className="text-center py-8">
            {/* Show loading indicator only if there are more posts to load */}
            {displayedPosts.length > 0 && displayedPosts.length < allPosts.length && (
                 <button className="text-blue-600 hover:underline text-sm font-semibold" disabled>
                     Loading More...
                 </button>
            )}
            {/* Optionally, show a message when all posts are loaded */}
            {!loading && displayedPosts.length > 0 && displayedPosts.length === allPosts.length && (
              <p className="text-sm text-gray-500">You've reached the end!</p>
            )}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-20 lg:self-start" role="complementary">
          {/* Quick Search Widget */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-bold font-serif text-gray-900 mb-4">Quick Search</h3>
            <input type="search" placeholder="Search articles..." className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" aria-label="Search articles" />
          </div>

          {/* Newsletter Signup Widget */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-bold font-serif text-gray-900 mb-4">Get Market Updates</h3>
            <form aria-label="Newsletter signup">
              <input type="email" placeholder="Enter your email" className="w-full p-2 border border-gray-300 rounded mb-2" aria-required="true" />
              <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold">Subscribe</button>
            </form>
          </div>

          {/* Categories Widget */}
          <div className="bg-gray-50 rounded-lg">
            <h3 className="font-bold font-serif text-gray-900 p-4 border-b border-gray-200">Categories</h3>
            <ul className="divide-y divide-gray-200">
              {categories.map(cat => (
                <li key={cat} className="p-4 hover:bg-gray-100 transition-colors">
                  <button
                    onClick={() => toggleCategory(cat)}
                    className="text-sm font-medium text-gray-900 hover:text-blue-600 relative group inline-block w-full text-left"
                    aria-expanded={expandedCategories.includes(cat)}
                    aria-controls={`category-posts-${cat.replace(/\s+/g, '-')}`}
                  >
                    <span>{cat}</span>
                    {/* Underline hover effect */}
                    <span className="absolute bottom-[-2px] left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span>
                    {/* Add an indicator for expansion (optional) */}
                    {/* <span className={`float-right transform transition-transform ${expandedCategories.includes(cat) ? 'rotate-180' : ''}`}>▼</span> */}
                  </button>
                  {/* Expanded list of posts for the category */}
                  {expandedCategories.includes(cat) && (
                    <ul
                      id={`category-posts-${cat.replace(/\s+/g, '-')}`}
                      className="mt-2 max-h-48 overflow-y-auto divide-y divide-gray-100 pl-2 border-l border-gray-200 ml-1"
                    >
                      {(postsByCategory[cat] || []).map(post => (
                        <li key={post.id} className="py-2">
                          <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); onPostSelect(post); }}
                            className="text-xs font-medium text-gray-700 hover:text-blue-600 block leading-tight"
                          >
                            {post.title}
                            <p className="text-xs text-gray-500 mt-0.5">{post.date}</p>
                          </a>
                        </li>
                      ))}
                       {/* Show message if category has no posts */}
                       {(postsByCategory[cat] || []).length === 0 && (
                          <li className="py-2 text-xs text-gray-500 italic">No posts in this category.</li>
                       )}
                    </ul>
                  )}
                </li>
              ))}
               {/* Show message if there are no categories */}
               {categories.length === 0 && (
                 <li className="p-4 text-sm text-gray-500 italic">No categories found.</li>
               )}
            </ul>
          </div>

          {/* Popular Posts Widget */}
          <div className="bg-gray-50 rounded-lg">
            <h3 className="font-bold font-serif text-gray-900 p-4 border-b border-gray-200">Popular Posts</h3>
            <ul className="divide-y divide-gray-200">
              {popularPosts.map(post => (
                <li key={post.id} className="p-4 hover:bg-gray-100 transition-colors">
                  <a href="#" onClick={(e) => { e.preventDefault(); onPostSelect(post); }} className="text-sm font-medium text-gray-900 hover:text-blue-600 relative group inline-block">
                    <span>{post.title}</span>
                    <span className="absolute bottom-[-2px] left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span>
                  </a>
                  <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                </li>
              ))}
               {/* Show message if there are no popular posts */}
              {popularPosts.length === 0 && (
                 <li className="p-4 text-sm text-gray-500 italic">No popular posts yet.</li>
               )}
            </ul>
          </div>
        </aside>
      </div>

       {/* Popular Posts Carousel Section */}
       <section className="mt-16 py-12 bg-gray-50 rounded-lg" role="region" aria-label="Popular Posts Carousel">
         <h2 className="text-3xl font-bold font-serif text-gray-900 mb-8 px-4 sm:px-6 lg:px-8">Popular Reads</h2>
         {popularPosts.length > 0 ? (
           <div className="flex overflow-x-auto gap-8 snap-x scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"> {/* Added pb-4 for potential scrollbar space */}
             {popularPosts.map(post => (
               <div key={post.id} className="min-w-[300px] snap-center flex-shrink-0"> {/* Ensure items don't shrink */}
                 <CarouselPostCard post={post} onClick={() => onPostSelect(post)} />
               </div>
             ))}
           </div>
         ) : (
           <p className="px-4 sm:px-6 lg:px-8 text-gray-500 italic">No popular posts to display right now.</p>
         )}
       </section>
    </div>
  );
};


// --- COMPONENT: Footer ---

const Footer = ({ categories = [] }) => (
  <footer className="bg-white text-gray-700 border-t">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        {/* Brand and Newsletter Section */}
        <div className="md:col-span-2 lg:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            {/* Logo Placeholder */}
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-serif">ZenNest</h3>
          </div>
          <p className="text-sm text-gray-600 max-w-sm mb-8">
            Africa’s most trusted rental platform. Find, list, and manage properties with ease—no agents, no stress.
          </p>
          <hr className="w-24 border-gray-300 mb-8" />
          <h4 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wider">Stay Connected</h4>
          <p className="text-sm text-gray-600 mb-4">Get updates on new features and market insights.</p>
          <form className="flex">
            <input type="email" placeholder="Your email address" className="w-full px-4 py-2 text-sm border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:outline-none" aria-label="Email for newsletter"/>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-r-md hover:bg-blue-700 text-sm transition-colors">
              Subscribe
            </button>
          </form>
        </div>

        {/* Navigation Sections */}
        <div>
          <h4 className="font-semibold text-gray-500 mb-4 text-xs uppercase tracking-wider">For Renters</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="relative group inline-block text-gray-700 hover:text-blue-600"><span>Find Rentals</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a></li>
            <li><a href="#" className="relative group inline-block text-gray-700 hover:text-blue-600"><span>Short Stays</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a></li>
            {/* Add more relevant links */}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-500 mb-4 text-xs uppercase tracking-wider">For Landlords</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="relative group inline-block text-gray-700 hover:text-blue-600"><span>List Property</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a></li>
            <li><a href="#" className="relative group inline-block text-gray-700 hover:text-blue-600"><span>For Real Estate Developers</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a></li>
             {/* Add more relevant links */}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-500 mb-4 text-xs uppercase tracking-wider">Hosting</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="relative group inline-block text-gray-700 hover:text-blue-600"><span>Turn Your Property Into Revenue</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a></li>
            <li><a href="#" className="relative group inline-block text-gray-700 hover:text-blue-600"><span>ZenStays Hosting</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a></li>
             {/* Add more relevant links */}
          </ul>
        </div>

        {/* Blog Categories Section */}
        <div>
          <h4 className="font-semibold text-gray-500 mb-4 text-xs uppercase tracking-wider">Blog Categories</h4>
          <ul className="space-y-3 text-sm">
            {/* Display up to 4 categories */}
            {categories.slice(0, 4).map(cat => (
              <li key={cat}>
                <a
                  href={`#${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} // Create a simple slug
                  className="relative group inline-block text-gray-700 hover:text-blue-600"
                 >
                  <span>{cat}</span>
                  <span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span>
                 </a>
              </li>
            ))}
             {/* Add a 'View All' link if there are more categories */}
             {categories.length > 4 && (
                <li><a href="#" className="text-blue-600 hover:underline font-semibold text-xs">View All &rarr;</a></li>
             )}
              {/* Show message if no categories */}
             {categories.length === 0 && (
                <li className="text-xs text-gray-500 italic">No categories available.</li>
             )}
          </ul>
        </div>
      </div>

      {/* Secondary Footer Links */}
      <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-sm mb-4 md:mb-0">
          <a href="#" className="relative group inline-block text-gray-700 hover:text-blue-600"><span>About Us</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a>
          <a href="#" className="relative group inline-block text-gray-700 hover:text-blue-600"><span>Careers</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a>
          <a href="#" className="relative group inline-block text-gray-700 hover:text-blue-600"><span>Contact</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a>
          <a href="#" className="relative group inline-block text-gray-700 hover:text-blue-600"><span>Terms & Privacy</span><span className="absolute bottom-0 left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span></a>
        </div>
        {/* Potentially add language/currency selector here if needed */}
      </div>

       {/* Copyright and Social Icons */}
       <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col-reverse md:flex-row justify-between items-center">
         <p className="text-sm text-gray-500 mt-4 md:mt-0">&copy; {new Date().getFullYear()} ZenNest. All rights reserved.</p>
         <div className="flex space-x-4">
           {/* Social Icons using the SocialIcon component */}
           <SocialIcon href="#">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
               </svg>
            </SocialIcon>
           <SocialIcon href="#">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.74 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.74 24 12 24s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98C23.986 15.667 24 15.26 24 12s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/>
               </svg>
            </SocialIcon>
           <SocialIcon href="#">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
               </svg>
           </SocialIcon>
         </div>
       </div>
    </div>
  </footer>
);


// --- MAIN APP COMPONENT ---

const App = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Google Fonts (only runs once on mount)
  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700&family=Inter:wght@400;600;700&display=swap";
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Load posts from JSON file (only runs once on mount)
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Correct path assuming blogData.json is in public/data/
        const response = await fetch('/data/blogData.json');
        if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Flatten the grouped posts into a single array, adding category to each post object
        const allPosts = Object.keys(data).flatMap(category =>
          data[category].map(post => ({ ...post, category }))
        );
        setPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        // Optionally set an error state here to show an error message to the user
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // Memoize posts grouped by category
  const postsByCategory = useMemo(() => posts.reduce((acc, post) => {
    if (!acc[post.category]) acc[post.category] = [];
    acc[post.category].push(post);
    return acc;
  }, {}), [posts]);

  // Memoize all posts sorted by date (newest first)
  const allPostsSorted = useMemo(() =>
    [...posts].sort((a, b) => {
       // Handle potential invalid dates gracefully
       const dateA = new Date(a.date);
       const dateB = new Date(b.date);
       if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0; // Keep original order if dates are invalid
       return dateB - dateA; // Sort descending
    }),
  [posts]);

  // Memoize the most recent posts for the hero slider
  const recentPostsForSlider = useMemo(() =>
    allPostsSorted.slice(0, 4), // Get the first 4 posts
  [allPostsSorted]);

  // Memoize a selection of popular posts (currently randomized subset)
   const popularPosts = useMemo(() => {
     // Ensure enough posts exist before slicing
     const count = Math.min(5, posts.length);
     // Simple randomization for now, consider a more robust "popularity" metric later
     return [...posts].sort(() => 0.5 - Math.random()).slice(0, count);
   }, [posts]);


  // Navigation links data
  const navLinks = [
    { name: 'Home', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { name: 'Stays', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 21h20"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 21v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5"/><path d="M9 10h6"/><path d="M9 6h6"/></svg> },
    { name: 'Blog', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4"/><path d="M16 2v20"/><path d="M11 7h5"/><path d="M11 12h5"/><path d="M11 17h5"/></svg> },
    { name: 'Tenants', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6"/><path d="M23 11h-6"/></svg> },
  ];

  // Get category names for the footer
  const categoriesForFooter = Object.keys(postsByCategory);

  // Scroll to top when a post is selected
  useEffect(() => {
    if (selectedPost) {
      window.scrollTo(0, 0);
    }
  }, [selectedPost]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900"> {/* Added default text color */}
      {/* Conditional Rendering: Show selected post details or the main blog layout */}
      {selectedPost ? (
        // Detailed Post View
        <div className="max-w-4xl mx-auto px-4 py-8">
          <article className="bg-white rounded-lg shadow-lg overflow-hidden"> {/* Added shadow and rounded corners */}
             {/* Back Button */}
             <div className="p-6 md:p-10 border-b"> {/* Added border */}
                 <button onClick={() => setSelectedPost(null)} className="mb-6 text-blue-600 hover:text-blue-800 flex items-center group font-semibold text-sm">
                   <svg className="mr-2 group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                   Back to Blog
                 </button>
                 {/* Post Header */}
                 <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-2">{selectedPost.category}</p>
                 <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-3">{selectedPost.title}</h1>
                 <p className="text-sm text-gray-500">{selectedPost.date} • {Math.ceil(selectedPost.title.length / 20)} min read</p>
             </div>
             {/* Post Image */}
            <div className="relative h-64 md:h-96 w-full"> {/* Ensure full width */}
              <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-full object-cover" />
            </div>
             {/* Post Content */}
            <div className="p-6 md:p-10">
              {/* Using Tailwind Typography plugin for prose styling */}
              <div className="prose max-w-none prose-lg prose-blue prose-img:rounded-lg prose-a:text-blue-600 hover:prose-a:text-blue-800">
                <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
              </div>
            </div>
          </article>
        </div>
      ) : (
        // Main Blog Layout View
        <>
          <HeroSlider
            posts={recentPostsForSlider}
            navLinks={navLinks}
            onPostSelect={setSelectedPost}
          />
          {/* Introductory Section */}
          <section className="bg-gray-50 py-12 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
              <h2 className="text-3xl font-bold font-serif text-gray-900 mb-2">Renting, Simplified</h2>
              <p className="text-lg text-gray-600">Discover insights, tips, and trends in the rental market.</p>
            </div>
          </section>
          {/* Main Content Area (Posts Grid & Sidebar) */}
          <MainContent
            onPostSelect={setSelectedPost}
            loading={loading}
            allPosts={allPostsSorted}
            postsByCategory={postsByCategory}
            popularPosts={popularPosts}
          />
        </>
      )}
      {/* Footer */}
      <Footer categories={categoriesForFooter} />
    </div>
  );
};

export default App;

