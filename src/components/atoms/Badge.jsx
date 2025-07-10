import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  size = "md",
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center font-semibold rounded-full border transition-colors";
  
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    high: "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300",
    medium: "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border-amber-300",
    low: "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300",
    success: "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300",
    warning: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300",
    error: "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300",
    purple: "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300"
  };
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm"
  };

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;