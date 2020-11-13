import { Grid, List, Typography } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddTodo from '../components/AddTodo';
import FilterTodo from '../components/FilterTodo';
import TodoItem from '../components/TodoItem';
import { FilterBy, filterSelector, switchFilter } from '../slices/filterSlice';
import {
  activeCountSelector,
  addTodo,
  allCountSelector,
  clearCompleted,
  completedCountSelector,
  displayTodosSelector,
  loadTodos,
  removeTodo,
  Todo,
  toggleTodo,
  updateTodo,
} from '../slices/todoSlice';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos: Todo[] = useSelector(displayTodosSelector);
  const all: number = useSelector(allCountSelector);
  const active: number = useSelector(activeCountSelector);
  const completed: number = useSelector(completedCountSelector);
  const filter: FilterBy = useSelector(filterSelector);
  const fetchTodos = useCallback(() => dispatch(loadTodos()), [dispatch]);

  useEffect(() => {
    const asyncThunkAction = fetchTodos();
    window.addEventListener('visibilitychange', fetchTodos);
    window.addEventListener('online', fetchTodos);

    return () => {
      window.removeEventListener('visibilitychange', fetchTodos);
      window.removeEventListener('online', fetchTodos);
      // @ts-ignore
      asyncThunkAction.abort();
    };
  }, [fetchTodos]);

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
