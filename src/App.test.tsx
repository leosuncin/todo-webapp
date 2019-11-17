import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

it('renders without crashing', () => {
  const container = document.createElement('div');
  const { getByText } = render(<App />, { container });
  expect(getByText(/TODO APP/i)).toBeTruthy();
});

it('create a todo', () => {
  const { getByRole } = render(<App />);

  userEvent.type(getByRole('textbox'), 'Make a sandwich');
  userEvent.click(getByRole('button'));

  expect(getByRole('list').childNodes).toHaveLength(1);
});

it('remove todo', () => {
  const { getByRole, getByLabelText } = render(<App />);

  userEvent.type(getByRole('textbox'), 'Make a sandwich');
  fireEvent.keyPress(getByRole('textbox'), { key: 'Enter', keyCode: 13 });

  expect(getByRole('list').childNodes).toHaveLength(1);

  userEvent.click(getByLabelText(/Delete todo/));

  expect(getByRole('list').childNodes).toHaveLength(0);
});

it('toggle todo', () => {
  const { getByRole } = render(<App />);

  userEvent.type(getByRole('textbox'), 'Make a sandwich');
  userEvent.click(getByRole('button'));

  userEvent.click(getByRole('checkbox'));

  expect(getByRole('list').childNodes).toHaveLength(1);
  expect(getByRole('checkbox')).toBeChecked();
});
