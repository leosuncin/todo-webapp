// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import AddTodo, { AddTodoProps } from './AddTodo';
import * as AddTodoStories from './AddTodo.stories';
import FilterTodo, { FilterTodoProps } from './FilterTodo';
import * as FilterTodoStories from './FilterTodo.stories';
import Layout, { LayoutProps } from './Layout';
import TodoList, { TodoListProps } from './TodoList';
import * as TodoListStories from './TodoList.stories';

export default {
  title: 'Todo/Layout',
  component: Layout,
  subcomponents: { AddTodo, FilterTodo, TodoList },
} as Meta;

export const Empty: Story<LayoutProps> = (args) => (
  <Layout {...args}>
    <div></div>
  </Layout>
);

export const TodoApp: Story<LayoutProps> = (args) => (
  <Layout {...args}>
    <AddTodo {...(AddTodoStories.Default.args! as AddTodoProps)} />
    <FilterTodo
      {...(FilterTodoStories.Empty.args as FilterTodoProps)}
      all={TodoListStories.WithItems.args!.todos!.length}
      active={TodoListStories.WithItems.args!.todos!.reduce(
        (count, todo) => count + Number(!todo.done),
        0,
      )}
      completed={TodoListStories.WithItems.args!.todos!.reduce(
        (count, todo) => count + Number(todo.done),
        0,
      )}
    />
    <TodoList {...(TodoListStories.WithItems.args! as TodoListProps)} />
  </Layout>
);
