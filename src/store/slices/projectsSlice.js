import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API call - replace with real API
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        id: 1,
        name: 'AI Customer Support Platform',
        description: 'Building an AI-powered customer support system',
        status: 'active',
        progress: 75,
        startDate: '2024-01-15',
        endDate: '2024-03-30',
        teamMembers: ['john-doe', 'jane-smith', 'mike-johnson'],
        priority: 'high',
        budget: 150000,
        spent: 112500,
      },
      {
        id: 2,
        name: 'Mobile App Redesign',
        description: 'Complete UI/UX overhaul of mobile application',
        status: 'active',
        progress: 45,
        startDate: '2024-02-01',
        endDate: '2024-04-15',
        teamMembers: ['sarah-wilson', 'david-brown'],
        priority: 'medium',
        budget: 80000,
        spent: 36000,
      },
      {
        id: 3,
        name: 'Data Analytics Dashboard',
        description: 'Real-time analytics dashboard for business intelligence',
        status: 'planning',
        progress: 15,
        startDate: '2024-03-01',
        endDate: '2024-05-30',
        teamMembers: ['alex-chen', 'lisa-garcia'],
        priority: 'high',
        budget: 120000,
        spent: 18000,
      },
    ];
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    loading: false,
    error: null,
    selectedProject: null,
  },
  reducers: {
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    updateProject: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    addProject: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedProject, updateProject, addProject } = projectsSlice.actions;
export default projectsSlice.reducer;