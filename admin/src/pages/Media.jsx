// pages/Media.jsx
import React, { useState } from "react";
import {
  LuImage as ImageIcon,
  LuUpload as Upload,
  LuVideo as Video,
  LuFile as File,
  LuX as X,
  LuDownload as Download,
  LuTrash2 as Trash2,
} from "react-icons/lu";

const Media = () => {
  const [mediaItems, setMediaItems] = useState([
    {
      id: 1,
      type: "image",
      name: "project-1.jpg",
      url: "https://via.placeholder.com/300",
      size: "2.4 MB",
      date: "2024-03-15",
    },
    {
      id: 2,
      type: "image",
      name: "profile-pic.png",
      url: "https://via.placeholder.com/300",
      size: "1.8 MB",
      date: "2024-03-14",
    },
    {
      id: 3,
      type: "video",
      name: "demo-reel.mp4",
      url: "https://via.placeholder.com/300",
      size: "45 MB",
      date: "2024-03-10",
    },
    {
      id: 4,
      type: "image",
      name: "nft-artwork.jpg",
      url: "https://via.placeholder.com/300",
      size: "3.2 MB",
      date: "2024-03-08",
    },
    {
      id: 5,
      type: "document",
      name: "resume.pdf",
      url: "#",
      size: "1.1 MB",
      date: "2024-03-05",
    },
  ]);

  const [dragActive, setDragActive] = useState(false);
  const [selectedType, setSelectedType] = useState("all");

  const filteredMedia =
    selectedType === "all"
      ? mediaItems
      : mediaItems.filter((item) => item.type === selectedType);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload here
    console.log("Files dropped:", e.dataTransfer.files);
  };

  const getIcon = (type) => {
    switch (type) {
      case "image":
        return <ImageIcon size={24} className="text-purple-500" />;
      case "video":
        return <Video size={24} className="text-blue-500" />;
      default:
        return <File size={24} className="text-gray-500" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Media Library
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your images, videos, and documents
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`mb-8 p-8 border-2 border-dashed rounded-xl text-center transition-colors ${
          dragActive
            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
            : "border-gray-300 dark:border-gray-700"
        }`}
      >
        <Upload className="mx-auto mb-4 text-gray-400" size={48} />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Drag and drop files here
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          or click to browse from your computer
        </p>
        <input type="file" multiple className="hidden" id="file-upload" />
        <label
          htmlFor="file-upload"
          className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition-colors"
        >
          Select Files
        </label>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
          Supported formats: JPG, PNG, GIF, MP4, PDF (Max 100MB)
        </p>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mb-6">
        {["all", "image", "video", "document"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              selectedType === type
                ? "bg-purple-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="group relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="aspect-square relative">
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                  {getIcon(item.type)}
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button className="p-2 bg-white rounded-lg text-gray-800 hover:bg-purple-600 hover:text-white transition-colors">
                  <Download size={18} />
                </button>
                <button className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-600 hover:text-white transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="p-2">
              <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                {item.name}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{item.size}</span>
                <span>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Media;
