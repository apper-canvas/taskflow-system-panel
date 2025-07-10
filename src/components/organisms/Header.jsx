import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../../App";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
const Header = ({ 
  onAddTask, 
  onSearch, 
  taskCount,
  completedCount,
  className 
}) => {
  const { user } = useSelector((state) => state.user);
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await logout();
    }
  };

  return (
    <motion.header
      className={cn(
        "bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50",
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold gradient-text">TaskFlow</h1>
            </div>
            
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <span>{taskCount} tasks</span>
              <span>•</span>
              <span>{completedCount} completed</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <SearchBar onSearch={onSearch} />
            </div>
            
            <Button
              onClick={onAddTask}
              className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white"
            >
              <ApperIcon name="Plus" className="h-4 w-4" />
              <span>New Task</span>
            </Button>

            {user && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 hidden sm:block">
                  Welcome, {user.firstName || user.name || 'User'}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ApperIcon name="LogOut" className="h-4 w-4" />
                  <span className="hidden sm:inline-block ml-1">Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;