import React, { useState, useEffect } from 'react';
import api from '../api/api';
import Pagination from '../components/Pagination';
import ImageUploader from '../components/ImageUploader';
import CategorySelect from '../components/CategorySelect';
import { toast } from 'react-toastify';

function AdsManagement() {
    const [ads, setAds] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [editingAd, setEditingAd] = useState(null);
    const [products, setProducts] = useState([]);
    const [productPage, setProductPage] = useState(0);
    const [productTotalPages, setProductTotalPages] = useState(0);
    const token = localStorage.getItem('token');

    // Fetch Ads
    const fetchAds = async (page) => {
        try {
            const response = await api.get('/ad', {
                params: { page, size: 10 },
                headers: { Authorization: `Bearer ${token}` },
            });
            setAds(response.data.content || []);
            setTotalPages(response.data.totalPages || 0);
            setCurrentPage(response.data.number || 0);
        } catch (error) {
            console.error('Failed to fetch ads:', error);
            toast.error('Failed to load ads.');
        }
    };

    // Fetch Products (Paginated)
    const fetchProducts = async (page = 0) => {
        try {
            const response = await api.get('/product', {
                params: { page, size: 10 },
                headers: { Authorization: `Bearer ${token}` },
            });
            const newProducts = response.data.content || [];
            setProducts((prevProducts) => {
                const allProducts = [...prevProducts, ...newProducts];
                return allProducts.filter(
                    (product, index, self) =>
                        index === self.findIndex((p) => p.id === product.id)
                );
            });
            setProductPage(response.data.number || 0);
            setProductTotalPages(response.data.totalPages || 0);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            toast.error('Failed to load products.');
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if (
                scrollHeight - scrollTop === clientHeight &&
                productPage < productTotalPages - 1
            ) {
                fetchProducts(productPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [productPage, productTotalPages]);

    useEffect(() => {
        fetchAds(currentPage);
        fetchProducts();
    }, [currentPage]);

    // Save or update ad
    const handleSaveAd = async (ad) => {
        console.log(ad);
        try {
            if (ad.id) {
                await api.put('/ad', ad, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success('Ad updated successfully.');
            } else {
                await api.post('/ad', ad, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success('Ad added successfully.');
            }
            fetchAds(currentPage);
            setEditingAd(null);
        } catch (error) {
            console.error('Failed to save ad:', error);
            toast.error('Failed to save ad.');
        }
    };

    // 删除广告
    const handleDeleteAd = async (adId) => {
        try {
            await api.delete(`/ad/${adId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Ad deleted successfully.');
            fetchAds(currentPage); // 重新加载广告列表
        } catch (error) {
            console.error('Failed to delete ad:', error);
            toast.error('Failed to delete ad.');
        }
    };


    return (
        <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Ads Management</h2>
            <button
                onClick={() => setEditingAd({ products: [], categories: [], image: '' })}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Add Ad
            </button>
            <table className="w-full border-collapse border border-gray-200 text-center mb-4">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Clicks</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ads.map((ad) => (
                        <tr key={`ad-${ad.id}`}>
                            <td className="border px-4 py-2">{ad.title}</td>
                            <td className="border px-4 py-2">{ad.description}</td>
                            <td className="border px-4 py-2">{ad.clicks}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => setEditingAd(ad)}
                                    className="text-blue-600 hover:underline mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteAd(ad.id)}
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

            {editingAd && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-[500px]">
                        <h2 className="text-lg font-bold mb-4">
                            {editingAd.id ? 'Edit Ad' : 'Add Ad'}
                        </h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSaveAd(editingAd);
                            }}
                        >
                            <div className="mb-4">
                                <label className="block font-medium">Title:</label>
                                <input
                                    type="text"
                                    value={editingAd.title || ''}
                                    onChange={(e) =>
                                        setEditingAd({ ...editingAd, title: e.target.value })
                                    }
                                    className="w-full border px-3 py-2 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Description:</label>
                                <textarea
                                    value={editingAd.description || ''}
                                    onChange={(e) =>
                                        setEditingAd({ ...editingAd, description: e.target.value })
                                    }
                                    className="w-full border px-3 py-2 rounded-md"
                                    required
                                />
                            </div>
                            <CategorySelect
                                selectedCategories={editingAd.categories || []}
                                onChange={(updatedCategories) =>
                                    setEditingAd({
                                        ...editingAd,
                                        categories: updatedCategories,
                                    })
                                }
                            />
                            <div className="mb-4">
                                <label className="block font-medium">Products:</label>
                                <select
                                    multiple
                                    value={editingAd.products.map((p) => p.id) || []}
                                    onChange={(e) => {
                                        const selectedProductIds = Array.from(
                                            e.target.selectedOptions,
                                            (option) => parseInt(option.value, 10)
                                        );
                                        const selectedProducts = products.filter((product) =>
                                            selectedProductIds.includes(product.id)
                                        );
                                        setEditingAd({ ...editingAd, products: selectedProducts });
                                    }}
                                    className="w-full border px-3 py-2 rounded-md"
                                    style={{ height: '200px', overflowY: 'scroll' }}
                                >
                                    {products.map((product) => (
                                        <option key={`product-${product.id}`} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Image:</label>
                                <ImageUploader
                                    apiKey="b4502954e4b17cc48df7fe374f3c1b46"
                                    onUploadSuccess={(url) =>
                                        setEditingAd({ ...editingAd, image: url })
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
                                    onClick={() => setEditingAd(null)}
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

export default AdsManagement;
