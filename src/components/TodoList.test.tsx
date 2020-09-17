import { render, screen } from '@testing-library/react';
import React from 'react';

import TodoList from './TodoList';
import * as TodoListStories from './TodoList.stories';

describe('<TodoList />', () => {
  it('should render', () => {
    expect(
      render(
        <TodoList
          todos={[]}
          onChangeTodo={jest.fn()}
          onToggleDone={jest.fn()}
          onRemoveTodo={jest.fn()}
        />,
      ),
    ).toBeDefined();
    expect(screen.getByRole('listitem')).toHaveTextContent(
      'The list of todo will appear here.',
    );
  });

  it('should list todos', () => {
    const todos = TodoListStories.WithItems.args!.todos!;

    render(
      <TodoList
        todos={todos}
        onChangeTodo={jest.fn()}
        onToggleDone={jest.fn()}
        onRemoveTodo={jest.fn()}
      />,
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(todos.length);
  });
});
