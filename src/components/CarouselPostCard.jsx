import React from 'react';

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

export default CarouselPostCard;
