import type { Todo } from '../hooks/todoReducer';
import type { CreateTodo, EditTodo, ErrorResponse } from '../mocks/handlers';

export class HttpError extends Error implements ErrorResponse {
  readonly statusCode: number;
  readonly errors?: Record<string, string>;

  constructor({ message, statusCode, errors }: ErrorResponse) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static isHttpError(error: Error): error is HttpError {
    return (
      error.name === this.name &&
      Object.prototype.hasOwnProperty.call(error, 'statusCode')
    );
  }
}

/**
 * Wrapper of fetch
 *
 * @param {RequestInfo} input     String URL or request
 * @param {RequestInit} [options] Fetch's options
 * @returns {Promise<Data>}
 * @throws {HttpError} Whether the API returns an error
 */
export async function fetcher<Data>(
  input: RequestInfo,
  options?: RequestInit,
): Promise<Data> {
  const resp = await fetch(input, options);
  let result: Data | ErrorResponse;

  if (resp.status === 204) {
    // @ts-ignore
    return;
  }
  // Returns HTML if MSW is not register yet
  if (!/json/.test(resp.headers.get('content-type') as string)) {
    throw new HttpError({ message: 'Unsupported Media Type', statusCode: 415 });
  }

  try {
    const text = await resp.text();
    result = JSON.parse(text);
  } catch {
    result = {
      statusCode: resp.status,
      message: resp.statusText,
    } as ErrorResponse;
  }

  if (resp.status < 400) return result as Data;

  throw new HttpError(result as ErrorResponse);
}

export async function createTodo(payload: CreateTodo): Promise<Todo> {
  const newTodo = await fetcher<Todo>('/api/todos', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return newTodo;
}

export async function getAllTodos(options: RequestInit = {}): Promise<Todo[]> {
  try {
    const todos = fetcher<Todo[]>('/api/todos', options);

    return todos;
  } catch (error) {
    if (HttpError.isHttpError(error) && error.statusCode === 415) {
      // Retry after 1 second
      return new Promise((resolve, reject) =>
        setTimeout(
          () =>
            fetcher<Todo[]>('/api/todos', options).then(resolve).catch(reject),
          1e3,
        ),
      );
    }
    return [];
  }
}

export async function updateTodo(
  id: Pick<Todo, 'id'>,
  payload: EditTodo,
): Promise<Todo> {
  const todoUpdated = await fetcher<Todo>(`/api/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return todoUpdated;
}

export async function deleteTodo(id: Pick<Todo, 'id'>): Promise<void> {
  await fetcher(`/api/todos/${id}`, { method: 'DELETE' });
}
