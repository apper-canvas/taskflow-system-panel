import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/molecules/TaskCard";
import BulkActions from "@/components/molecules/BulkActions";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { cn } from "@/utils/cn";

const TaskList = ({ 
  tasks, 
  loading, 
  error, 
  onToggleComplete,
  onEdit,
  onDelete,
  onBulkComplete,
  onBulkDelete,
  onRetry,
  className 
}) => {
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleSelectTask = (taskId, isSelected) => {
    setSelectedTasks(prev => 
      isSelected 
        ? [...prev, taskId]
        : prev.filter(id => id !== taskId)
    );
  };

  const handleSelectAll = (isSelected) => {
    setSelectedTasks(isSelected ? tasks.map(task => task.id) : []);
  };

  const handleClearSelection = () => {
    setSelectedTasks([]);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (tasks.length === 0) {
    return <Empty />;
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedTasks.length === tasks.length}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="custom-checkbox"
            />
            <span className="text-sm font-medium text-gray-700">
              Select all ({tasks.length})
            </span>
          </label>
          
          {selectedTasks.length > 0 && (
            <span className="text-sm text-purple-600 font-medium">
              {selectedTasks.length} selected
            </span>
          )}
        </div>
      </div>

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isSelected={selectedTasks.includes(task.id)}
              onSelect={handleSelectTask}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <BulkActions
        selectedTasks={selectedTasks}
        onBulkComplete={onBulkComplete}
        onBulkDelete={onBulkDelete}
        onClearSelection={handleClearSelection}
      />
    </div>
  );
};

export default TaskList;