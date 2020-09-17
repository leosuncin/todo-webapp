import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: Date;
  doneAt?: Date;
};

export type TodoState = {
  todos: Todo[];
};

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state: TodoState, action: PayloadAction<Todo['text']>) {
      state.todos.unshift({
        id: nanoid(),
        text: action.payload,
        done: false,
        createdAt: new Date(),
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
      todo.doneAt = action.payload.done ? new Date() : undefined;
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
  },
});

export const {
  addTodo,
  toggleTodo,
  updateTodo,
  removeTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
