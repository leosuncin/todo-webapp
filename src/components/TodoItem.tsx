import {
  ListItem,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import DeletedOutlined from '@material-ui/icons/DeleteOutlined';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  divider: PropTypes.bool,
  checked: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};
const defaultProps = {
  divider: false,
  checked: false,
};

const TodoItem: React.FC<PropTypes.InferProps<typeof propTypes>> = ({
  divider,
  checked,
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
        <DeletedOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);
TodoItem.propTypes = propTypes;
TodoItem.defaultProps = defaultProps;

export default TodoItem;
