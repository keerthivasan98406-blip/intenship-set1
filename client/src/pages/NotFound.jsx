import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiAlertTriangle } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="pt-32 pb-20 max-w-md mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-10 shadow-2xl border border-white/10"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-500 text-white mx-auto flex items-center justify-center mb-6">
          <FiAlertTriangle size={32} />
        </div>

        <h1 className="text-6xl font-extrabold font-heading gradient-text mb-2">404</h1>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-gray-400 text-sm mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/30 hover:scale-105 transition-transform"
        >
          <FiHome size={18} />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  );
}
