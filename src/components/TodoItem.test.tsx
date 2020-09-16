import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import TodoItem from './TodoItem';
import * as TodoItemStories from './TodoItem.stories';

describe('<TodoItem />', () => {
  it('should render', () => {
    expect(
      render(
        <TodoItem
          todo={TodoItemStories.TodoPending.args!.todo!}
          onChangeTodo={jest.fn()}
          onToggleDone={jest.fn()}
          onRemoveTodo={jest.fn()}
        />,
      ),
    ).toBeDefined();
  });

  it('should change status', () => {
    const spyMarkTodo = jest.fn();
    const todo = TodoItemStories.TodoPending.args!.todo!;

    render(
      <TodoItem
        todo={todo}
        onChangeTodo={jest.fn()}
        onToggleDone={spyMarkTodo}
        onRemoveTodo={jest.fn()}
      />,
    );
    userEvent.click(screen.getByRole('checkbox'));

    expect(spyMarkTodo).toHaveBeenCalledWith(todo.id, !todo.done);
  });

  it('should edit the todo on blur', () => {
    const todo = TodoItemStories.TodoPending.args!.todo!;
    const spyChange = jest.fn();

    render(
      <TodoItem
        todo={todo}
        onChangeTodo={spyChange}
        onToggleDone={jest.fn()}
        onRemoveTodo={jest.fn()}
      />,
    );
    userEvent.dblClick(screen.getByText(todo.text));
    userEvent.type(
      screen.getByRole('textbox'),
      '{selectall}Take over the world',
    );
    fireEvent.blur(screen.getByRole('textbox'));

    expect(spyChange).toHaveBeenCalledWith(todo.id, {
      text: 'Take over the world',
    });
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('should edit the todo on type {enter}', () => {
    const todo = TodoItemStories.TodoPending.args!.todo!;
    const spyChange = jest.fn();

    render(
      <TodoItem
        todo={todo}
        onChangeTodo={spyChange}
        onToggleDone={jest.fn()}
        onRemoveTodo={jest.fn()}
      />,
    );
    userEvent.dblClick(screen.getByText(todo.text));
    userEvent.clear(screen.getByRole('textbox'));
    userEvent.type(screen.getByRole('textbox'), 'Make exercise{enter}');

    expect(spyChange).toHaveBeenCalledWith(todo.id, { text: 'Make exercise' });
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('should abort edit the todo', () => {
    const todo = TodoItemStories.TodoPending.args!.todo!;
    const spyChange = jest.fn();

    render(
      <TodoItem
        todo={todo}
        onChangeTodo={spyChange}
        onToggleDone={jest.fn()}
        onRemoveTodo={jest.fn()}
      />,
    );
    userEvent.dblClick(screen.getByText(todo.text));
    userEvent.clear(screen.getByRole('textbox'));
    userEvent.type(screen.getByRole('textbox'), 'Make exercise{esc}');

    expect(spyChange).not.toHaveBeenCalled();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('should show error with empty text', async () => {
    const todo = TodoItemStories.TodoPending.args!.todo!;
    const spyChange = jest.fn();

    render(
      <TodoItem
        todo={todo}
        onChangeTodo={spyChange}
        onToggleDone={jest.fn()}
        onRemoveTodo={jest.fn()}
      />,
    );
    userEvent.dblClick(screen.getByText(todo.text));
    userEvent.type(
      screen.getByRole('textbox'),
      '{selectall}{backspace}{enter}',
    );

    await expect(
      screen.findByText(/Text is required/i),
    ).resolves.toBeInTheDocument();

    expect(spyChange).not.toHaveBeenCalled();
  });

  it('should show error with too large text', async () => {
    const todo = TodoItemStories.TodoPending.args!.todo!;
    const spyChange = jest.fn();

    render(
      <TodoItem
        todo={todo}
        onChangeTodo={spyChange}
        onToggleDone={jest.fn()}
        onRemoveTodo={jest.fn()}
      />,
    );
    userEvent.dblClick(screen.getByText(todo.text));
    userEvent.clear(screen.getByRole('textbox'));
    await userEvent.type(
      screen.getByRole('textbox'),
      'Cursus chuña dignissim cachimbo pedo ut egestas. In bajar cherche placerat gravida zumba. Gravida chucheria webiar vergon enim tetelque chocoya.',
    );
    fireEvent.blur(screen.getByRole('textbox'));

    await expect(
      screen.findByText(/Text must be at most 140 characters/i),
    ).resolves.toBeInTheDocument();

    expect(spyChange).not.toHaveBeenCalled();
  });

  it('should not cache the changes of text between edit', () => {
    const todo = Object.assign({}, TodoItemStories.TodoPending.args!.todo!, {
      text: 'Work it. Make it.',
    });
    const spyChange = jest.fn();

    render(
      <TodoItem
        todo={todo}
        onChangeTodo={spyChange}
        onToggleDone={jest.fn()}
        onRemoveTodo={jest.fn()}
      />,
    );
    userEvent.dblClick(screen.getByText(todo.text));
    userEvent.clear(screen.getByRole('textbox'));
    userEvent.type(
      screen.getByRole('textbox'),
      'Harder, Better, Faster, Stronger{esc}',
    );

    userEvent.dblClick(screen.getByText(todo.text));
    userEvent.type(screen.getByRole('textbox'), ' Do it. Makes us.{enter}');

    expect(spyChange).toHaveBeenCalledWith(todo.id, {
      text: 'Work it. Make it. Do it. Makes us.',
    });
  });

  it('should remove one todo', () => {
    const todo = TodoItemStories.TodoDone.args!.todo!;
    const spyRemove = jest.fn();

    render(
      <TodoItem
        todo={todo}
        onChangeTodo={jest.fn()}
        onToggleDone={jest.fn()}
        onRemoveTodo={spyRemove}
      />,
    );
    userEvent.click(screen.getByRole('button', { name: /Delete todo/i }));

    expect(spyRemove).toHaveBeenCalled();
  });
});
