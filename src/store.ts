import { configureStore, DeepPartial } from '@reduxjs/toolkit';

import todoReducer, { TODO_KEY_FEATURE, TodoState } from './slices/todoSlice';
import filterReducer, {
  FILTER_KEY_FEATURE,
  FilterState,
} from './slices/filterSlice';

export function makeStore(
  preloadedState?: DeepPartial<{
    [TODO_KEY_FEATURE]: TodoState;
    [FILTER_KEY_FEATURE]: FilterState;
  }>,
) {
  return configureStore({
    reducer: {
      [TODO_KEY_FEATURE]: todoReducer,
      [FILTER_KEY_FEATURE]: filterReducer,
    },
    preloadedState,
  });
}

export default makeStore();
