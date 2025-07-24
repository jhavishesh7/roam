import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-sm border border-gray-100';
  
  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -2, shadow: '0 10px 25px rgba(0,0,0,0.1)' }}
        transition={{ duration: 0.2 }}
        className={`${baseClasses} ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
};