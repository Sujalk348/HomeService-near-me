import React, { useState, useMemo, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Service } from '../types';
import { SearchIcon, StarIcon, ArrowRightIcon, CheckCircleIcon } from './Icons';

// Sub-component for Filters
const Filters: React.FC<{
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  setSelectedRating: React.Dispatch<React.SetStateAction<number>>;
  setInstantAvailable: React.Dispatch<React.SetStateAction<boolean>>;
  setVerifiedOnly: React.Dispatch<React.SetStateAction<boolean>>;
  priceRange: [number, number];
  selectedRating: number;
  instantAvailable: boolean;
  verifiedOnly: boolean;
}> = ({ setPriceRange, setSelectedRating, setInstantAvailable, setVerifiedOnly, priceRange, selectedRating, instantAvailable, verifiedOnly }) => {
  return (
    <div className="w-full lg:w-1/4 lg:pr-8">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800">Filters</h3>
        
        {/* Price Range */}
        <div className="mt-6">
          <h4 className="font-semibold text-gray-700">Price Range</h4>
          <div className="flex items-center space-x-2 mt-2">
            <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} className="w-full p-2 border rounded-md" />
            <span>-</span>
            <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="w-full p-2 border rounded-md" />
          </div>
        </div>
        
        {/* Rating */}
        <div className="mt-6">
          <h4 className="font-semibold text-gray-700">Rating</h4>
          <div className="space-y-2 mt-2">
            {[4, 3, 2, 1].map(rating => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="rating" checked={selectedRating === rating} onChange={() => setSelectedRating(rating)} className="form-radio h-4 w-4 text-yellow-500" />
                <span className="flex items-center">
                  {[...Array(rating)].map((_, i) => <StarIcon key={i} className="h-5 w-5 text-yellow-400" />)}
                  <span className="ml-2 text-gray-600">& up</span>
                </span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Availability */}
        <div className="mt-6">
          <h4 className="font-semibold text-gray-700">Availability</h4>
          <label className="flex items-center space-x-2 mt-2 cursor-pointer">
            <input type="checkbox" checked={instantAvailable} onChange={e => setInstantAvailable(e.target.checked)} className="form-checkbox h-5 w-5 text-yellow-500 rounded" />
            <span className="text-gray-600">Instant Available</span>
          </label>
        </div>

        {/* Professional */}
        <div className="mt-6">
          <h4 className="font-semibold text-gray-700">Professional</h4>
          <label className="flex items-center space-x-2 mt-2 cursor-pointer">
            <input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)} className="form-checkbox h-5 w-5 text-yellow-500 rounded" />
            <span className="text-gray-600">Verified Only</span>
          </label>
        </div>
      </div>
    </div>
  );
};

// Sub-component for a single Service Card
const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
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
                 <button className="bg-gray-800 text-white font-bold py-2 px-5 rounded-lg mt-2 text-sm hover:bg-gray-700 transition-colors">Book Now <ArrowRightIcon className="inline h-4 w-4"/></button>
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

const ServiceCardSkeleton: React.FC = () => (
    <div className="bg-white border border-gray-200 rounded-lg flex flex-col md:flex-row gap-6 p-4 animate-pulse">
      <div className="w-full md:w-1/3 h-48 bg-gray-200 rounded-md"></div>
      <div className="w-full md:w-2/3 flex flex-col">
        <div className="flex justify-between items-start">
            <div>
                <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
                 <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
                 <div className="h-9 bg-gray-200 rounded-lg w-28"></div>
            </div>
        </div>
        <div className="flex flex-wrap gap-2 my-3">
            <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        </div>
        <div className="mt-auto pt-3 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
             <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                </div>
             </div>
             <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
);

// Main Component
const ServicesSection: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [selectedRating, setSelectedRating] = useState(0);
    const [instantAvailable, setInstantAvailable] = useState(false);
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesCollection = collection(db, 'services');
                const serviceSnapshot = await getDocs(servicesCollection);
                const serviceList = serviceSnapshot.docs.map(doc => ({ id: parseInt(doc.id, 10), ...doc.data() } as Service));
                setServices(serviceList);
            } catch (error) {
                console.error("Error fetching services: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const filteredServices = useMemo(() => {
        return services.filter(service => {
            const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || service.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1];
            const matchesRating = service.rating >= selectedRating;
            const matchesAvailability = !instantAvailable || service.availableNow;
            const matchesVerification = !verifiedOnly || service.verified;

            return matchesSearch && matchesPrice && matchesRating && matchesAvailability && matchesVerification;
        });
    }, [searchTerm, priceRange, selectedRating, instantAvailable, verifiedOnly, services]);

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-8">
        <Filters 
          setPriceRange={setPriceRange}
          setSelectedRating={setSelectedRating}
          setInstantAvailable={setInstantAvailable}
          setVerifiedOnly={setVerifiedOnly}
          priceRange={priceRange}
          selectedRating={selectedRating}
          instantAvailable={instantAvailable}
          verifiedOnly={verifiedOnly}
        />
        <div className="w-full lg:w-3/4">
          <div className="relative mb-6">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <p className="text-gray-600 mb-4">Showing {filteredServices.length} services</p>
          <div className="space-y-6">
            {loading ? (
                 Array.from({ length: 4 }).map((_, index) => <ServiceCardSkeleton key={index} />)
            ) : filteredServices.length > 0 ? (
                filteredServices.map(service => (
                    <ServiceCard key={service.id} service={service} />
                ))
            ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-700">No services found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
