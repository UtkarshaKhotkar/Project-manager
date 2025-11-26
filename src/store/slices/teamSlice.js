import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTeamMembers = createAsyncThunk(
  'team/fetchTeamMembers',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return [
      {
        id: 'john-doe',
        name: 'John Doe',
        role: 'Senior Frontend Developer',
        email: 'john.doe@company.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        skills: ['React', 'TypeScript', 'Node.js'],
        currentTasks: 3,
        completedTasks: 28,
        workload: 85,
        status: 'active',
      },
      {
        id: 'jane-smith',
        name: 'Jane Smith',
        role: 'ML Engineer',
        email: 'jane.smith@company.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        skills: ['Python', 'TensorFlow', 'AWS'],
        currentTasks: 2,
        completedTasks: 34,
        workload: 70,
        status: 'active',
      },
      {
        id: 'mike-johnson',
        name: 'Mike Johnson',
        role: 'DevOps Engineer',
        email: 'mike.johnson@company.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        skills: ['Docker', 'Kubernetes', 'AWS'],
        currentTasks: 4,
        completedTasks: 22,
        workload: 90,
        status: 'active',
      },
      {
        id: 'sarah-wilson',
        name: 'Sarah Wilson',
        role: 'UX Designer',
        email: 'sarah.wilson@company.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        skills: ['Figma', 'Adobe XD', 'User Research'],
        currentTasks: 2,
        completedTasks: 19,
        workload: 60,
        status: 'active',
      },
      {
        id: 'david-brown',
        name: 'David Brown',
        role: 'Backend Developer',
        email: 'david.brown@company.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        skills: ['Java', 'Spring Boot', 'PostgreSQL'],
        currentTasks: 3,
        completedTasks: 31,
        workload: 75,
        status: 'active',
      },
    ];
  }
);

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    members: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateMember: (state, action) => {
      const index = state.members.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.members[index] = { ...state.members[index], ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateMember } = teamSlice.actions;
export default teamSlice.reducer;