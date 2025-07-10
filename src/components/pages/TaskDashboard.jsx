import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import Header from "@/components/organisms/Header";
import TaskList from "@/components/organisms/TaskList";
import FloatingAddButton from "@/components/organisms/FloatingAddButton";
import FilterBar from "@/components/molecules/FilterBar";
import Modal from "@/components/molecules/Modal";
import TaskForm from "@/components/molecules/TaskForm";
import Empty from "@/components/ui/Empty";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    switch (activeFilter) {
      case "active":
        filtered = filtered.filter(task => !task.completed);
        break;
      case "completed":
        filtered = filtered.filter(task => task.completed);
        break;
      default:
        break;
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "createdAt":
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    return filtered;
  }, [tasks, searchQuery, activeFilter, sortBy]);

  // Task statistics
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        const updatedTask = await taskService.update(editingTask.id, taskData);
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === editingTask.id ? updatedTask : task
          )
        );
        toast.success("Task updated successfully");
      } else {
        const newTask = await taskService.create(taskData);
        setTasks(prevTasks => [...prevTasks, newTask]);
        toast.success("Task created successfully");
      }
      setShowTaskModal(false);
      setEditingTask(null);
    } catch (err) {
      throw err;
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? updatedTask : task
        )
      );
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (err) {
      throw err;
    }
  };

  const handleBulkComplete = async (taskIds) => {
    try {
      await taskService.bulkComplete(taskIds);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          taskIds.includes(task.id)
            ? { ...task, completed: true, updatedAt: new Date().toISOString() }
            : task
        )
      );
    } catch (err) {
      throw err;
    }
  };

  const handleBulkDelete = async (taskIds) => {
    try {
      await taskService.bulkDelete(taskIds);
      setTasks(prevTasks => prevTasks.filter(task => !taskIds.includes(task.id)));
    } catch (err) {
      throw err;
    }
  };

  const handleCloseModal = () => {
    setShowTaskModal(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-amber-50/20">
      <Header
        onAddTask={handleAddTask}
        onSearch={setSearchQuery}
        taskCount={totalCount}
        completedCount={completedCount}
      />

      <motion.main
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="space-y-6">
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {!loading && !error && filteredTasks.length === 0 && tasks.length === 0 ? (
            <Empty onAddTask={handleAddTask} />
          ) : (
            <TaskList
              tasks={filteredTasks}
              loading={loading}
              error={error}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onBulkComplete={handleBulkComplete}
              onBulkDelete={handleBulkDelete}
              onRetry={loadTasks}
            />
          )}
        </div>
      </motion.main>

      <FloatingAddButton onClick={handleAddTask} />

      <Modal
        isOpen={showTaskModal}
        onClose={handleCloseModal}
        title={editingTask ? "Edit Task" : "Add New Task"}
        size="md"
      >
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default TaskDashboard;