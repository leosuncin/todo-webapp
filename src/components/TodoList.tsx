import { Grid, List, Typography } from '@material-ui/core';
import React from 'react';

import TodoItem from './TodoItem';
import { Todo } from '../hooks/todoReducer';

export type TodoListProps = {
  todos: Todo[];
  onChangeTodo: (id: Todo['id'], updates: Pick<Todo, 'text'>) => void;
  onToggleDone: (id: Todo['id'], done: boolean) => void;
  onRemoveTodo: (id: Todo['id']) => void;
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onChangeTodo,
  onToggleDone,
  onRemoveTodo,
}) => (
  <Grid item>
    <List aria-label="List of todo">
      {!todos || todos.length < 1 ? (
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
            onChangeTodo={onChangeTodo}
            onToggleDone={onToggleDone}
            onRemoveTodo={onRemoveTodo}
          />
        ))
      )}
    </List>
  </Grid>
);

export default TodoList;
