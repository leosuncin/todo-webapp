import { configureStore } from '@reduxjs/toolkit';

import todoReducer, { TODO_KEY_FEATURE } from './slices/todoSlice';

export default configureStore({
  reducer: {
    [TODO_KEY_FEATURE]: todoReducer,
  },
});
