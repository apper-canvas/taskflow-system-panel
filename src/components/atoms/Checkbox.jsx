import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Checkbox = forwardRef(({ 
  className, 
  label,
  error,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center space-x-2">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            "custom-checkbox",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          disabled={disabled}
          {...props}
        />
        {label && (
          <label className="text-sm font-medium text-gray-700 cursor-pointer">
            {label}
          </label>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;