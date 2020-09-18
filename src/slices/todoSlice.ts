import {
  CombinedState,
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
  Selector,
} from '@reduxjs/toolkit';
import { filterSelector } from './filterSlice';

export type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
  doneAt?: number;
};

export type TodoState = {
  todos: Todo[];
};

export const TODO_KEY_FEATURE = 'todo';

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: TODO_KEY_FEATURE,
  initialState,
  reducers: {
    addTodo(state: TodoState, action: PayloadAction<Todo['text']>) {
      state.todos.unshift({
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
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id,
      );
      const todo = state.todos[index];

      if (todo.done === action.payload.done) return;

      todo.done = action.payload.done;
      todo.doneAt = action.payload.done ? Date.now() : undefined;
    },
    updateTodo(
      state: TodoState,
      action: PayloadAction<Pick<Todo, 'id' | 'text'>>,
    ) {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo,
      );
    },
    removeTodo(state: TodoState, action: PayloadAction<Todo['id']>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    clearCompleted(state: TodoState) {
      state.todos = state.todos.filter((t) => !t.done);
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

export const todosSelector: Selector<
  CombinedState<Record<typeof TODO_KEY_FEATURE, TodoState>>,
  Todo[]
> = (state) => state[TODO_KEY_FEATURE].todos;

export const allCountSelector = createSelector(
  todosSelector,
  (todos) => todos.length,
);

export const completedCountSelector = createSelector(todosSelector, (todos) =>
  todos.reduce((count, todo) => count + (todo.done ? 1 : 0), 0),
);

export const activeCountSelector = createSelector(
  allCountSelector,
  completedCountSelector,
  (all, completed) => all - completed,
);

export const displayTodosSelector = createSelector(
  filterSelector,
  todosSelector,
  (filter, todos) => {
    if (filter === 'active') return todos.filter((todo) => !todo.done);
    if (filter === 'completed') return todos.filter((todo) => todo.done);
    return todos;
  },
);

export default todoSlice.reducer;
