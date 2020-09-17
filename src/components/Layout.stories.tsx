// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import Layout, { LayoutProps } from './Layout';

export default {
  title: 'Todo/Layout',
  component: Layout,
} as Meta;

export const Empty: Story<LayoutProps> = (args) => (
  <Layout {...args}>
    <div></div>
  </Layout>
);
