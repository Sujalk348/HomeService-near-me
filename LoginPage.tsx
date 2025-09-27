
import React, { useState } from 'react';
import { User } from '../types';

interface LoginPageProps {
    onLogin: (user: User) => void;
    onSwitchToSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSwitchToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // This is a mock login. In a real app, you would validate credentials.
        if (email && password) {
            onLogin({ id: '1', name: email.split('@')[0], email: email });
        } else {
            alert('Please enter email and password.');
        }
    };

    return (
        <div className="py-20 bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Log In</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        Log In
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{' '}
                    <button onClick={onSwitchToSignup} className="font-semibold text-yellow-500 hover:underline">
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
