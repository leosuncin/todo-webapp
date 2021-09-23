import { ComponentMeta, ComponentStory } from '@storybook/react';

import FilterTodo from './FilterTodo';

export default {
  title: 'Todo/Filter Todo',
  component: FilterTodo,
} as ComponentMeta<typeof FilterTodo>;

const Template: ComponentStory<typeof FilterTodo> = (args) => (
  <FilterTodo {...args} />
);

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
