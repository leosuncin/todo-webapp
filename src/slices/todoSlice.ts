import {
  CombinedState,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';

import { FilterBy, filterSelector } from './filterSlice';

export type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
  doneAt?: number;
};

export type TodoState = EntityState<Todo>;

export const TODO_KEY_FEATURE = 'todo';

const todoAdapter = createEntityAdapter<Todo>({
  selectId: (todo) => todo.id,
  sortComparer: (a, b) =>
    new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1,
});

const initialState: TodoState = todoAdapter.getInitialState();

const todoSlice = createSlice({
  name: TODO_KEY_FEATURE,
  initialState,
  reducers: {
    addTodo(state: TodoState, action: PayloadAction<Todo['text']>) {
      todoAdapter.addOne(state, {
        id: nanoid(),
        text: action.payload,
        done: false,
        createdAt: Date.now(),
      });
    },
    toggleTodo(
      state: TodoState,
      action: PayloadAction<Pick<Todo, 'id' | 'done'>>,
    ) {
      const todo = todoAdapter
        .getSelectors()
        .selectById(state, action.payload.id);

      if (!todo || todo.done === action.payload.done) return;

      todo.done = action.payload.done;
      todo.doneAt = action.payload.done ? Date.now() : undefined;
    },
    updateTodo(
      state: TodoState,
      action: PayloadAction<Pick<Todo, 'id' | 'text'>>,
    ) {
      const todo = todoAdapter
        .getSelectors()
        .selectById(state, action.payload.id);

      if (!todo || todo.text === action.payload.text) return;

      todo.text = action.payload.text;
    },
    removeTodo(state: TodoState, action: PayloadAction<Todo['id']>) {
      todoAdapter.removeOne(state, action.payload);
    },
    clearCompleted(state: TodoState) {
      todoAdapter.setAll(
        state,
        todoAdapter
          .getSelectors()
          .selectAll(state)
          .filter((t) => !t.done),
      );
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  updateTodo,
  removeTodo,
  clearCompleted,
} = todoSlice.actions;

const todoSelectors = todoAdapter.getSelectors<
  CombinedState<Record<typeof TODO_KEY_FEATURE, TodoState>>
>((state) => state[TODO_KEY_FEATURE]);

export const todosSelector = todoSelectors.selectAll;

export const allCountSelector = todoSelectors.selectTotal;

export const completedCountSelector = createSelector(
  todosSelector,
  (todos: Todo[]) =>
    todos.reduce((count, todo) => count + (todo.done ? 1 : 0), 0),
);

export const activeCountSelector = createSelector(
  allCountSelector,
  completedCountSelector,
  (all: number, completed: number) => all - completed,
);

export const displayTodosSelector = createSelector(
  filterSelector,
  todosSelector,
  (filter: FilterBy, todos: Todo[]) => {
    if (filter === 'active') return todos.filter((todo) => !todo.done);
    if (filter === 'completed') return todos.filter((todo) => todo.done);
    return todos;
  },
);

export default todoSlice.reducer;
