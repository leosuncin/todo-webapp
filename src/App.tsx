import React from 'react';
import { Provider } from 'react-redux';

import './App.scss';
import Layout from './components/Layout';
import TodoList from './containers/TodoList';
import store from './store';

const App: React.FC = () => (
  <Layout>
    <Provider store={store}>
      <TodoList />
    </Provider>
  </Layout>
);

export default App;
