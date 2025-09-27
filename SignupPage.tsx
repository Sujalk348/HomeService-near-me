
import React, { useState } from 'react';
import { User } from '../types';

interface SignupPageProps {
    onSignup: (user: User) => void;
    onSwitchToLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email && password) {
            // This is a mock signup.
            onSignup({ id: Date.now().toString(), name, email });
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <div className="py-20 bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-1 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors">
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{' '}
                    <button onClick={onSwitchToLogin} className="font-semibold text-yellow-500 hover:underline">
                        Log In
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
