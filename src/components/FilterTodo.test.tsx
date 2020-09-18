import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { FilterBy } from '../slices/filterSlice';
import FilterTodo from './FilterTodo';

/**
 * Shuffles array in place.
 *
 * @param {Array} array An array containing the items.
 * @returns {Array}
 */
function shuffle<T>(array: Array<T>): Array<T> {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const aux = array[i];
    array[i] = array[j];
    array[j] = aux;
  }

  return array;
}

describe('<FilterTodo />', () => {
  it('should render', () => {
    expect(
      render(
        <FilterTodo
          all={0}
          completed={0}
          active={0}
          filter="all"
          switchFilter={jest.fn()}
          onClearCompleted={jest.fn()}
        />,
      ),
    ).toBeDefined();
    expect(screen.queryByText('Clear completed')).not.toBeInTheDocument();
  });

  it('should switch the filter', () => {
    const spyChangeFilter = jest.fn();
    const mockClearComleted = jest.fn();
    const { rerender } = render(
      <FilterTodo
        all={10}
        completed={5}
        active={5}
        filter="all"
        switchFilter={spyChangeFilter}
        onClearCompleted={mockClearComleted}
      />,
    );

    shuffle(['all', 'completed', 'active'] as FilterBy[]).forEach((filter) => {
      userEvent.click(
        screen.getByRole('button', { name: RegExp('^' + filter, 'i') }),
      );

      expect(spyChangeFilter).toHaveBeenCalledWith(filter);

      rerender(
        <FilterTodo
          all={10}
          completed={5}
          active={5}
          filter={filter}
          switchFilter={spyChangeFilter}
          onClearCompleted={mockClearComleted}
        />,
      );
    });
  });

  it('should click «Clear completed»', () => {
    const spyClearCompleted = jest.fn();
    render(
      <FilterTodo
        all={0}
        completed={1}
        active={0}
        filter="all"
        switchFilter={jest.fn()}
        onClearCompleted={spyClearCompleted}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: 'Clear completed' }));

    expect(spyClearCompleted).toHaveBeenCalled();
  });
});
