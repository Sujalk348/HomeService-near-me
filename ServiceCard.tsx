
import React from 'react';
import { Service } from '../types';
import { ArrowRightIcon, CheckCircleIcon, StarIcon } from './Icons';

interface ServiceCardProps {
    service: Service;
    onBookNow: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBookNow }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg flex flex-col md:flex-row gap-6 p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="w-full md:w-1/3 relative">
        <img src={service.imageUrl} alt={service.title} className="rounded-md w-full h-48 object-cover"/>
        {service.availableNow && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center">
                <i className="fas fa-bolt mr-1"></i> Available Now
            </div>
        )}
      </div>
      <div className="w-full md:w-2/3 flex flex-col">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{service.description}</p>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
                 <p className="text-2xl font-bold text-gray-900">₹{service.price.toLocaleString()}</p>
                 <button onClick={() => onBookNow(service)} className="bg-gray-800 text-white font-bold py-2 px-5 rounded-lg mt-2 text-sm hover:bg-gray-700 transition-colors">Book Now <ArrowRightIcon className="inline h-4 w-4"/></button>
            </div>
        </div>
        
        <div className="flex flex-wrap gap-2 my-3">
            {service.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
            ))}
        </div>
        
        <div className="mt-auto pt-3 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
             <div className="flex items-center space-x-3">
                <img src={service.professional.avatarUrl} alt={service.professional.name} className="h-10 w-10 rounded-full"/>
                <div>
                    <p className="font-semibold text-gray-700 flex items-center">{service.professional.name} {service.verified && <CheckCircleIcon className="h-4 w-4 ml-1.5 text-green-500"/>}</p>
                    <p className="text-xs text-gray-500">{service.professional.experience}</p>
                </div>
             </div>
             <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400 mr-1"/>
                    <span className="font-bold">{service.rating}</span>
                    <span className="text-gray-400 ml-1">({service.reviews} reviews)</span>
                </div>
                <span>•</span>
                <span>{service.duration}</span>
                <span>•</span>
                <span>{service.location}</span>
             </div>
        </div>
      </div>
    </div>
  );
};
