import todoReducer, {
  addTodo,
  removeTodo,
  setTodoList,
  TodoState,
  toggleTodo,
  updateTodo,
} from './todoReducer';

describe('todoReducer', () => {
  it('create todo', () => {
    const state = { todos: [] };
    const nextState = todoReducer(state, addTodo('Make a sandwich'));

    expect(nextState.todos).toHaveLength(1);
  });

  it('set todos', () => {
    const state = { todos: [] };
    const nextState = todoReducer(
      state,
      setTodoList([
        {
          id: '66459160-2390-4532-900b-8399586ac2c5',
          text: 'Make a sandwich',
          done: false,
          createdAt: '2020-06-01T18:30:00.000Z',
        },
        {
          id: 'bcf13961-75a5-44a4-9ed6-2c15d25424ae',
          text: 'Make a salad',
          done: true,
          createdAt: '2020-06-01T20:00:00.000Z',
          doneAt: '2020-06-01T22:00:00.000Z',
        },
      ]),
    );

    expect(nextState.todos).toHaveLength(2);
  });

  it('remove todo', () => {
    const state: TodoState = {
      todos: [
        {
          id: 'bcf13961-75a5-44a4-9ed6-2c15d25424ae',
          text: 'Make a salad',
          done: true,
          createdAt: '2020-06-01T20:00:00.000Z',
          doneAt: '2020-06-01T22:00:00.000Z',
        },
      ],
    };
    const nextState = todoReducer(
      state,
      removeTodo('bcf13961-75a5-44a4-9ed6-2c15d25424ae'),
    );

    expect(nextState.todos).toHaveLength(0);
  });

  it('toggle todo', () => {
    const state: TodoState = {
      todos: [
        {
          id: '66459160-2390-4532-900b-8399586ac2c5',
          text: 'Make a sandwich',
          done: false,
          createdAt: '2020-06-01T18:30:00.000Z',
        },
      ],
    };
    const nextState = todoReducer(
      state,
      toggleTodo('66459160-2390-4532-900b-8399586ac2c5', true),
    );

    expect(nextState.todos[0]).toHaveProperty('done', true);
  });

  it('update todo', () => {
    const state: TodoState = {
      todos: [
        {
          id: '66459160-2390-4532-900b-8399586ac2c5',
          text: 'Make a sandwich',
          done: false,
          createdAt: '2020-06-01T18:30:00.000Z',
        },
      ],
    };
    const nextState = todoReducer(
      state,
      updateTodo('66459160-2390-4532-900b-8399586ac2c5', 'Make a salad'),
    );

    expect(nextState.todos[0]).toHaveProperty('text', 'Make a salad');
  });
});
