// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import React from 'react';

import Layout from './Layout';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import TodoItem from './TodoItem';

import { todos } from './TodoList.stories';

export default {
  title: 'Todo/Layout',
  component: Layout,
} as Meta;

export const Default: Story = () => (
  <Layout>
    <AddTodo
      text=""
      onChangeText={action('change-text')}
      onInputKeyPress={action('input-key-press')}
      onButtonClick={action('button-click')}
    />
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
  </Layout>
);
