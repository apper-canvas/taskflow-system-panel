import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ onAddTask }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="CheckCircle" className="h-12 w-12 text-purple-600" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        No tasks yet!
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        You're all caught up! Add your first task to get started on your productivity journey.
      </p>
      
      {onAddTask && (
        <Button
          variant="primary"
          onClick={onAddTask}
          className="flex items-center space-x-2"
        >
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Add Your First Task</span>
        </Button>
      )}
      
      <div className="mt-8 text-sm text-gray-500">
        <p>💡 Tips for better productivity:</p>
        <ul className="mt-2 space-y-1">
          <li>• Break large tasks into smaller ones</li>
          <li>• Set realistic due dates</li>
          <li>• Use priority levels effectively</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Empty;