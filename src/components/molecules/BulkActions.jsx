import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const BulkActions = ({ 
  selectedTasks, 
  onBulkComplete, 
  onBulkDelete, 
  onClearSelection,
  className 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBulkComplete = async () => {
    setIsLoading(true);
    try {
      await onBulkComplete(selectedTasks);
      toast.success(`${selectedTasks.length} task(s) marked as completed`);
      onClearSelection();
    } catch (error) {
      toast.error("Failed to complete tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedTasks.length} task(s)?`)) {
      setIsLoading(true);
      try {
        await onBulkDelete(selectedTasks);
        toast.success(`${selectedTasks.length} task(s) deleted successfully`);
        onClearSelection();
      } catch (error) {
        toast.error("Failed to delete tasks");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (selectedTasks.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          "fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50",
          className
        )}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">
            {selectedTasks.length} task(s) selected
          </span>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="success"
              size="sm"
              onClick={handleBulkComplete}
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="CheckCircle" className="h-4 w-4" />
              <span>Complete</span>
            </Button>
            
            <Button
              variant="danger"
              size="sm"
              onClick={handleBulkDelete}
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Trash2" className="h-4 w-4" />
              <span>Delete</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="X" className="h-4 w-4" />
              <span>Clear</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BulkActions;