import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg p-4 shadow-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="flex items-start space-x-3">
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-1/2" />
                </div>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="h-5 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full animate-pulse w-16" />
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-24" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;