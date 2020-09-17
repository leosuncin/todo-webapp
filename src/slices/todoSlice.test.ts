import todoReducer, {
  addTodo,
  removeTodo,
  TodoState,
  toggleTodo,
  updateTodo,
} from './todoSlice';

describe('todoSlice', () => {
  it(addTodo.toString(), () => {
    const state = { todos: [] };
    const nextState = todoReducer(state, addTodo('Make a sandwich'));

    expect(nextState.todos).toHaveLength(1);
  });

  it(removeTodo.toString(), () => {
    const state: TodoState = {
      todos: [
        {
          id: 'bcf13961-75a5-44a4-9ed6-2c15d25424ae',
          text: 'Make a salad',
          done: true,
          createdAt: new Date('2020-06-01T20:00:00.000Z'),
          doneAt: new Date('2020-06-01T22:00:00.000Z'),
        },
      ],
    };
    const nextState = todoReducer(
      state,
      removeTodo('bcf13961-75a5-44a4-9ed6-2c15d25424ae'),
    );

    expect(nextState.todos).toHaveLength(0);
  });

  it(toggleTodo.toString(), () => {
    const state: TodoState = {
      todos: [
        {
          id: '66459160-2390-4532-900b-8399586ac2c5',
          text: 'Make a sandwich',
          done: false,
          createdAt: new Date('2020-06-01T18:30:00.000Z'),
        },
      ],
    };
    const nextState = todoReducer(
      state,
      toggleTodo({ id: '66459160-2390-4532-900b-8399586ac2c5', done: true }),
    );

    expect(nextState.todos[0]).toHaveProperty('done', true);
    expect(nextState.todos[0]).toHaveProperty('doneAt');
  });

  it(updateTodo.toString(), () => {
    const state: TodoState = {
      todos: [
        {
          id: '66459160-2390-4532-900b-8399586ac2c5',
          text: 'Make a sandwich',
          done: false,
          createdAt: new Date('2020-06-01T18:30:00.000Z'),
        },
      ],
    };
    const nextState = todoReducer(
      state,
      updateTodo({
        id: '66459160-2390-4532-900b-8399586ac2c5',
        text: 'Make a salad',
      }),
    );

    expect(nextState.todos[0]).toHaveProperty('text', 'Make a salad');
  });
});
