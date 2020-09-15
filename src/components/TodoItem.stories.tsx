// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';

import TodoItem, { TodoItemProps } from './TodoItem';

export default {
  title: 'Todo/Todo Item',
  component: TodoItem,
} as Meta;

export const Default: Story<TodoItemProps> = (args) => <TodoItem {...args} />;

export const ShowSeparator = Default.bind({});
ShowSeparator.args = { divider: true, text: 'Make me a sandwich' };

export const DoneTodo = Default.bind({});
DoneTodo.args = { checked: true, text: 'Make me a sandwich' };
