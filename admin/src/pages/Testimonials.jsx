// pages/Testimonials.jsx
import React, { useState } from "react";
import {
  LuPlus as Plus,
  LuPen as Edit2,
  LuTrash2 as Trash2,
  LuStar as Star,
  LuQuote as Quote,
} from "react-icons/lu";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content:
        "Alex is an exceptional developer who delivered our DeFi dashboard ahead of schedule. His expertise in Web3 technologies is unmatched, and he was a pleasure to work with.",
      rating: 5,
      avatar: "https://via.placeholder.com/100",
      date: "2024-02-15",
      featured: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO, BlockVentures",
      content:
        "Working with Alex on our NFT marketplace was a game-changer. He not only understood the technical requirements but also provided valuable insights on user experience and security.",
      rating: 5,
      avatar: "https://via.placeholder.com/100",
      date: "2024-01-20",
      featured: true,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Creative Director, DesignHub",
      content:
        "Alex brings a unique blend of technical expertise and creative vision. He transformed our ideas into a beautiful, functional web application that our clients love.",
      rating: 5,
      avatar: "https://via.placeholder.com/100",
      date: "2024-01-05",
      featured: false,
    },
    {
      id: 4,
      name: "David Kim",
      role: "Founder, CryptoFund",
      content:
        "The smart contracts Alex developed for us have been battle-tested and secure. His attention to detail and commitment to best practices sets him apart.",
      rating: 4,
      avatar: "https://via.placeholder.com/100",
      date: "2023-12-10",
      featured: false,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  const toggleFeatured = (id) => {
    setTestimonials(
      testimonials.map((t) =>
        t.id === id ? { ...t, featured: !t.featured } : t,
      ),
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Testimonials
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage client testimonials and reviews
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative group"
          >
            {/* Featured Badge */}
            {testimonial.featured && (
              <div className="absolute top-4 right-4 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-semibold rounded-full flex items-center space-x-1">
                <Star size={12} />
                <span>Featured</span>
              </div>
            )}

            {/* Actions */}
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
              <button
                onClick={() => toggleFeatured(testimonial.id)}
                className={`p-1.5 rounded ${
                  testimonial.featured
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 hover:bg-yellow-100 hover:text-yellow-700"
                }`}
              >
                <Star size={16} />
              </button>
              <button className="p-1.5 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 rounded hover:bg-purple-100 hover:text-purple-700">
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="p-1.5 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 rounded hover:bg-red-100 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Quote Icon */}
            <Quote
              className="text-purple-200 dark:text-purple-900/30 mb-4"
              size={40}
            />

            {/* Content */}
            <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-4">
              "{testimonial.content}"
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < testimonial.rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300 dark:text-gray-600"
                  }
                />
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center space-x-3">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.role}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {testimonial.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal (Simplified) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Add New Testimonial
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Form fields would go here (name, role, content, rating, etc.)
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Save Testimonial
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
