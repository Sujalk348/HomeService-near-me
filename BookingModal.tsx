
import React from 'react';
import { Service, User } from '../types';
import { CheckCircleIcon } from './Icons';

interface BookingModalProps {
    service: Service;
    user: User;
    onClose: () => void;
    onConfirm: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ service, user, onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg animate-fade-in-up">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Confirm Your Booking</h2>
                    <p className="text-sm text-gray-500">You are booking as {user.name} ({user.email})</p>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <h3 className="font-bold text-lg">{service.title}</h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                    <div className="flex justify-between items-center text-lg font-semibold bg-gray-50 p-3 rounded-md">
                        <span>Total Price:</span>
                        <span className="text-2xl text-gray-900">₹{service.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-md border border-blue-200">
                        <CheckCircleIcon className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-blue-800">HomeServe Guarantee</h4>
                            <p className="text-sm text-blue-700">All services are backed by our quality promise, insurance cover, and dedicated customer support.</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
                    <button 
                        onClick={onClose}
                        className="bg-gray-200 text-gray-800 font-bold py-2 px-5 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="bg-gray-800 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
             <style>{`
                @keyframes fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default BookingModal;
