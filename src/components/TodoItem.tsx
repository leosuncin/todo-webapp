import {
  ListItem,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { DeleteOutlined as DeleteOutlinedIcon } from '@material-ui/icons';
import React from 'react';

export type TodoItemProps = {
  divider?: boolean;
  checked?: boolean;
  text: string;
  onToggleDone: React.MouseEventHandler<HTMLButtonElement>;
  onDeleteTodo: React.MouseEventHandler<HTMLButtonElement>;
};

const TodoItem: React.FC<TodoItemProps> = ({
  divider = false,
  checked = false,
  text,
  onToggleDone,
  onDeleteTodo,
}) => (
  <ListItem divider={divider as boolean}>
    <Checkbox
      disableRipple
      checked={checked as boolean}
      onClick={onToggleDone}
    />
    <ListItemText primary={text} />
    <ListItemSecondaryAction>
      <IconButton aria-label="Delete todo" onClick={onDeleteTodo}>
        <DeleteOutlinedIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default TodoItem;
