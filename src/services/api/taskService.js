import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "taskflow-tasks";

// Mock delay for realistic loading experience
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate unique ID
const generateId = () => uuidv4();

// Get all tasks from localStorage
const getTasks = () => {
  try {
    const tasks = localStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
};

// Save tasks to localStorage
const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks:", error);
    throw error;
  }
};

export const taskService = {
  // Get all tasks
  getAll: async () => {
    await delay(300);
    return [...getTasks()];
  },

  // Get task by ID
  getById: async (id) => {
    await delay(200);
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    return { ...task };
  },

  // Create new task
  create: async (taskData) => {
    await delay(400);
    const tasks = getTasks();
    const newTask = {
      id: generateId(),
      title: taskData.title,
      description: taskData.description || "",
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    return { ...newTask };
  },

  // Update task
  update: async (id, updates) => {
    await delay(300);
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    saveTasks(updatedTasks);
    return { ...updatedTask };
  },

  // Delete task
  delete: async (id) => {
    await delay(300);
    const tasks = getTasks();
    const updatedTasks = tasks.filter(t => t.id !== id);
    
    if (updatedTasks.length === tasks.length) {
      throw new Error(`Task with ID ${id} not found`);
    }
    
    saveTasks(updatedTasks);
    return { id };
  },

  // Toggle task completion
  toggleComplete: async (id) => {
    await delay(200);
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      completed: !tasks[taskIndex].completed,
      updatedAt: new Date().toISOString()
    };
    
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    saveTasks(updatedTasks);
    return { ...updatedTask };
  },

  // Bulk delete tasks
  bulkDelete: async (ids) => {
    await delay(400);
    const tasks = getTasks();
    const updatedTasks = tasks.filter(t => !ids.includes(t.id));
    saveTasks(updatedTasks);
    return { deletedIds: ids };
  },

  // Bulk complete tasks
  bulkComplete: async (ids) => {
    await delay(400);
    const tasks = getTasks();
    const updatedTasks = tasks.map(task => 
      ids.includes(task.id) 
        ? { ...task, completed: true, updatedAt: new Date().toISOString() }
        : task
    );
    saveTasks(updatedTasks);
    return { completedIds: ids };
  }
};