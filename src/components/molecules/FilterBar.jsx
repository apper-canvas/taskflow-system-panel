import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const FilterBar = ({ 
  activeFilter, 
  onFilterChange, 
  sortBy, 
  onSortChange, 
  className 
}) => {
  const filterOptions = [
    { value: "all", label: "All Tasks", icon: "List" },
    { value: "active", label: "Active", icon: "Circle" },
    { value: "completed", label: "Completed", icon: "CheckCircle" }
  ];

  const sortOptions = [
    { value: "dueDate", label: "Due Date" },
    { value: "priority", label: "Priority" },
    { value: "createdAt", label: "Created Date" }
  ];

  return (
    <motion.div
      className={cn("flex items-center justify-between gap-4", className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
    >
      <div className="flex items-center space-x-2">
        {filterOptions.map((option) => (
          <Button
            key={option.value}
            variant={activeFilter === option.value ? "primary" : "ghost"}
            size="sm"
            onClick={() => onFilterChange(option.value)}
            className="flex items-center space-x-2"
          >
            <ApperIcon name={option.icon} className="h-4 w-4" />
            <span>{option.label}</span>
          </Button>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <ApperIcon name="ArrowUpDown" className="h-4 w-4 text-gray-500" />
        <Select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          options={sortOptions}
          className="min-w-[140px]"
        />
      </div>
    </motion.div>
  );
};

export default FilterBar;