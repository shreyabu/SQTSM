import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';

function CategorySelect({ selectedCategories, onChange }) {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch categories from the API
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setCategories(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                toast.error('Failed to load categories.');
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (isLoading) {
        return <p>Loading categories...</p>;
    }

    return (
        <div className="mb-4">
            <label className="block font-medium">Categories:</label>
            <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            value={category}
                            checked={selectedCategories.includes(category)}
                            onChange={(e) => {
                                const { value, checked } = e.target;
                                const updatedCategories = checked
                                    ? [...selectedCategories, value]
                                    : selectedCategories.filter((c) => c !== value);
                                onChange(updatedCategories);
                            }}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>{category}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default CategorySelect;
