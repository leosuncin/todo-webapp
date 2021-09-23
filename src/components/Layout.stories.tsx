import { ComponentMeta, ComponentStory } from '@storybook/react';

import Layout from './Layout';

export default {
  title: 'Todo/Layout',
  component: Layout,
} as ComponentMeta<typeof Layout>;

export const Empty: ComponentStory<typeof Layout> = (args) => (
  <Layout {...args}>
    <div></div>
  </Layout>
);
