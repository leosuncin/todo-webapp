// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';

import AddTodo, { AddTodoProps } from './AddTodo';

export default {
  title: 'Todo/Add Todo',
  component: AddTodo,
} as Meta;

export const Default: Story<AddTodoProps> = (args) => <AddTodo {...args} />;
