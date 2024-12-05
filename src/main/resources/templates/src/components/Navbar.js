import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

    const handleProfileClick = () => {
        if (user?.role === 'ADMIN') {
            navigate('/admin');
        } else {
            navigate('/profile');
        }
    };

    return (
        <nav className="bg-gray-100 p-4 shadow-md flex justify-between items-center">
            <div className="text-lg font-bold">
                <Link to="/">SQTSM</Link>
            </div>
            <div className="flex space-x-4 items-center">
                {user ? (
                    <>
                        <div
                            onClick={handleProfileClick}
                            className="flex items-center cursor-pointer hover:bg-gray-200 px-2 py-1 rounded-md transition duration-200"
                        >
                            <span className="text-gray-700">Hello, {user.username}</span>
                        </div>
                        <Link to="/cart" className="text-blue-500 hover:underline">
                            <i className="fas fa-shopping-cart"></i> Cart
                        </Link>
                    </>
                ) : (
                    <div className="space-x-2">
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Log in
                        </Link>
                        <span>/</span>
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Sign up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
