import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';

import { getAllTodos } from '../api/client';
import type { FilterBy } from '../components/FilterTodo';
import todoReducer, {
  addTodo,
  removeTodo,
  setTodoList,
  Todo,
  toggleTodo,
  updateTodo,
} from './todoReducer';

type TodoContextValue = {
  todos: Todo[];
  active: Todo[];
  completed: Todo[];
  filtered: Todo[];
  filter: FilterBy;
  addTodo(text: string): void;
  toggleTodo(todoId: Todo['id'], done: boolean): void;
  updateTodo(todoId: Todo['id'], text: string): void;
  removeTodo(todoId: Todo['id']): void;
  setFilter(filter: FilterBy): void;
};

export function useTodo(): TodoContextValue {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });
  const [filter, setFilter] = useState<FilterBy>('all');
  const active = useMemo(
    () => state.todos.filter((todo) => !todo.done),
    [state.todos],
  );
  const completed = useMemo(
    () => state.todos.filter((todo) => todo.done),
    [state.todos],
  );
  const filtered = useMemo(() => {
    switch (filter) {
      case 'active':
        return active;

      case 'completed':
        return completed;

      default:
        return state.todos;
    }
  }, [active, completed, filter, state.todos]);

  useEffect(() => {
    const ctrl = new AbortController();

    async function fetchTodos() {
      try {
        const todos = await getAllTodos({ signal: ctrl.signal });
        dispatch(setTodoList(todos));
      } catch {}
    }

    fetchTodos();

    return () => ctrl.abort();
  }, [dispatch]);

  return {
    todos: state.todos,
    active,
    completed,
    filtered,
    filter,
    addTodo: useCallback(
      (text) => {
        if (text) dispatch(addTodo(text));
      },
      [dispatch],
    ),
    toggleTodo: useCallback(
      (todoId, done) => dispatch(toggleTodo(todoId, done)),
      [dispatch],
    ),
    updateTodo: useCallback(
      (todoId, text) => dispatch(updateTodo(todoId, text)),
      [dispatch],
    ),
    removeTodo: useCallback(
      (todoId) => dispatch(removeTodo(todoId)),
      [dispatch],
    ),
    setFilter,
  };
}
