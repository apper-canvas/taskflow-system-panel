import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FloatingAddButton = ({ onClick }) => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <Button
        variant="primary"
        size="lg"
        onClick={onClick}
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl fab-pulse flex items-center justify-center"
      >
        <ApperIcon name="Plus" className="h-6 w-6" />
      </Button>
    </motion.div>
  );
};

export default FloatingAddButton;