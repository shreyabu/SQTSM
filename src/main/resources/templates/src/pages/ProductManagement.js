import React, { useState, useEffect } from 'react';
import api from '../api/api';
import Pagination from '../components/Pagination';
import ImageUploader from '../components/ImageUploader';
import CategorySelect from '../components/CategorySelect';
import { toast } from 'react-toastify';

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [editingProduct, setEditingProduct] = useState(null); // Current product being edited

    const token = localStorage.getItem('token');

    // Fetch products
    const fetchProducts = async (page) => {
        try {
            const response = await api.get('/product', {
                params: { page, size: 10 },
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.number);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            toast.error('Failed to load products.');
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    // Save or update product
    const handleSaveProduct = async (product) => {
        try {
            if (product.id) {
                await api.put(`/product`, product, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success('Product updated successfully.');
            } else {
                await api.post('/product', product, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success('Product added successfully.');
            }
            fetchProducts(currentPage);
            setEditingProduct(null);
        } catch (error) {
            console.error('Failed to save product:', error);
            toast.error('Failed to save product.');
        }
    };

    // Delete product
    const handleDeleteProduct = async (productId) => {
        try {
            await api.delete(`/product/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Product deleted successfully.');
            fetchProducts(currentPage);
        } catch (error) {
            console.error('Failed to delete product:', error);
            toast.error('Failed to delete product.');
        }
    };

    // Render product list
    return (
        <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Product Management</h2>
            <button
                onClick={() => setEditingProduct({ categories: [], image: '' })}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Add Product
            </button>
            <table className="w-full border-collapse border border-gray-200 text-center mb-4">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Image</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="border px-4 py-2">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                            </td>
                            <td className="border px-4 py-2">{product.name}</td>
                            <td className="border px-4 py-2">{product.description}</td>
                            <td className="border px-4 py-2">${product.price.toFixed(2)}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => setEditingProduct(product)}
                                    className="text-blue-600 hover:underline mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            {/* Edit Product Modal */}
            {editingProduct && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto"
                >
                    <div
                        className="bg-white p-6 rounded-md shadow-lg w-[500px] max-h-[90vh] overflow-y-auto"
                    >
                        <h2 className="text-lg font-bold mb-4">
                            {editingProduct.id ? 'Edit Product' : 'Add Product'}
                        </h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSaveProduct(editingProduct);
                            }}
                        >
                            <div className="mb-4">
                                <label className="block font-medium">Name:</label>
                                <input
                                    type="text"
                                    value={editingProduct.name || ''}
                                    onChange={(e) =>
                                        setEditingProduct({
                                            ...editingProduct,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full border px-3 py-2 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Description:</label>
                                <textarea
                                    value={editingProduct.description || ''}
                                    onChange={(e) =>
                                        setEditingProduct({
                                            ...editingProduct,
                                            description: e.target.value,
                                        })
                                    }
                                    className="w-full border px-3 py-2 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Price:</label>
                                <input
                                    type="number"
                                    value={editingProduct.price || ''}
                                    onChange={(e) =>
                                        setEditingProduct({
                                            ...editingProduct,
                                            price: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full border px-3 py-2 rounded-md"
                                    required
                                />
                            </div>
                            <CategorySelect
                                selectedCategories={editingProduct.categories || []}
                                onChange={(updatedCategories) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        categories: updatedCategories,
                                    })
                                }
                            />
                            <div className="mb-4">
                                <label className="block font-medium">Image:</label>
                                <ImageUploader
                                    apiKey="b4502954e4b17cc48df7fe374f3c1b46"
                                    onUploadSuccess={(url) =>
                                        setEditingProduct({ ...editingProduct, image: url })
                                    }
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => setEditingProduct(null)}
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ProductManagement;
