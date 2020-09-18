import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';

import TodoList from './TodoList';
import { makeStore } from '../store';

describe('<TodoList />', () => {
  let wrapper: React.FC;

  beforeEach(() => {
    wrapper = ({ children }) => (
      <Provider store={makeStore()}>{children}</Provider>
    );
  });

  it('should render', () => {
    expect(render(<TodoList />, { wrapper })).toBeDefined();
    expect(screen.getByRole('listitem')).toHaveTextContent(
      'The list of todo will appear here.',
    );
  });

  it('create a todo', async () => {
    render(<TodoList />, { wrapper });

    await userEvent.type(screen.getByLabelText(/Task/i), 'Make a sandwich');
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /Add/i }));
    });

    await expect(
      screen.findByText('Make a sandwich'),
    ).resolves.toBeInTheDocument();
  });

  it('remove todo', async () => {
    render(<TodoList />, { wrapper });

    await act(async () => {
      await userEvent.type(
        screen.getByLabelText(/Task/i),
        'Make a sandwich{enter}',
      );
    });

    userEvent.click(screen.getByRole('button', { name: /^Delete todo/ }));

    expect(screen.queryByText('Make a sandwich')).not.toBeInTheDocument();
  });

  it('toggle todo', async () => {
    render(<TodoList />, { wrapper });

    await act(async () => {
      await userEvent.type(
        screen.getByLabelText(/Task/i),
        'Make a sandwich{enter}',
      );
    });
    userEvent.click(screen.getByRole('checkbox', { name: /Mark .* as done/ }));

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(
      screen.getByRole('checkbox', { name: /Mark .* as undone/i }),
    ).toBeChecked();
  });
});
