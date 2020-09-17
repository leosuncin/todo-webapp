export type Todo =
  | {
      id: string;
      text: string;
      done: false;
      createdAt: string;
    }
  | {
      id: string;
      text: string;
      done: true;
      createdAt: string;
      doneAt: string;
    };

type AddTodoAction = {
  type: 'ADD_TODO';
  payload: Todo['text'];
};

type RemoveTodoAction = {
  type: 'REMOVE_TODO';
  payload: Todo['id'];
};

type ToggleTodoAction = {
  type: 'TOGGLE_TODO';
  payload: Pick<Todo, 'id' | 'done'>;
};

type UpdateTodoAction = {
  type: 'UPDATE_TODO';
  payload: Pick<Todo, 'id' | 'text'>;
};

type TodoAction =
  | AddTodoAction
  | RemoveTodoAction
  | ToggleTodoAction
  | UpdateTodoAction;

export type TodoState = {
  todos: Todo[];
};

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [
          {
            id: '' + Date.now(),
            text: action.payload,
            done: false,
            createdAt: new Date().toISOString(),
          },
          ...state.todos,
        ],
      };
    case 'REMOVE_TODO':
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? Object.assign(
                {},
                todo,
                action.payload.done
                  ? { done: true, doneAt: new Date().toISOString() }
                  : { done: false },
              )
            : todo,
        ),
      };
    case 'UPDATE_TODO':
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo,
        ),
      };
    default:
      return state;
  }
}
