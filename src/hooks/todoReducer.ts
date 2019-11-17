export type Todo = {
  id: number;
  text: string;
  checked: boolean;
};

type AddTodoAction = {
  type: 'ADD_TODO';
  payload: string;
};

type RemoveTodoAction = {
  type: 'REMOVE_TODO';
  payload: number;
};

type ToggleTodoAction = {
  type: 'TOGGLE_TODO';
  payload: {
    id: number;
    checked: boolean;
  };
};

type UpdateTodoAction = {
  type: 'UPDATE_TODO';
  payload: Todo;
};

type TodoAction =
  | AddTodoAction
  | RemoveTodoAction
  | ToggleTodoAction
  | UpdateTodoAction;

type TodoState = {
  todos: Todo[];
};

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, checked: false },
        ],
      };
    case 'REMOVE_TODO':
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, checked: action.payload.checked }
            : todo,
        ),
      };
    case 'UPDATE_TODO':
      return {
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };
    default:
      return state;
  }
}
