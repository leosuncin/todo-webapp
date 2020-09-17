import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import './App.scss';
import Layout from './components/Layout';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import FilterTodo, { FilterBy } from './components/FilterTodo';
import { todoReducer, Todo } from './hooks/todoReducer';

const App: React.FC = () => {
  const [state, dispatch] = React.useReducer(todoReducer, { todos: [] });
  const [filter, setFilter] = useState<FilterBy>('all');
  const active = state.todos.filter((todo) => !todo.done);
  const completed = state.todos.filter((todo) => todo.done);

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

  return (
    <Layout>
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
        <TodoList
          todos={
            filter === 'active'
              ? active
              : filter === 'completed'
              ? completed
              : state.todos
          }
          onChangeTodo={(id, body) => handleEditTodo(id, body)}
          onToggleDone={(id, done) => handleToggleDone(id, done)}
          onRemoveTodo={(id) => handleDeleteTodo(id)}
        />
      </Grid>
    </Layout>
  );
};

export default App;
