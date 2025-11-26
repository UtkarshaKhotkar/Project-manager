import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: 1,
        title: 'Implement AI Chat Interface',
        description: 'Build the main chat interface for AI customer support',
        status: 'in-progress',
        priority: 'high',
        assignee: 'john-doe',
        projectId: 1,
        dueDate: '2024-02-15',
        estimatedHours: 40,
        actualHours: 28,
        tags: ['frontend', 'ai', 'react'],
      },
      {
        id: 2,
        title: 'Setup Machine Learning Pipeline',
        description: 'Configure ML pipeline for natural language processing',
        status: 'completed',
        priority: 'high',
        assignee: 'jane-smith',
        projectId: 1,
        dueDate: '2024-02-10',
        estimatedHours: 32,
        actualHours: 35,
        tags: ['backend', 'ml', 'python'],
      },
      {
        id: 3,
        title: 'Design Mobile Navigation',
        description: 'Create new navigation system for mobile app',
        status: 'todo',
        priority: 'medium',
        assignee: 'sarah-wilson',
        projectId: 2,
        dueDate: '2024-02-20',
        estimatedHours: 16,
        actualHours: 0,
        tags: ['design', 'mobile', 'ux'],
      },
      {
        id: 4,
        title: 'Database Schema Design',
        description: 'Design database schema for analytics dashboard',
        status: 'in-progress',
        priority: 'high',
        assignee: 'alex-chen',
        projectId: 3,
        dueDate: '2024-02-25',
        estimatedHours: 24,
        actualHours: 12,
        tags: ['backend', 'database', 'analytics'],
      },
    ];
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filters: {
      status: 'all',
      priority: 'all',
      assignee: 'all',
    },
  },
  reducers: {
    updateTask: (state, action) => {
      const index = state.items.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    addTask: (state, action) => {
      state.items.push(action.payload);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateTask, addTask, setFilters } = tasksSlice.actions;
export default tasksSlice.reducer;