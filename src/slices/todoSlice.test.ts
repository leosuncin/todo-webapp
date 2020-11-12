import { CombinedState } from '@reduxjs/toolkit';
import { Reducer, Selector } from 'redux-testkit';

import type { FilterState, FILTER_KEY_FEATURE } from './filterSlice';
import type { TodoState, TODO_KEY_FEATURE } from './todoSlice';
import todoReducer, {
  activeCountSelector,
  addTodo,
  allCountSelector,
  clearCompleted,
  completedCountSelector,
  displayTodosSelector,
  removeTodo,
  toggleTodo,
  updateTodo,
} from './todoSlice';

describe('todoSlice', () => {
  describe('reducer', () => {
    it(`should handle "${addTodo}" action`, () => {
      Reducer(todoReducer)
        .expect(addTodo('Make a sandwich'))
        .toReturnState(
          expect.objectContaining({
            ids: expect.any(Array),
            entities: expect.any(Object),
          }),
        );
    });

    it(`should handle "${removeTodo}" action`, () => {
      const initialState: TodoState = {
        ids: ['bcf13961-75a5-44a4-9ed6-2c15d25424ae'],
        entities: {
          'bcf13961-75a5-44a4-9ed6-2c15d25424ae': {
            id: 'bcf13961-75a5-44a4-9ed6-2c15d25424ae',
            text: 'Make a salad',
            done: true,
            createdAt: new Date('2020-06-01T20:00:00.000Z').getTime(),
            doneAt: new Date('2020-06-01T22:00:00.000Z').getTime(),
          },
        },
      };

      Reducer(todoReducer)
        .withState(initialState)
        .expect(removeTodo('bcf13961-75a5-44a4-9ed6-2c15d25424ae'))
        .toReturnState({ ids: [], entities: {} });
    });

    it(`should handle "${toggleTodo}" action`, () => {
      const initialState: TodoState = {
        ids: ['66459160-2390-4532-900b-8399586ac2c5'],
        entities: {
          '66459160-2390-4532-900b-8399586ac2c5': {
            id: '66459160-2390-4532-900b-8399586ac2c5',
            text: 'Make a sandwich',
            done: false,
            createdAt: new Date('2020-06-01T18:30:00.000Z').getTime(),
          },
        },
      };

      Reducer(todoReducer)
        .withState(initialState)
        .expect(
          toggleTodo({
            id: '66459160-2390-4532-900b-8399586ac2c5',
            done: true,
          }),
        )
        .toChangeInState({
          entities: {
            '66459160-2390-4532-900b-8399586ac2c5': {
              done: true,
              doneAt: expect.any(Number),
            },
          },
        });
    });

    it(`should handle "${updateTodo}" action`, () => {
      const initialState: TodoState = {
        ids: ['66459160-2390-4532-900b-8399586ac2c5'],
        entities: {
          '66459160-2390-4532-900b-8399586ac2c5': {
            id: '66459160-2390-4532-900b-8399586ac2c5',
            text: 'Make a sandwich',
            done: false,
            createdAt: new Date('2020-06-01T18:30:00.000Z').getTime(),
          },
        },
      };

      Reducer(todoReducer)
        .withState(initialState)
        .expect(
          updateTodo({
            id: '66459160-2390-4532-900b-8399586ac2c5',
            text: 'Make a salad',
          }),
        )
        .toChangeInState({
          entities: {
            '66459160-2390-4532-900b-8399586ac2c5': {
              text: 'Make a salad',
            },
          },
        });
    });

    it(`should handle "${clearCompleted}" action`, () => {
      const initialState: TodoState = {
        ids: [
          '66459160-2390-4532-900b-8399586ac2c5',
          'bcf13961-75a5-44a4-9ed6-2c15d25424ae',
        ],
        entities: {
          '66459160-2390-4532-900b-8399586ac2c5': {
            id: '66459160-2390-4532-900b-8399586ac2c5',
            text: 'Make a sandwich',
            done: false,
            createdAt: new Date('2020-06-01T20:30:00.000Z').getTime(),
          },
          'bcf13961-75a5-44a4-9ed6-2c15d25424ae': {
            id: 'bcf13961-75a5-44a4-9ed6-2c15d25424ae',
            text: 'Make a salad',
            done: true,
            createdAt: new Date('2020-06-01T20:00:00.000Z').getTime(),
            doneAt: new Date('2020-06-01T22:00:00.000Z').getTime(),
          },
        },
      };

      Reducer(todoReducer)
        .withState(initialState)
        .expect(clearCompleted())
        .toReturnState({
          ids: ['66459160-2390-4532-900b-8399586ac2c5'],
          entities: {
            '66459160-2390-4532-900b-8399586ac2c5': {
              id: '66459160-2390-4532-900b-8399586ac2c5',
              text: 'Make a sandwich',
              done: false,
              createdAt: new Date('2020-06-01T20:30:00.000Z').getTime(),
            },
          },
        });

      Reducer(todoReducer)
        .withState({ ids: [], entities: {} })
        .expect(clearCompleted())
        .toChangeInState({}); // Use empty changes due wix/redux-testkit#14
    });
  });

  describe('selector', () => {
    it('should select the counts from state', () => {
      const rootState: CombinedState<Record<
        typeof TODO_KEY_FEATURE,
        TodoState
      >> = {
        todo: {
          ids: [
            '66459160-2390-4532-900b-8399586ac2c5',
            'bcf13961-75a5-44a4-9ed6-2c15d25424ae',
          ],
          entities: {
            '66459160-2390-4532-900b-8399586ac2c5': {
              id: '66459160-2390-4532-900b-8399586ac2c5',
              text: 'Make a sandwich',
              done: false,
              createdAt: new Date('2020-06-01T20:30:00.000Z').getTime(),
            },
            'bcf13961-75a5-44a4-9ed6-2c15d25424ae': {
              id: 'bcf13961-75a5-44a4-9ed6-2c15d25424ae',
              text: 'Make a salad',
              done: true,
              createdAt: new Date('2020-06-01T20:00:00.000Z').getTime(),
              doneAt: new Date('2020-06-01T22:00:00.000Z').getTime(),
            },
          },
        },
      };

      Selector(allCountSelector).expect(rootState).toReturn(2);
      Selector(completedCountSelector).expect(rootState).toReturn(1);
      Selector(activeCountSelector).expect(rootState).toReturn(1);
    });

    it('should select the displayed todo', () => {
      const rootState: CombinedState<
        Record<typeof TODO_KEY_FEATURE, TodoState> &
          Record<typeof FILTER_KEY_FEATURE, FilterState>
      > = {
        todo: {
          ids: [
            '66459160-2390-4532-900b-8399586ac2c5',
            'bcf13961-75a5-44a4-9ed6-2c15d25424ae',
          ],
          entities: {
            '66459160-2390-4532-900b-8399586ac2c5': {
              id: '66459160-2390-4532-900b-8399586ac2c5',
              text: 'Make a sandwich',
              done: false,
              createdAt: new Date('2020-06-01T20:30:00.000Z').getTime(),
            },
            'bcf13961-75a5-44a4-9ed6-2c15d25424ae': {
              id: 'bcf13961-75a5-44a4-9ed6-2c15d25424ae',
              text: 'Make a salad',
              done: true,
              createdAt: new Date('2020-06-01T20:00:00.000Z').getTime(),
              doneAt: new Date('2020-06-01T22:00:00.000Z').getTime(),
            },
          },
        },
        filter: {
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
        .expect({ ...rootState, filter: { filter: 'completed' } })
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
        .expect({ ...rootState, filter: { filter: 'active' } })
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
