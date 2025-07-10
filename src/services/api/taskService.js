const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize ApperClient
const initializeApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

export const taskService = {
  // Get all tasks
  getAll: async () => {
    try {
      await delay(300);
      
      const apperClient = initializeApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "updated_at" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } }
        ],
        orderBy: [
          { fieldName: "created_at", sorttype: "DESC" }
        ],
        pagingInfo: {
          limit: 100,
          offset: 0
        }
      };
      
      const response = await apperClient.fetchRecords('task', params);
      
      if (!response.success) {
        console.error("Error fetching tasks:", response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
      } else {
        console.error("Error fetching tasks:", error.message);
      }
      throw error;
    }
  },

  // Get task by ID
  getById: async (id) => {
    try {
      await delay(200);
      
      const apperClient = initializeApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "updated_at" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } }
        ]
      };
      
      const response = await apperClient.getRecordById('task', id, params);
      
      if (!response.success) {
        console.error(`Error fetching task with ID ${id}:`, response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching task with ID ${id}:`, error.message);
      }
      throw error;
    }
  },

  // Create new task
  create: async (taskData) => {
    try {
      await delay(400);
      
      const apperClient = initializeApperClient();
      const params = {
        records: [
          {
            title: taskData.title,
            description: taskData.description || "",
            priority: taskData.priority || "medium",
            due_date: taskData.dueDate || null,
            completed: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]
      };
      
      const response = await apperClient.createRecord('task', params);
      
      if (!response.success) {
        console.error("Error creating task:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to create task');
        }
        
        return successfulRecords[0]?.data;
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
      } else {
        console.error("Error creating task:", error.message);
      }
      throw error;
    }
  },

  // Update task
  update: async (id, updates) => {
    try {
      await delay(300);
      
      const apperClient = initializeApperClient();
      const params = {
        records: [
          {
            Id: id,
            ...updates,
            updated_at: new Date().toISOString()
          }
        ]
      };
      
      const response = await apperClient.updateRecord('task', params);
      
      if (!response.success) {
        console.error("Error updating task:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error('Failed to update task');
        }
        
        return successfulUpdates[0]?.data;
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
      } else {
        console.error("Error updating task:", error.message);
      }
      throw error;
    }
  },

  // Delete task
  delete: async (id) => {
    try {
      await delay(300);
      
      const apperClient = initializeApperClient();
      const params = {
        RecordIds: [id]
      };
      
      const response = await apperClient.deleteRecord('task', params);
      
      if (!response.success) {
        console.error("Error deleting task:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error('Failed to delete task');
        }
      }
      
      return { id };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
      } else {
        console.error("Error deleting task:", error.message);
      }
      throw error;
    }
  },

  // Toggle task completion
  toggleComplete: async (id) => {
    try {
      await delay(200);
      
      // First get the current task to know its completion state
      const currentTask = await taskService.getById(id);
      
      // Update with opposite completion state
      const updatedTask = await taskService.update(id, {
        completed: !currentTask.completed
      });
      
      return updatedTask;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error toggling task completion:", error?.response?.data?.message);
      } else {
        console.error("Error toggling task completion:", error.message);
      }
      throw error;
    }
  },

  // Bulk delete tasks
  bulkDelete: async (ids) => {
    try {
      await delay(400);
      
      const apperClient = initializeApperClient();
      const params = {
        RecordIds: ids
      };
      
      const response = await apperClient.deleteRecord('task', params);
      
      if (!response.success) {
        console.error("Error bulk deleting tasks:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
        }
      }
      
      return { deletedIds: ids };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error bulk deleting tasks:", error?.response?.data?.message);
      } else {
        console.error("Error bulk deleting tasks:", error.message);
      }
      throw error;
    }
  },

  // Bulk complete tasks
  bulkComplete: async (ids) => {
    try {
      await delay(400);
      
      const apperClient = initializeApperClient();
      const records = ids.map(id => ({
        Id: id,
        completed: true,
        updated_at: new Date().toISOString()
      }));
      
      const params = {
        records: records
      };
      
      const response = await apperClient.updateRecord('task', params);
      
      if (!response.success) {
        console.error("Error bulk completing tasks:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        }
      }
      
      return { completedIds: ids };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error bulk completing tasks:", error?.response?.data?.message);
      } else {
        console.error("Error bulk completing tasks:", error.message);
      }
      throw error;
    }
  }
};