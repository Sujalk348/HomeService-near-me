import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { Testimonial } from '../types';
import { StarIcon, CheckCircleIcon } from './Icons';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {testimonial.avatarUrl ? (
          <img className="h-10 w-10 rounded-full" src={testimonial.avatarUrl} alt={testimonial.name} />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
            {testimonial.initials}
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-800 flex items-center">
            {testimonial.name}
            <CheckCircleIcon className="h-4 w-4 text-green-500 ml-1.5" />
          </p>
          <p className="text-sm text-gray-500">{testimonial.location}</p>
        </div>
      </div>
    </div>
    <div className="flex items-center my-3">
      {[...Array(testimonial.rating)].map((_, i) => (
        <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
      ))}
    </div>
    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">{testimonial.service}</span>
    <p className="text-gray-600 mt-4 relative">
      <span className="absolute -top-3 -left-3 text-5xl text-gray-100 font-serif">“</span>
      <span className="relative">{testimonial.comment}</span>
    </p>
  </div>
);

const TestimonialCardSkeleton: React.FC = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse">
        <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
        </div>
        <div className="flex items-center my-3">
            <div className="h-5 w-5 bg-gray-200 rounded"></div>
            <div className="h-5 w-5 bg-gray-200 rounded ml-1"></div>
            <div className="h-5 w-5 bg-gray-200 rounded ml-1"></div>
            <div className="h-5 w-5 bg-gray-200 rounded ml-1"></div>
            <div className="h-5 w-5 bg-gray-200 rounded ml-1"></div>
        </div>
        <div className="h-5 bg-gray-200 rounded w-20 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
);

const Testimonials: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const testimonialsCollection = collection(db, 'testimonials');
                const q = query(testimonialsCollection, limit(4));
                const testimonialSnapshot = await getDocs(q);
                const testimonialList = testimonialSnapshot.docs.map(doc => doc.data() as Testimonial);
                setTestimonials(testimonialList);
            } catch (error) {
                console.error("Error fetching testimonials: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">What Our Customers Say</h2>
        <p className="text-center text-gray-500 mt-2">
          Don't just take our word for it - see what millions of customers have to say about our services
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {loading ? (
             Array.from({ length: 4 }).map((_, index) => <TestimonialCardSkeleton key={index} />)
          ) : (
            testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
