import { ComponentMeta, ComponentStory } from '@storybook/react';
import { advanceTo } from 'jest-date-mock';

import TodoItem from './TodoItem';

export default {
  title: 'Todo/Todo Item',
  component: TodoItem,
} as ComponentMeta<typeof TodoItem>;

advanceTo(new Date(2020, 9, 4, 2, 13, 0, 0));

const Template: ComponentStory<typeof TodoItem> = (args) => (
  <TodoItem {...args} />
);

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
