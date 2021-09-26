import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';

import { listTodosHandler } from '../mocks/handlers';
import TodoList from './TodoList';

describe('<TodoList />', () => {
  const server = setupServer(listTodosHandler);

  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render', async () => {
    expect(render(<TodoList />)).toBeDefined();
    expect(screen.getByRole('listitem')).toHaveTextContent(
      'The list of todo will appear here.',
    );

    await waitForElementToBeRemoved(
      screen.getByText('The list of todo will appear here.'),
    );
  });

  it('create a todo', async () => {
    render(<TodoList />);

    await userEvent.type(screen.getByLabelText(/Task/i), 'Make a sandwich');
    userEvent.click(screen.getByRole('button', { name: /Add/i }));

    await expect(
      screen.findByText('Make a sandwich'),
    ).resolves.toBeInTheDocument();
  });

  it('remove todo', async () => {
    render(<TodoList />);

    userEvent.type(screen.getByLabelText(/Task/i), 'Make a sandwich{enter}');

    await screen.findByText('Make a sandwich');

    userEvent.click(screen.getByRole('button', { name: /^Delete todo/ }));

    expect(screen.queryByText('Make a sandwich')).not.toBeInTheDocument();
  });

  it('toggle todo', async () => {
    render(<TodoList />);

    userEvent.type(screen.getByLabelText(/Task/i), 'Make a sandwich{enter}');

    await screen.findByText('Make a sandwich');

    userEvent.click(screen.getByRole('checkbox', { name: /Mark .* as done/ }));

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(
      screen.getByRole('checkbox', { name: /Mark .* as undone/i }),
    ).toBeChecked();
  });
});
