import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

it('renders without crashing', () => {
  render(<App />);
  expect(screen.getByRole('banner')).toBeInTheDocument();
});

it('create a todo', async () => {
  render(<App />);

  await userEvent.type(screen.getByLabelText(/Task/i), 'Make a sandwich');
  act(()=> {
    userEvent.click(screen.getByRole('button', { name: /Add/i }));
  })

  await expect(screen.findByText('Make a sandwich')).resolves.toBeInTheDocument();
});

it('remove todo', async () => {
  render(<App />);

  await act(async () => {
    await userEvent.type(
      screen.getByLabelText(/Task/i),
      'Make a sandwich{enter}',
    );
  })

  userEvent.click(screen.getByRole('button', { name: /^Delete todo/ }));

  expect(screen.queryByText('Make a sandwich')).not.toBeInTheDocument();
});

it('toggle todo', async () => {
  render(<App />);

  await act(async () => {
    await userEvent.type(
      screen.getByLabelText(/Task/i),
      'Make a sandwich{enter}',
    );
  })
  userEvent.click(screen.getByRole('checkbox', { name: /Mark .* as done/ }));

  expect(screen.getAllByRole('listitem')).toHaveLength(1);
  expect(
    screen.getByRole('checkbox', { name: /Mark .* as undone/i }),
  ).toBeChecked();
});
