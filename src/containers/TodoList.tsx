import { Grid, List, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddTodo from '../components/AddTodo';
import FilterTodo, { FilterBy } from '../components/FilterTodo';
import TodoItem from '../components/TodoItem';
import {
  addTodo,
  removeTodo,
  todosSelector,
  toggleTodo,
  updateTodo,
} from '../slices/todoSlice';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(todosSelector);
  const [filter, setFilter] = useState<FilterBy>('all');
  const active = todos.filter((todo) => !todo.done);
  const completed = todos.filter((todo) => todo.done);

  return (
    <Grid item sm={10} md={8} style={{ margin: '0 auto' }}>
      <AddTodo onSubmit={({ text }) => dispatch(addTodo(text))} />
      <FilterTodo
        all={todos.length}
        active={active.length}
        completed={completed.length}
        filter={filter}
        switchFilter={(filter) => setFilter(filter)}
        onClearCompleted={() =>
          completed
            .filter((t) => t.done)
            .map((todo) => dispatch(removeTodo(todo.id)))
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
            todos.map((todo, idx) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onChangeTodo={(id, { text }) =>
                  dispatch(updateTodo({ text, id }))
                }
                onToggleDone={(id, done) => dispatch(toggleTodo({ id, done }))}
                onRemoveTodo={(id) => dispatch(removeTodo(id))}
              />
            ))
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default TodoList;
