import { Grid, List, Typography } from '@mui/material';
import React from 'react';

import AddTodo from '../components/AddTodo';
import FilterTodo from '../components/FilterTodo';
import TodoItem from '../components/TodoItem';
import { useTodo } from '../hooks/useTodo';

const TodoList: React.FC = () => {
  const {
    todos,
    active,
    completed,
    filtered,
    filter,
    setFilter,
    addTodo,
    updateTodo,
    toggleTodo,
    removeTodo,
  } = useTodo();

  return (
    <Grid item sm={10} md={8} style={{ margin: '0 auto' }}>
      <AddTodo onSubmit={({ text }) => addTodo(text)} />
      <FilterTodo
        all={todos.length}
        active={active.length}
        completed={completed.length}
        filter={filter}
        switchFilter={(filter) => setFilter(filter)}
        onClearCompleted={() =>
          completed.filter((t) => t.done).map((todo) => removeTodo(todo.id))
        }
      />
      <Grid item>
        <List aria-label="List of todo">
          {todos.length < 1 ? (
            <Typography
              variant="h5"
              color="textSecondary"
              component="li"
              align="center"
            >
              The list of todo will appear here.
            </Typography>
          ) : (
            filtered.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onChangeTodo={updateTodo}
                onToggleDone={toggleTodo}
                onRemoveTodo={removeTodo}
              />
            ))
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default TodoList;
