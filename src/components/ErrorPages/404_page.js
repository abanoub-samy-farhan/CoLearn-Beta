import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-purple-500">404</h1>
                <p className="text-xl text-gray-700 mt-4">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <Link to="/" className="mt-6 inline-block px-6 py-3 text-black transparent rounded hover:text-purple-600">
                    Go back to the homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
