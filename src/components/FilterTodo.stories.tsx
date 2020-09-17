// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import FilterTodo, { FilterTodoProps } from './FilterTodo';

export default {
  title: 'Todo/Filter Todo',
  component: FilterTodo,
} as Meta;

const Template: Story<FilterTodoProps> = (args) => <FilterTodo {...args} />;

export const Empty = Template.bind({});
Empty.args = { all: 0, active: 0, completed: 0 };

export const FilterAll = Template.bind({});
FilterAll.args = { all: 10, active: 5, completed: 5, filter: 'all' };

export const FilterActive = Template.bind({});
FilterActive.args = { all: 10, active: 10, completed: 0, filter: 'active' };

export const FilterCompleted = Template.bind({});
FilterCompleted.args = {
  all: 10,
  active: 0,
  completed: 10,
  filter: 'completed',
};
