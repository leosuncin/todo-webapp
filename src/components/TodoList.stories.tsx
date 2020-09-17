// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import TodoItem from './TodoItem';
import * as TodoItemStories from './TodoItem.stories';
import TodoList, { TodoListProps } from './TodoList';

export default {
  title: 'Todo/List Todo',
  component: TodoList,
  subcomponents: { TodoItem },
} as Meta;

const Template: Story<TodoListProps> = (args) => <TodoList {...args} />;

export const Empty = Template.bind({});
Empty.args = { todos: [] };

export const WithItems = Template.bind({});
WithItems.args = {
  todos: [
    TodoItemStories.TodoPending.args!.todo!,
    TodoItemStories.TodoDone.args!.todo!,
  ],
};
