/// <reference types="@testing-library/cypress" />
import { mount } from '@cypress/react';

import './index.css';
import App from './App';
import { todos, todoBuilder } from './mocks/handlers';

beforeEach(() => {
  cy.intercept(/\/api\/todos/, todos).as('listTodo');

  mount(<App />, {
    stylesheets: [
      'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
    ],
  });
});

it('render the todo app', () => {
  cy.wait('@listTodo');

  cy.findByRole('banner').should('have.text', 'TODO APP');

  cy.findAllByRole('listitem').should('have.length', todos.length);
});

it('create a new todo', () => {
  const data = todoBuilder();

  cy.wait('@listTodo');

  cy.findByRole('textbox', { name: /Task/i }).type(data.text);
  cy.findByRole('button', { name: /Add/i }).click();

  cy.findByText(data.text).should('exist');
});

it('toggle a todo', () => {
  const todoIndex = Math.min(
    Math.floor(Math.random() * todos.length),
    todos.length - 1,
  );
  const todo = todos[todoIndex];

  cy.wait('@listTodo');

  cy.findAllByRole('listitem')
    .eq(todoIndex)
    .within(() => {
      cy.findByRole('checkbox', { name: /^Mark .* as (done|undone)$/i })
        .click()
        .should(todo.done ? 'not.be.checked' : 'be.checked');
    });
});

it('edit a todo', () => {
  const todoIndex = Math.min(
    Math.floor(Math.random() * todos.length),
    todos.length - 1,
  );

  cy.wait('@listTodo');

  cy.findAllByRole('listitem')
    .eq(todoIndex)
    .dblclick()
    .within(() => {
      cy.findByRole('textbox').clear().type('Make a salad{enter}');

      cy.findByText('Make a salad').should('exist');
    });
});

it('remove a todo', () => {
  const todoIndex = Math.min(
    Math.floor(Math.random() * todos.length),
    todos.length - 1,
  );
  const todo = todos[todoIndex];

  cy.wait('@listTodo');

  cy.findAllByRole('button', { name: /^delete todo/i })
    .eq(todoIndex)
    .click();

  cy.findByText(todo.text).should('not.exist');
});
