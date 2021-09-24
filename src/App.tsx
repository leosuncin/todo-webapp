import React from 'react';

import './App.css';
import Layout from './components/Layout';
import TodoList from './containers/TodoList';
import { TodoProvider } from './hooks/useTodo';

const App: React.FC = () => (
  <Layout>
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  </Layout>
);

export default App;
