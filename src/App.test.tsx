import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

it('renders without crashing', () => {
  const container = document.createElement('div');
  const { getByText } = render(<App />, { container });
  expect(getByText(/Learn React/i)).toBeTruthy();
});
