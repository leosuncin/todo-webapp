import { action } from '@storybook/addon-actions';
import React from 'react';

import AddTodo from './AddTodo';

export default {
  title: 'Todo|Add Todo',
  component: AddTodo,
};

export const Default = () => (
  <AddTodo
    onChangeText={action('change-text')}
    onInputKeyPress={action('input-key-press')}
    onButtonClick={action('button-click')}
  />
);
