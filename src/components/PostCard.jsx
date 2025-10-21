import React from 'react';

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

export default PostCard;