// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import HeroSlider from './components/HeroSlider';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import ReactMarkdown from 'react-markdown';

const App = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700&family=Inter:wght@400;600;700&display=swap";
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Load posts from JSON file
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/src/data/blogData.json'); // Path to your JSON file
        const data = await response.json();
        // Flatten the grouped posts into a single array, adding category to each
        const allPosts = Object.keys(data).flatMap(category => 
          data[category].map(post => ({ ...post, category }))
        );
        setPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const postsByCategory = useMemo(() => posts.reduce((acc, post) => {
    if (!acc[post.category]) acc[post.category] = [];
    acc[post.category].push(post);
    return acc;
  }, {}), [posts]);
  
  const allPostsSorted = useMemo(() =>
    [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)),
  [posts]);

  const recentPostsForSlider = useMemo(() => 
    allPostsSorted.slice(0, 4),
  [allPostsSorted]);

  const popularPosts = useMemo(() => 
    [...posts].sort(() => 0.5 - Math.random()).slice(0, 5),
  [posts]);

  const navLinks = [
    { name: 'Home', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { name: 'Stays', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 21h20"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 21v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5"/><path d="M9 10h6"/><path d="M9 6h6"/></svg> },
    { name: 'Blog', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4"/><path d="M16 2v20"/><path d="M11 7h5"/><path d="M11 12h5"/><path d="M11 17h5"/></svg> },
    { name: 'Tenants', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6"/><path d="M23 11h-6"/></svg> },
  ];

  const categoriesForFooter = Object.keys(postsByCategory);

  useEffect(() => {
    if (selectedPost) {
      window.scrollTo(0, 0);
    }
  }, [selectedPost]);

  return (
    <div className="min-h-screen bg-white font-sans">
      {selectedPost ? (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <article className="bg-white">
            <div className="relative h-64 md:h-96">
              <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="p-6 md:p-10">
              <button onClick={() => setSelectedPost(null)} className="mb-6 text-blue-600 hover:text-blue-800 flex items-center group font-semibold">
                <svg className="mr-2 group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                Back to News
              </button>
              <h1 className="text-3xl font-bold font-serif text-gray-900 mb-4">{selectedPost.title}</h1>
              <div className="prose max-w-none prose-lg prose-blue">
                <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
              </div>
            </div>
          </article>
        </div>
      ) : (
        <>
          <HeroSlider 
            posts={recentPostsForSlider} 
            navLinks={navLinks}
            onPostSelect={setSelectedPost}
          />
          <section className="bg-gray-50 py-12 border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold font-serif text-gray-900 mb-2">Renting, Simplified</h2>
              <p className="text-lg text-gray-600">Discover the right services to master every situation.</p>
            </div>
          </section>
          <MainContent 
            onPostSelect={setSelectedPost}
            loading={loading}
            allPosts={allPostsSorted}
            postsByCategory={postsByCategory}
            popularPosts={popularPosts}
          />
        </>
      )}
      <Footer categories={categoriesForFooter} />
    </div>
  );
};

export default App;