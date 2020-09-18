import { Grid, List, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddTodo from '../components/AddTodo';
import FilterTodo from '../components/FilterTodo';
import TodoItem from '../components/TodoItem';
import { filterSelector, switchFilter } from '../slices/filterSlice';
import {
  activeCountSelector,
  addTodo,
  allCountSelector,
  clearCompleted,
  completedCountSelector,
  displayTodosSelector,
  removeTodo,
  toggleTodo,
  updateTodo,
} from '../slices/todoSlice';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(displayTodosSelector);
  const all = useSelector(allCountSelector);
  const active = useSelector(activeCountSelector);
  const completed = useSelector(completedCountSelector);
  const filter = useSelector(filterSelector);

  return (
    <Grid item sm={10} md={8} style={{ margin: '0 auto' }}>
      <AddTodo onSubmit={({ text }) => dispatch(addTodo(text))} />
      <FilterTodo
        all={all}
        active={active}
        completed={completed}
        filter={filter}
        switchFilter={(filter) => dispatch(switchFilter(filter))}
        onClearCompleted={() => dispatch(clearCompleted())}
      />
      <Grid item>
        <List aria-label="List of todo">
          {all < 1 ? (
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
