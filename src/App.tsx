import React from 'react';

import './App.css';
import Layout from './components/Layout';
import TodoList from './containers/TodoList';

const App: React.FC = () => (
  <Layout>
    <TodoList />
  </Layout>
);

export default App;
