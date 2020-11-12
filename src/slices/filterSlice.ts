import {
  CombinedState,
  createSlice,
  PayloadAction,
  Selector,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

export type FilterBy = 'all' | 'completed' | 'active';

export type FilterState = {
  filter: FilterBy;
};

interface FilterCaseReducers extends SliceCaseReducers<FilterState> {
  switchFilter(state: FilterState, action: PayloadAction<FilterBy>): void;
}

export const FILTER_KEY_FEATURE = 'filter';

const filterSlice = createSlice<FilterState, FilterCaseReducers>({
  name: FILTER_KEY_FEATURE,
  initialState: {
    filter: 'all',
  },
  reducers: {
    switchFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { switchFilter } = filterSlice.actions;

export const filterSelector: Selector<
  CombinedState<Record<typeof FILTER_KEY_FEATURE, FilterState>>,
  FilterBy
> = (state: CombinedState<Record<typeof FILTER_KEY_FEATURE, FilterState>>) =>
  state[FILTER_KEY_FEATURE].filter;

export default filterSlice.reducer;
