import React from 'react';
import { render, screen, act } from '@testing-library/react';

import App from './App';

it('renders without crashing', () => {
  render(<App />);
  expect(screen.getByRole('banner')).toBeInTheDocument();
});
