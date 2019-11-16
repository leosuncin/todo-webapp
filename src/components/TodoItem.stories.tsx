import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import React from 'react';

import TodoItem from './TodoItem';

export default {
  title: 'Todo|Todo Item',
  component: TodoItem,
  decorators: [withKnobs],
};

export const Default = (
  <TodoItem
    divider={boolean('Divider', false)}
    checked={boolean('Checked', false)}
    text={text('Text', 'Make me a sandwich')}
    onToggleDone={action('toggle-done')}
    onDeleteTodo={action('delete-todo')}
  />
);

export const showSeparator = (
  <TodoItem
    divider
    text="Make me a sandwich"
    onToggleDone={action('toggle-done')}
    onDeleteTodo={action('delete-todo')}
  />
);

export const doneTodo = (
  <TodoItem
    checked
    text="Make me a sandwich"
    onToggleDone={action('toggle-done')}
    onDeleteTodo={action('delete-todo')}
  />
);
