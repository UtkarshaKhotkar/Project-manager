import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './slices/projectsSlice';
import tasksReducer from './slices/tasksSlice';
import teamReducer from './slices/teamSlice';
import analyticsReducer from './slices/analyticsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    team: teamReducer,
    analytics: analyticsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});