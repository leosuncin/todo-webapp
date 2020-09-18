import { Reducer, Selector } from 'redux-testkit';

import { FILTER_KEY_FEATURE } from './filterSlice';
import todoReducer, {
  activeCountSelector,
  addTodo,
  allCountSelector,
  clearCompleted,
  completedCountSelector,
  displayTodosSelector,
  removeTodo,
  TODO_KEY_FEATURE,
  toggleTodo,
  updateTodo,
} from './todoSlice';

describe('todoSlice', () => {
  describe('reducer', () => {
    it(`should handle "${addTodo}" action`, () => {
      Reducer(todoReducer)
        .expect(addTodo('Make a sandwich'))
        .toReturnState({
          todos: [
            {
              id: expect.any(String),
              text: 'Make a sandwich',
              done: false,
              createdAt: expect.any(Number),
            },
          ],
        });
    });

    it(`should handle "${removeTodo}" action`, () => {
      Reducer(todoReducer)
        .withState({
          todos: [
            {
              id: 'bcf13961-75a5-44a4-9ed6-2c15d25424ae',
              text: 'Make a salad',
              done: true,
              createdAt: new Date('2020-06-01T20:00:00.000Z').getTime(),
              doneAt: new Date('2020-06-01T22:00:00.000Z').getTime(),
            },
          ],
        })
        .expect(removeTodo('bcf13961-75a5-44a4-9ed6-2c15d25424ae'))
        .toReturnState({ todos: [] });
    });

    it(`should handle "${toggleTodo}" action`, () => {
      Reducer(todoReducer)
        .withState({
          todos: [
            {
              id: '66459160-2390-4532-900b-8399586ac2c5',
              text: 'Make a sandwich',
              done: false,
              createdAt: new Date('2020-06-01T18:30:00.000Z'),
            },
          ],
        })
        .expect(
          toggleTodo({
            id: '66459160-2390-4532-900b-8399586ac2c5',
            done: true,
          }),
        )
        .toReturnState({
          todos: [
            {
              id: '66459160-2390-4532-900b-8399586ac2c5',
              text: 'Make a sandwich',
              done: true,
              createdAt: new Date('2020-06-01T18:30:00.000Z'),
              doneAt: expect.any(Number),
            },
          ],
        });
    });

    it(`should handle "${updateTodo}" action`, () => {
      Reducer(todoReducer)
        .withState({
          todos: [
            {
              id: '66459160-2390-4532-900b-8399586ac2c5',
              text: 'Make a sandwich',
              done: false,
              createdAt: new Date('2020-06-01T18:30:00.000Z'),
            },
          ],
        })
        .expect(
          updateTodo({
            id: '66459160-2390-4532-900b-8399586ac2c5',
            text: 'Make a salad',
          }),
        )
        .toReturnState({
          todos: [
            {
              id: '66459160-2390-4532-900b-8399586ac2c5',
              text: 'Make a salad',
              done: false,
              createdAt: new Date('2020-06-01T18:30:00.000Z'),
            },
          ],
        });
    });

    it(`should handle "${clearCompleted}" action`, () => {
      Reducer(todoReducer)
        .withState({
          todos: [
            {
              id: '66459160-2390-4532-900b-8399586ac2c5',
              text: 'Make a sandwich',
              done: false,
              createdAt: new Date('2020-06-01T20:30:00.000Z').getTime(),
            },
            {
              id: 'bcf13961-75a5-44a4-9ed6-2c15d25424ae',
              text: 'Make a salad',
              done: true,
              createdAt: new Date('2020-06-01T20:00:00.000Z').getTime(),
              doneAt: new Date('2020-06-01T22:00:00.000Z').getTime(),
            },
          ],
        })
        .expect(clearCompleted())
        .toReturnState({
          todos: [
            {
              id: '66459160-2390-4532-900b-8399586ac2c5',
              text: 'Make a sandwich',
              done: false,
              createdAt: new Date('2020-06-01T20:30:00.000Z').getTime(),
            },
          ],
        });

      Reducer(todoReducer)
        .withState({ todos: [] })
        .expect(clearCompleted())
        .toChangeInState({}); // Use empty changes due wix/redux-testkit#14
    });
  });

  describe('selector', () => {
    it('should select the counts from state', () => {
      const rootState = {
        [TODO_KEY_FEATURE]: {
          todos: [
            {
              id: '66459160-2390-4532-900b-8399586ac2c5',
              text: 'Make a sandwich',
              done: false,
              createdAt: new Date('2020-06-01T20:30:00.000Z').getTime(),
            },
            {
              id: 'bcf13961-75a5-44a4-9ed6-2c15d25424ae',
              text: 'Make a salad',
              done: true,
              createdAt: new Date('2020-06-01T20:00:00.000Z').getTime(),
              doneAt: new Date('2020-06-01T22:00:00.000Z').getTime(),
            },
          ],
        },
      };

      Selector(allCountSelector).expect(rootState).toReturn(2);
      Selector(completedCountSelector).expect(rootState).toReturn(1);
      Selector(activeCountSelector).expect(rootState).toReturn(1);
    });

    it('should select the displayed todo', () => {
      const rootState = {
        [TODO_KEY_FEATURE]: {
          todos: [
            {
              id: '66459160-2390-4532-900b-8399586ac2c5',
              text: 'Make a sandwich',
              done: false,
              createdAt: new Date('2020-06-01T20:30:00.000Z').getTime(),
            },
            {
              id: 'bcf13961-75a5-44a4-9ed6-2c15d25424ae',
              text: 'Make a salad',
              done: true,
              createdAt: new Date('2020-06-01T20:00:00.000Z').getTime(),
              doneAt: new Date('2020-06-01T22:00:00.000Z').getTime(),
            },
          ],
        },
        [FILTER_KEY_FEATURE]: {
          filter: 'all',
        },
      };

      Selector(displayTodosSelector)
        .expect(rootState)
        .toReturn([
          {
            id: '66459160-2390-4532-900b-8399586ac2c5',
            text: 'Make a sandwich',
            done: false,
            createdAt: new Date('2020-06-01T20:30:00.000Z').getTime(),
          },
          {
            id: 'bcf13961-75a5-44a4-9ed6-2c15d25424ae',
            text: 'Make a salad',
            done: true,
            createdAt: new Date('2020-06-01T20:00:00.000Z').getTime(),
            doneAt: new Date('2020-06-01T22:00:00.000Z').getTime(),
          },
        ]);
      Selector(displayTodosSelector)
        .expect({ ...rootState, [FILTER_KEY_FEATURE]: { filter: 'completed' } })
        .toReturn([
          {
            id: 'bcf13961-75a5-44a4-9ed6-2c15d25424ae',
            text: 'Make a salad',
            done: true,
            createdAt: new Date('2020-06-01T20:00:00.000Z').getTime(),
            doneAt: new Date('2020-06-01T22:00:00.000Z').getTime(),
          },
        ]);
      Selector(displayTodosSelector)
        .expect({ ...rootState, [FILTER_KEY_FEATURE]: { filter: 'active' } })
        .toReturn([
          {
            id: '66459160-2390-4532-900b-8399586ac2c5',
            text: 'Make a sandwich',
            done: false,
            createdAt: new Date('2020-06-01T20:30:00.000Z').getTime(),
          },
        ]);
    });
  });
});
