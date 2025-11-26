import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    darkMode: false,
    notifications: [],
    loading: {
      global: false,
      projects: false,
      tasks: false,
    },
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        n => n.id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = { ...state.loading, ...action.payload };
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleDarkMode,
  addNotification,
  removeNotification,
  setLoading,
} = uiSlice.actions;

export default uiSlice.reducer;