context('TODO test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show the title', () => {
    cy.findByText(/TODO APP/).should('be.visible');
  });

  it('should create a todo', () => {
    cy.findByRole('textbox')
      .type('Make a sandwich')
      .findByRole('button')
      .click();

    cy.findByRole('list').should('have.length', 1);
  });

  it('should remove a todo', () => {
    cy.findByRole('textbox')
      .type('Make a sandwich{enter}')
      .findByRole('list')
      .should('have.length', 1)
      .findByLabelText(/Delete todo/)
      .click();

    cy.findByRole('list')
      .its('length')
      .should('be', 0);
  });

  it('should toggle a todo', () => {
    cy.findByRole('textbox')
      .type('Make a sandwich')
      .findByRole('button')
      .click()
      .findByRole('checkbox')
      .click();

    cy.findByRole('list')
      .should('have.length', 1)
      .findByRole('checkbox')
      .should('be.checked');
  });
});
