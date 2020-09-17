import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

import { formatRelativeTime } from '../formatRelativeTime';
import { validations } from './AddTodo';
import { Todo } from '../hooks/todoReducer';

export type TodoItemProps = {
  todo: Todo;
  onChangeTodo: (id: Todo['id'], updates: Pick<Todo, 'text'>) => void;
  onToggleDone: (id: Todo['id'], done: boolean) => void;
  onRemoveTodo: (id: Todo['id']) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onChangeTodo,
  onToggleDone,
  onRemoveTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [validationError, setValidationError] = useState<string | null>();

  useEffect(() => {
    if (!text) {
      setValidationError(validations.text.required as string);
    } else if (
      text.length > (validations.text.maxLength as { value: number }).value
    ) {
      setValidationError(
        (validations.text.maxLength as { message: string }).message,
      );
    } else {
      setValidationError(null);
    }
  }, [text]);

  const saveTodo = () => {
    const hasError = !!validationError;

    if (todo.text !== text && !hasError) onChangeTodo(todo.id, { text });

    if (!hasError) setIsEditing(false);
  };

  const abortEdit = () => {
    setIsEditing(false);
    setText(todo.text);
  };

  return (
    <ListItem
      divider
      button
      ContainerProps={{ 'aria-label': `Double click to modify "${todo.text}"` }}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.done}
          inputProps={{
            'aria-label': `Mark "${todo.text}" as ${
              todo.done ? 'undone' : 'done'
            }`,
          }}
          onChange={(event) => onToggleDone(todo.id, event.target.checked)}
        />
      </ListItemIcon>
      <ListItemText
        id={todo.id}
        primary={
          isEditing ? (
            <TextField
              label="Edit text"
              id="text-edit"
              fullWidth
              value={text}
              error={!!validationError}
              helperText={validationError}
              onChange={(event) => setText(event.target.value)}
              onBlur={saveTodo}
              onKeyUp={(event) => {
                switch (event.key) {
                  case 'Escape':
                    abortEdit();
                    break;

                  case 'Enter':
                    saveTodo();
                    break;
                }
              }}
            />
          ) : todo.done ? (
            <del>{todo.text}</del>
          ) : (
            todo.text
          )
        }
        secondary={formatRelativeTime(todo.done ? todo.doneAt : todo.createdAt)}
        secondaryTypographyProps={{
          component: 'time',
          dateTime: todo.done ? todo.doneAt : todo.createdAt,
        }}
        onDoubleClick={() => setIsEditing((prevIsEditing) => !prevIsEditing)}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label={`Delete todo: "${todo.text}"`}
          disabled={isEditing}
          onClick={() => onRemoveTodo(todo.id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoItem;
