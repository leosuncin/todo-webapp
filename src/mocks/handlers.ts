import { bool, build, fake, perBuild } from '@jackfranklin/test-data-bot';
import { rest } from 'msw';

export interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: Date;
  doneAt?: Date;
}

export interface CreateTodo {
  text: string;
}

export interface EditTodo {
  text: string;
  done: boolean;
}

export interface ErrorResponse {
  readonly message: string;
  readonly statusCode: number;
  readonly errors?: Record<string, string>;
}

const todoBuilder = build<Todo>({
  fields: {
    id: fake((f) => f.random.uuid()),
    text: fake((f) => f.hacker.phrase()),
    done: perBuild(() => false),
    createdAt: perBuild(() => new Date()),
  },
  traits: {
    oldTask: {
      overrides: {
        done: bool(),
        createdAt: fake((f) => f.date.past()),
      },
      postBuild(todo) {
        if (todo.done) {
          const doneAt = new Date(todo.createdAt);
          doneAt.setDate(doneAt.getDate() + Math.round(Math.random() * 30));
          todo.doneAt = doneAt;
        }

        return todo;
      },
    },
  },
});

const todos: Todo[] = Array.from({ length: 10 }, () =>
  todoBuilder({ traits: 'oldTask' }),
);

export const createTodoHandler = rest.post<CreateTodo>(
  '/api/todos',
  (req, res, ctx) => {
    if (!req.body.text) {
      const response: ErrorResponse = {
        statusCode: 422,
        message: 'Validation errors',
        errors: { text: 'Text should not be empty' },
      };
      return res(ctx.status(422), ctx.json<ErrorResponse>(response));
    }

    const todo = todoBuilder({ overrides: req.body as any });
    todos.unshift(todo);

    return res(ctx.status(201), ctx.json(todo));
  },
);

export const listTodosHandler = rest.get('/api/todos', (_, res, ctx) =>
  res(ctx.delay(Math.random() * 1e3), ctx.json(todos)),
);

export const updateTodoHandler = rest.put<EditTodo, any, Pick<Todo, 'id'>>(
  '/api/todos/:id',
  (req, res, ctx) => {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === id);

    if (!todo)
      return res(
        ctx.status(404),
        ctx.json<ErrorResponse>({
          statusCode: 404,
          message: 'Todo not found',
        }),
      );

    todo.text = req.body.text ?? todo.text;
    todo.done = req.body.done ?? todo.done;

    if (todo.done && req.body.done) {
      todo.doneAt = new Date();
    }
    if ('doneAt' in todo && !todo.done) {
      // @ts-ignore
      delete todo.doneAt;
    }

    return res(ctx.json(todo));
  },
);

export const deleteTodoHandler = rest.delete<undefined, any, Pick<Todo, 'id'>>(
  '/api/todos/:id',
  (req, res, ctx) => {
    const { id } = req.params;
    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1)
      return res(
        ctx.status(404),
        ctx.json<ErrorResponse>({
          statusCode: 404,
          message: 'Todo not found',
        }),
      );

    delete todos[index];

    return res(ctx.status(204));
  },
);
