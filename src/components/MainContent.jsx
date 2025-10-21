// src/components/MainContent.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import PostCard from './PostCard';
import CarouselPostCard from './CarouselPostCard';

const MainContent = ({ onPostSelect, loading, allPosts, postsByCategory, popularPosts }) => {
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({ threshold: 0.1 });
  const pageSize = 10; // Adjusted for magazine layout

  // NEW: State to track expanded categories
  const [expandedCategories, setExpandedCategories] = useState([]);

  // Toggle expansion for a category
  const toggleCategory = (cat) => {
    setExpandedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  useEffect(() => {
    if (inView && !loading) {
      setPage(currentPage => {
        const hasMore = allPosts.length > currentPage * pageSize;
        return hasMore ? currentPage + 1 : currentPage;
      });
    }
  }, [inView, loading, allPosts.length]);

  const displayedPosts = useMemo(() => {
    return allPosts.slice(0, page * pageSize);
  }, [allPosts, page]);

  if (loading && displayedPosts.length === 0) { 
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 animate-pulse">
          <div className="lg:col-span-3 space-y-12">
            <div className="h-96 bg-gray-200 rounded-lg w-full mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-200 rounded-lg h-64"></div>
              <div className="bg-gray-200 rounded-lg h-64"></div>
            </div>
          </div>
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-gray-200 rounded-lg h-24"></div>
            <div className="bg-gray-200 rounded-lg h-64"></div>
            <div className="bg-gray-200 rounded-lg h-64"></div>
          </aside>
        </div>
      </div>
    );
  }

  const categories = Object.keys(postsByCategory);
  const featuredPost = displayedPosts[0];
  const secondaryPosts = displayedPosts.slice(1, 3);
  const latestPosts = displayedPosts.slice(3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <main className="lg:col-span-3 space-y-16">
          {/* Featured Story */}
          {featuredPost && (
            <section aria-labelledby="featured-story">
              <h2 id="featured-story" className="sr-only">Featured Story</h2>
              <PostCard post={featuredPost} onClick={() => onPostSelect(featuredPost)} layout="featured" />
            </section>
          )}

          {/* Secondary Stories */}
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

          {/* Latest Posts Grid */}
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

          <div ref={ref} className="text-center py-8">
            {displayedPosts.length < allPosts.length && (
                 <button className="text-blue-600 hover:underline text-sm" disabled>
                     Loading More...
                 </button>
            )}
          </div>
        </main>

        <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-20 lg:self-start" role="complementary">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-bold font-serif text-gray-900 mb-4">Quick Search</h3>
            <input type="search" placeholder="Search articles..." className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" aria-label="Search articles" />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-bold font-serif text-gray-900 mb-4">Get Market Updates</h3>
            <form aria-label="Newsletter signup">
              <input type="email" placeholder="Enter your email" className="w-full p-2 border border-gray-300 rounded mb-2" aria-required="true" />
              <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Subscribe</button>
            </form>
          </div>

          <div className="bg-gray-50 rounded-lg">
            <h3 className="font-bold font-serif text-gray-900 p-4 border-b border-gray-200">Categories</h3>
            <ul className="divide-y divide-gray-200">
              {categories.map(cat => (
                <li key={cat} className="p-4 hover:bg-gray-100 transition-colors">
                  <button 
                    onClick={() => toggleCategory(cat)} 
                    className="text-sm font-medium text-gray-900 hover:text-blue-600 relative group inline-block w-full text-left"
                  >
                    <span>{cat}</span>
                    <span className="absolute bottom-[-2px] left-0 block w-full h-[1px] bg-blue-600 transition-transform duration-300 ease-out transform scale-x-0 group-hover:scale-x-100"></span>
                  </button>
                  {expandedCategories.includes(cat) && (
                    <ul className="mt-2 max-h-48 overflow-y-auto divide-y divide-gray-100">
                      {postsByCategory[cat].map(post => (
                        <li key={post.id} className="py-2">
                          <a 
                            href="#" 
                            onClick={(e) => { e.preventDefault(); onPostSelect(post); }} 
                            className="text-xs font-medium text-gray-900 hover:text-blue-600 block"
                          >
                            {post.title}
                            <p className="text-xs text-gray-500">{post.date}</p>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

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
            </ul>
          </div>
        </aside>
      </div>

      <section className="mt-16 py-12 bg-gray-50 rounded-lg" role="region" aria-label="Popular Posts Carousel">
        <h2 className="text-3xl font-bold font-serif text-gray-900 mb-8 px-4 sm:px-6 lg:px-8">Popular Reads</h2>
        <div className="flex overflow-x-auto gap-8 snap-x scrollbar-hide px-4 sm:px-6 lg:px-8">
          {popularPosts.map(post => (
            <div key={post.id} className="min-w-[300px] snap-center">
              <CarouselPostCard post={post} onClick={() => onPostSelect(post)} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainContent;
