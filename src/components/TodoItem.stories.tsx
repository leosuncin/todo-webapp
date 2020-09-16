// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import TodoItem, { TodoItemProps } from './TodoItem';

export default {
  title: 'Todo/Todo Item',
  component: TodoItem,
} as Meta<TodoItemProps>;

const Template: Story<TodoItemProps> = (args) => <TodoItem {...args} />;

export const TodoPending = Template.bind({});
TodoPending.args = {
  todo: {
    id: '66459160-2390-4532-900b-8399586ac2c5',
    text: 'Make a sandwich',
    done: false,
    createdAt: '2020-06-01T18:30:00.000Z',
  },
};

export const TodoDone = Template.bind({});
TodoDone.args = {
  todo: {
    id: 'bcf13961-75a5-44a4-9ed6-2c15d25424ae',
    text: 'Make a salad',
    done: true,
    createdAt: '2020-06-01T20:00:00.000Z',
    doneAt: '2020-06-01T22:00:00.000Z',
  },
};
