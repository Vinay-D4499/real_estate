import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from "../../config/baseURL";
import { toast } from 'react-hot-toast'; // Importing toast

const MediaUpload = ({ propertyId, onUploadComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);

      // Generate a preview for the selected media
      const fileURL = URL.createObjectURL(file);
      setPreview(fileURL);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      toast.error('Please select a file to upload.'); // Toast message for no file selected
      return;
    }

    const isImage = selectedFile.type.startsWith('image');
    const uploadURL = isImage
      ? `${baseURL}/api/PropertyMedia/propertyMedia_img/${propertyId}`
      : `${baseURL}/api/propertyMedia/propertyMedia_video/${propertyId}`;

    const formData = new FormData();
    formData.append(isImage ? 'file' : 'video', selectedFile);

    setUploading(true);
    setError(null);

    try {
      const response = await axios.post(uploadURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUploadComplete(response.data); // Notify parent of the successful upload
      setSelectedFile(null);
      setPreview(null);
      toast.success('Media uploaded successfully!'); // Toast message for successful upload
    } catch (uploadError) {
      setError('Failed to upload media. Please try again.');
      toast.error('Failed to upload media. Please try again.'); // Toast message for error
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="media-uploader">
  {/* File Input */}
  <input
    type="file"
    accept="image/*,video/*"
    onChange={handleFileChange}
    className="mb-4"
  />

  {/* Preview */}
  {preview && (
    <div className="preview mb-4">
      {selectedFile.type.startsWith("image") ? (
        <img
          src={preview}
          alt="Preview"
          className="w-52 max-w-md h-52 rounded-md "
        />
      ) : (
        <video
          controls
          className="w-full max-w-md h-auto rounded-md mx-auto"
        >
          <source src={preview} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )}

  {/* Upload Button */}
  <button
    onClick={handleUpload}
    disabled={uploading}
    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
  >
    {uploading ? "Uploading..." : "Upload"}
  </button>

  {/* Error Message */}
  {error && <p className="text-red-500 mt-2">{error}</p>}
</div>
  );
};

export default MediaUpload;
