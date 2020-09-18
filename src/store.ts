import { configureStore } from '@reduxjs/toolkit';

import todoReducer, { TODO_KEY_FEATURE } from './slices/todoSlice';
import filterReducer, { FILTER_KEY_FEATURE } from './slices/filterSlice';

export default configureStore({
  reducer: {
    [TODO_KEY_FEATURE]: todoReducer,
    [FILTER_KEY_FEATURE]: filterReducer,
  },
});
