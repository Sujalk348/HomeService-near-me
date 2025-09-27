
import React, { useState } from 'react';
import { ChevronDownIcon, LightningBoltIcon, CalendarIcon, StarIcon, ClockIcon } from './Icons';

interface HeroProps {
    onSearch: (term: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [selectedService, setSelectedService] = useState('');

  const handleBookNow = () => {
    if (selectedService) {
        onSearch(selectedService);
    } else {
        onSearch(''); // Or show an alert to select a service
    }
  }

  return (
    <div className="bg-[#1a2333] text-white pt-16 pb-24">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Text and Booking */}
        <div>
          <span className="inline-block bg-gray-700/50 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            ⭐ Trusted by 10M+ customers
          </span>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Home services, <br />
            <span className="text-yellow-400">on-demand</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-lg">
            Experienced, hand-picked Professionals to serve you at your doorstep
          </p>

          <div className="bg-white text-gray-800 rounded-xl p-6 mt-10 shadow-2xl">
            <h3 className="font-bold text-lg">Book a service</h3>
            <div className="grid md:grid-cols-[1fr,1fr,auto] gap-4 mt-4 items-center">
              <div className="relative">
                <select 
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-transparent"
                >
                  <option value="">Select service</option>
                  <option value="Cleaning">House Cleaning</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="AC Repair">AC Repair</option>
                </select>
                <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              <input
                type="text"
                placeholder="Enter pincode"
                className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button onClick={handleBookNow} className="bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                Book Now <span className="ml-2">→</span>
              </button>
            </div>
            <div className="flex justify-between items-center mt-4 text-sm">
                <div className="flex items-center text-green-600 font-semibold">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    Available now • Arrives in 60 mins
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <span>Instant</span>
                        <LightningBoltIcon className="h-5 w-5 text-yellow-500" />
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                    </div>
                    <CalendarIcon className="h-6 w-6 text-gray-500" />
                </div>
            </div>
          </div>
        </div>
        
        {/* Right Side: Image */}
        <div className="relative hidden lg:block">
          <img
            src="https://picsum.photos/id/1060/800/1000"
            alt="Home service professional cleaning a floor"
            className="rounded-2xl h-[500px] w-full object-cover"
          />
          <div className="absolute -left-12 top-20 bg-white/90 backdrop-blur-sm text-gray-800 p-4 rounded-lg shadow-lg flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <StarIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="font-bold">4.8 Rating</p>
              <p className="text-xs text-gray-500">1000+ reviews</p>
            </div>
          </div>
          <div className="absolute -right-8 bottom-24 bg-white/90 backdrop-blur-sm text-gray-800 p-4 rounded-lg shadow-lg flex items-center space-x-3">
             <div className="bg-green-100 p-2 rounded-full">
               <ClockIcon className="h-6 w-6 text-green-500" />
             </div>
             <div>
               <p className="font-bold">On-time arrival</p>
               <p className="text-xs text-gray-500">Guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
