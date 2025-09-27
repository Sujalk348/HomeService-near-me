
import React from 'react';
import { Category, Service } from '../types';
import { ServiceCard } from './ServiceCard';
import { ArrowLeftIcon } from './Icons';

interface CategoryPageProps {
    category: Category;
    services: Service[];
    onBookNow: (service: Service) => void;
    onBack: () => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, services, onBookNow, onBack }) => {
    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900 font-semibold">
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Back to Categories
                    </button>
                    <h1 className="text-4xl font-bold text-gray-800 mt-4">{category.name}</h1>
                    <p className="text-lg text-gray-500 mt-2">{category.description}</p>
                </div>

                <div className="space-y-6">
                    {services.length > 0 ? (
                        services.map(service => (
                            <ServiceCard key={service.id} service={service} onBookNow={onBookNow} />
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-700">No services available in this category yet.</h3>
                            <p className="text-gray-500 mt-2">Please check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
