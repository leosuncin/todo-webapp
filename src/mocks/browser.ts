import { setupWorker } from 'msw';
import {
  createTodoHandler,
  listTodosHandler,
  updateTodoHandler,
  deleteTodoHandler,
} from './handlers';

export default setupWorker(
  createTodoHandler,
  listTodosHandler,
  updateTodoHandler,
  deleteTodoHandler,
);
