// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import React from 'react';

import TodoList from './TodoList';
import TodoItem from './TodoItem';

export default {
  title: 'Todo/List Todo',
  component: TodoList,
  excludeStories: ['todos'],
} as Meta;

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

export const Empty: Story = () => <TodoList />;

export const WithItems: Story = () => (
  <TodoList>
    {todos.map((todo, idx) => (
      <TodoItem
        key={idx}
        {...todo}
        onToggleDone={action('toggle-done')}
        onDeleteTodo={action('delete-todo')}
      />
    ))}
  </TodoList>
);
