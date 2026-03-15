import { useState } from "react";
import axios from "axios";

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file, preset = 0) => {
    setUploading(true);
    setError(null);
    const presets = [
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      import.meta.env.VITE_CLOUDINARY_PROFILE_UPLOAD_PRESET,
    ];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", presets[preset]);
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );
      return {
        success: true,
        url: response.data.secure_url,
        publicId: response.data.public_id,
        width: response.data.width,
        height: response.data.height,
        format: response.data.format,
        bytes: response.data.bytes,
      };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error?.message || "Failed to upload image";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setUploading(false);
    }
  };

  const uploadMultipleImages = async (files) => {
    setUploading(true);
    setError(null);

    try {
      const uploadPromises = files.map((file) => uploadImage(file));
      const results = await Promise.all(uploadPromises);

      const successful = results
        .filter((result) => result.success)
        .map((result) => result.url);

      const failed = results.filter((result) => !result.success);

      if (failed.length > 0) {
        setError(`${failed.length} images failed to upload`);
      }

      return {
        success: successful.length > 0,
        urls: successful,
        failed: failed.length,
      };
    } catch (err) {
      setError("Failed to upload multiple images");
      return { success: false, error: "Failed to upload multiple images" };
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    error,
    uploadImage,
    uploadMultipleImages,
  };
};
