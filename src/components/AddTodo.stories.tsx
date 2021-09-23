import { ComponentStory, ComponentMeta } from '@storybook/react';

import AddTodo from './AddTodo';

export default {
  title: 'Todo/Add Todo',
  component: AddTodo,
} as ComponentMeta<typeof AddTodo>;

const Template: ComponentStory<typeof AddTodo> = (args) => (
  <AddTodo {...args} />
);

export const Default = Template.bind({});

export const WithDefaultText = Template.bind({});
WithDefaultText.args = {
  defaultText: 'Make a sandwich',
};
