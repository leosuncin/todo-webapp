import { Grid, List, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';

import { getAllTodos } from '../api/client';
import AddTodo from '../components/AddTodo';
import FilterTodo, { FilterBy } from '../components/FilterTodo';
import TodoItem from '../components/TodoItem';
import { Todo, todoReducer } from '../hooks/todoReducer';

const TodoList: React.FC = () => {
  const [state, dispatch] = React.useReducer(todoReducer, { todos: [] });
  const [filter, setFilter] = useState<FilterBy>('all');
  const active = state.todos.filter((todo) => !todo.done);
  const completed = state.todos.filter((todo) => todo.done);
  const fetchAllTodos = useCallback(async (signal?: AbortSignal) => {
    try {
      const todos = await getAllTodos({ signal });
      dispatch({ type: 'SET_TODOS', payload: todos });
    } catch {}
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();

    fetchAllTodos(ctrl.signal);

    return () => ctrl.abort();
  }, [fetchAllTodos]);

  function handleCreateTodo(text: string) {
    if (text) {
      dispatch({
        type: 'ADD_TODO',
        payload: text,
      });
    }
  }
  function handleEditTodo(id: Todo['id'], { text }: Pick<Todo, 'text'>) {
    dispatch({
      type: 'UPDATE_TODO',
      payload: {
        id,
        text,
      },
    });
  }
  function handleToggleDone(id: Todo['id'], done: boolean) {
    dispatch({
      type: 'TOGGLE_TODO',
      payload: {
        id,
        done,
      },
    });
  }
  function handleDeleteTodo(id: Todo['id']) {
    dispatch({
      type: 'REMOVE_TODO',
      payload: id,
    });
  }
  function getTodos(): Todo[] {
    switch (filter) {
      case 'active':
        return active;

      case 'completed':
        return completed;

      default:
        return state.todos;
    }
  }

  return (
    <Grid item sm={10} md={8} style={{ margin: '0 auto' }}>
      <AddTodo onSubmit={({ text }) => handleCreateTodo(text)} />
      <FilterTodo
        all={state.todos.length}
        active={active.length}
        completed={completed.length}
        filter={filter}
        switchFilter={(filter) => setFilter(filter)}
        onClearCompleted={() =>
          completed
            .filter((t) => t.done)
            .map((todo) => handleDeleteTodo(todo.id))
        }
      />
      <Grid item>
        <List aria-label="List of todo">
          {state.todos.length < 1 ? (
            <Typography
              variant="h5"
              color="textSecondary"
              component="li"
              align="center"
            >
              The list of todo will appear here.
            </Typography>
          ) : (
            getTodos().map((todo, idx) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onChangeTodo={(id, body) => handleEditTodo(id, body)}
                onToggleDone={(id, done) => handleToggleDone(id, done)}
                onRemoveTodo={(id) => handleDeleteTodo(id)}
              />
            ))
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default TodoList;
