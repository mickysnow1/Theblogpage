import React from 'react';

const SocialIcon = ({ href, children }) => (
  <a href={href} className="text-gray-500 hover:text-gray-800 transition-colors">
    <span className="sr-only">{href}</span>
    {children}
  </a>
);

export default SocialIcon;
