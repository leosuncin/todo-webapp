import { Paper, List } from '@material-ui/core';
import React from 'react';

const TodoList: React.FC = ({ children }) => (
  <Paper style={{ margin: 16 }}>
    <List style={{ overflow: 'scroll' }}>{children}</List>
  </Paper>
);

export default TodoList;
