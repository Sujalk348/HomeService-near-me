
import React from 'react';

const metricsData = [
  { value: '4.8', title: 'Average Rating', subtitle: 'Based on 2M+ reviews' },
  { value: '95%', title: 'On-time Arrival', subtitle: 'Punctuality guaranteed' },
  { value: '100%', title: 'Background Verified', subtitle: 'Professionals' },
  { value: '24/7', title: 'Customer Support', subtitle: 'Always here to help' },
];

const Metrics: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-12 border-t border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {metricsData.map((metric, index) => (
            <div key={index}>
              <p className="text-4xl font-bold text-gray-800">{metric.value}</p>
              <p className="text-lg font-semibold text-gray-700 mt-2">{metric.title}</p>
              <p className="text-sm text-gray-500">{metric.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
