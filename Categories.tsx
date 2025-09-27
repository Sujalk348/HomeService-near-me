import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Category } from '../types';
import { ArrowRightIcon } from './Icons';

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
    <div className="relative">
      <img src={category.imageUrl} alt={category.name} className="w-full h-40 object-cover" />
      {category.popular && (
        <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">Popular</span>
      )}
    </div>
    <div className="p-5">
      <h3 className="font-bold text-lg text-gray-800">{category.name}</h3>
      <p className="text-gray-500 text-sm mt-1">{category.description}</p>
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600 text-sm font-medium">{category.serviceCount} services</p>
        <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-800 transition-colors" />
      </div>
    </div>
  </div>
);

const CategoryCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-40 bg-gray-200"></div>
    <div className="p-5">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  </div>
);


const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesCollection = collection(db, 'categories');
        const q = query(categoriesCollection, orderBy('name'));
        const categorySnapshot = await getDocs(q);
        const categoryList = categorySnapshot.docs.map(doc => doc.data() as Category);
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Popular Categories</h2>
        <p className="text-center text-gray-500 mt-2">
          Choose from our wide range of home services delivered by verified professionals
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => <CategoryCardSkeleton key={index} />)
          ) : (
            categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))
          )}
        </div>
        <div className="text-center mt-12">
          <button className="font-semibold border border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-100 transition-colors flex items-center mx-auto">
            View All Categories <ArrowRightIcon className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
