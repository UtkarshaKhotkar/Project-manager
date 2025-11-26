import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAnalytics = createAsyncThunk(
  'analytics/fetchAnalytics',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return {
      overview: {
        totalProjects: 12,
        activeProjects: 8,
        completedTasks: 156,
        teamMembers: 15,
        totalBudget: 850000,
        spentBudget: 620000,
      },
      projectProgress: [
        { month: 'Jan', completed: 12, planned: 15 },
        { month: 'Feb', completed: 18, planned: 20 },
        { month: 'Mar', completed: 22, planned: 25 },
        { month: 'Apr', completed: 28, planned: 30 },
        { month: 'May', completed: 35, planned: 35 },
        { month: 'Jun', completed: 42, planned: 40 },
      ],
      taskDistribution: [
        { name: 'Completed', value: 156, color: '#10b981' },
        { name: 'In Progress', value: 43, color: '#f59e0b' },
        { name: 'Todo', value: 28, color: '#6b7280' },
        { name: 'Blocked', value: 8, color: '#ef4444' },
      ],
      teamProductivity: [
        { name: 'John Doe', tasksCompleted: 28, efficiency: 92 },
        { name: 'Jane Smith', tasksCompleted: 34, efficiency: 88 },
        { name: 'Mike Johnson', tasksCompleted: 22, efficiency: 85 },
        { name: 'Sarah Wilson', tasksCompleted: 19, efficiency: 90 },
        { name: 'David Brown', tasksCompleted: 31, efficiency: 87 },
      ],
      budgetAnalysis: [
        { project: 'AI Support Platform', budget: 150000, spent: 112500, remaining: 37500 },
        { project: 'Mobile Redesign', budget: 80000, spent: 36000, remaining: 44000 },
        { project: 'Analytics Dashboard', budget: 120000, spent: 18000, remaining: 102000 },
      ],
      riskAssessment: {
        highRisk: 2,
        mediumRisk: 4,
        lowRisk: 6,
        predictions: [
          {
            project: 'AI Support Platform',
            riskLevel: 'medium',
            delayProbability: 35,
            factors: ['Resource allocation', 'Technical complexity'],
          },
          {
            project: 'Mobile Redesign',
            riskLevel: 'low',
            delayProbability: 15,
            factors: ['Clear requirements', 'Experienced team'],
          },
        ],
      },
    };
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    data: null,
    loading: false,
    error: null,
    dateRange: '30d',
  },
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setDateRange } = analyticsSlice.actions;
export default analyticsSlice.reducer;