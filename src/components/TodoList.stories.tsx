import { action } from '@storybook/addon-actions';
import React from 'react';

import TodoList from './TodoList';
import TodoItem from './TodoItem';

export default {
  title: 'Todo|List Todo',
  component: TodoList,
  excludeStories: ['todos'],
};

export const todos = [
  {
    divider: true,
    checked: false,
    text: 'Make a sandwich',
  },
  {
    divider: false,
    checked: true,
    text: 'Make a salad',
  },
];

export const empty = () => <TodoList />;

export const withItems = () => (
  <TodoList>
    {todos.map(todo => (
      <TodoItem
        {...todo}
        onToggleDone={action('toggle-done')}
        onDeleteTodo={action('delete-todo')}
      />
    ))}
  </TodoList>
);
