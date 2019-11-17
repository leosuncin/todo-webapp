import { todoReducer } from './todoReducer';

describe('todoReducer', () => {
  it('create todo', () => {
    const state = { todos: [] };
    const nextState = todoReducer(state, {
      type: 'ADD_TODO',
      payload: 'Make a sandwich',
    });

    expect(nextState.todos).toHaveLength(1);
  });

  it('remove todo', () => {
    const state = {
      todos: [
        {
          id: 1,
          text: 'Make a sandwich',
          checked: false,
        },
      ],
    };
    const nextState = todoReducer(state, { type: 'REMOVE_TODO', payload: 1 });

    expect(nextState.todos).toHaveLength(0);
  });

  it('toggle todo', () => {
    const state = {
      todos: [
        {
          id: 1,
          text: 'Make a sandwich',
          checked: false,
        },
      ],
    };
    const nextState = todoReducer(state, {
      type: 'TOGGLE_TODO',
      payload: { id: 1, checked: true },
    });

    expect(nextState.todos[0]).toHaveProperty('checked', true);
  });

  it('update todo', () => {
    const state = {
      todos: [
        {
          id: 1,
          text: 'Make a sandwich',
          checked: false,
        },
      ],
    };
    const nextState = todoReducer(state, {
      type: 'UPDATE_TODO',
      payload: { id: 1, text: 'Make a salad', checked: true },
    });

    expect(nextState.todos[0]).toHaveProperty('text', 'Make a salad');
  });
});
