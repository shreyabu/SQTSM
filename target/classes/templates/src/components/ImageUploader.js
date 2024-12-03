import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

function ImageUploader({ apiKey, onUploadSuccess }) {
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const handleUploadImage = async (file) => {
        if (!file) return;
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${apiKey}`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const result = await response.json();
            if (result.success) {
                setImageUrl(result.data.url);
                onUploadSuccess(result.data.url); // Notify parent component of successful upload
                toast.success('Image uploaded successfully.');
            } else {
                throw new Error('Upload failed.');
            }
        } catch (error) {
            console.error('Image upload failed:', error);
            toast.error('Failed to upload image.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="image-uploader">
            <label className="block font-medium">Upload Product Image:</label>
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="w-full h-40 object-cover rounded-md mb-2"
                />
            )}
            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUploadImage(e.target.files[0])}
                className="border px-3 py-2 rounded-md"
            />
            {uploading && <p className="text-gray-500 mt-1">Uploading...</p>}
        </div>
    );
}

ImageUploader.propTypes = {
    apiKey: PropTypes.string.isRequired,
    onUploadSuccess: PropTypes.func.isRequired,
};

export default ImageUploader;
