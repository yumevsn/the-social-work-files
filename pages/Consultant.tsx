
import React from 'react';
import { Link } from 'react-router-dom';

const Consultant: React.FC = () => {
  return (
    <div className="p-2">
      <div className="cl-header p-2 mb-4">
        <h2 className="text-xl font-bold text-red-800">Section Unavailable</h2>
      </div>
      <div className="cl-box p-4 bg-gray-50">
        <p className="text-sm text-gray-900">
          The AI Assistant has been removed from this platform. For professional resources, please visit our 
          <Link to="/ethics" className="cl-link ml-1">Ethics</Link>, 
          <Link to="/theory" className="cl-link ml-1">Theory</Link>, or 
          <Link to="/blog" className="cl-link ml-1">Blog</Link> sections.
        </p>
      </div>
    </div>
  );
};

export default Consultant;
