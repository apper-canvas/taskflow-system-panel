import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Header = ({ 
  onAddTask, 
  onSearch, 
  taskCount,
  completedCount,
  className 
}) => {
  return (
    <motion.header
      className={cn(
        "bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">TaskFlow</h1>
                <p className="text-sm text-gray-600">
                  {completedCount} of {taskCount} tasks completed
                </p>
              </div>
            </motion.div>
          </div>

          <div className="flex items-center space-x-4">
            <SearchBar
              onSearch={onSearch}
              placeholder="Search tasks..."
              className="w-64 hidden sm:block"
            />
            
            <Button
              variant="primary"
              onClick={onAddTask}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Plus" className="h-4 w-4" />
              <span className="hidden sm:inline">Add Task</span>
            </Button>
          </div>
        </div>

        <div className="pb-4 sm:hidden">
          <SearchBar
            onSearch={onSearch}
            placeholder="Search tasks..."
            className="w-full"
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;