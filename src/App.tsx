import React from 'react';

import './App.scss';
import Layout from './components/Layout';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';
import { todoReducer, Todo } from './hooks/todoReducer';

const App: React.FC = () => {
  const [inputTodoValue, setInputTodoValue] = React.useState('');
  const [state, dispatch] = React.useReducer(todoReducer, { todos: [] });

  function handleCreateTodo(text: string) {
    if (text) {
      dispatch({
        type: 'ADD_TODO',
        payload: text,
      });
      setInputTodoValue('');
    }
  }
  function handleToggleDone(todo: Todo) {
    dispatch({
      type: 'TOGGLE_TODO',
      payload: {
        id: todo.id,
        checked: !todo.checked,
      },
    });
  }
  function handleDeleteTodo(todo: Todo) {
    dispatch({
      type: 'REMOVE_TODO',
      payload: todo.id,
    });
  }

  return (
    <Layout>
      <AddTodo
        text={inputTodoValue}
        onChangeText={event => {
          setInputTodoValue(event.target.value);
        }}
        onInputKeyPress={event => {
          if (event.which === 13 || event.keyCode === 13) {
            handleCreateTodo(inputTodoValue);
          }
        }}
        onButtonClick={() => {
          handleCreateTodo(inputTodoValue);
        }}
      />
      <TodoList>
        {state.todos.map(todo => (
          <TodoItem
            {...todo}
            key={todo.id}
            onToggleDone={handleToggleDone.bind(null, todo)}
            onDeleteTodo={handleDeleteTodo.bind(null, todo)}
          />
        ))}
      </TodoList>
    </Layout>
  );
};

export default App;
