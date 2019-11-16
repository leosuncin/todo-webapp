import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import React from 'react';

import Layout from './Layout';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import TodoItem from './TodoItem';

import { todos } from './TodoList.stories';

export default {
  title: 'Todo|Layout',
  component: Layout,
  decorators: [withKnobs],
};

export const Default = () => (
  <Layout>
    <AddTodo
      text={text('New todo', '')}
      onChangeText={action('change-text')}
      onInputKeyPress={action('input-key-press')}
      onButtonClick={action('button-click')}
    />
    <TodoList>
      {todos.map(todo => (
        <TodoItem
          {...todo}
          onToggleDone={action('toggle-done')}
          onDeleteTodo={action('delete-todo')}
        />
      ))}
    </TodoList>
  </Layout>
);
