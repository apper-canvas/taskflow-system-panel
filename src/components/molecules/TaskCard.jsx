import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  isSelected, 
  onSelect,
  className 
}) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleToggleComplete = async () => {
    setIsCompleting(true);
    try {
      await onToggleComplete(task.id);
      toast.success(task.completed ? "Task marked as active" : "Task completed! 🎉");
    } catch (error) {
      toast.error("Failed to update task");
    } finally {
      setIsCompleting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await onDelete(task.id);
        toast.success("Task deleted successfully");
      } catch (error) {
        toast.error("Failed to delete task");
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "high";
      case "medium": return "medium";
      case "low": return "low";
      default: return "default";
    }
  };

const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.completed;

  return (
    <motion.div
      className={cn(
        "bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-200 p-4 border border-gray-100",
        task.completed && "opacity-75",
        isSelected && "ring-2 ring-purple-500 ring-offset-2",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      layout
    >
      <div className="flex items-start space-x-3">
        <div className="flex items-center space-x-3 flex-shrink-0">
          <Checkbox
            checked={isSelected}
            onChange={(e) => onSelect(task.id, e.target.checked)}
            className="mt-1"
          />
<motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              disabled={isCompleting}
              className="custom-checkbox"
            />
          </motion.div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={cn(
                "text-base font-semibold text-gray-900 mb-1",
                task.completed && "task-completed"
              )}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={cn(
                  "text-sm text-gray-600 mb-2",
                  task.completed && "text-gray-400"
                )}>
                  {task.description}
                </p>
              )}

              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Badge 
                  variant={getPriorityColor(task.priority)}
                  size="sm"
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
                
{task.due_date && (
                  <span className={cn(
                    "flex items-center space-x-1",
                    isOverdue && "text-red-600 font-medium"
                  )}>
                    <ApperIcon name="Calendar" className="h-3 w-3" />
                    <span>{format(new Date(task.due_date), "MMM d, yyyy")}</span>
                    {isOverdue && <span className="text-red-500">• Overdue</span>}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-1 ml-4 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="p-1 h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
              >
                <ApperIcon name="Edit3" className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="p-1 h-8 w-8 hover:bg-red-50 hover:text-red-600"
              >
                <ApperIcon name="Trash2" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;