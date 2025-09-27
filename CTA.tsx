
import React from 'react';
import { ArrowRightIcon } from './Icons';

interface CTAProps {
    onBrowseClick: () => void;
}

const CTA: React.FC<CTAProps> = ({ onBrowseClick }) => {
  return (
    <div className="bg-[#1a2333] text-white">
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold">Ready to Experience Premium Home Services?</h2>
        <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
          Join millions of satisfied customers across India
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <button 
            onClick={onBrowseClick}
            className="bg-white text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
           >
            Browse Services <ArrowRightIcon className="h-4 w-4 ml-2" />
          </button>
          <button className="bg-transparent border-2 border-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700/50 hover:border-gray-400 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTA;
