
import React from 'react';

const stats = [
  { value: '10M+', label: 'Happy Customers' },
  { value: '50K+', label: 'Service Partners' },
  { value: '4.8', label: 'Average Rating' },
];

const Stats: React.FC = () => {
  return (
    <div className="bg-[#1a2333]">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold">{stat.value}</p>
              <p className="text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
