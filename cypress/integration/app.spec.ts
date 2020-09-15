describe('TODO test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show the title', () => {
    cy.findByText(/TODO APP/).should('be.visible');
  });

  it('should create a todo', () => {
    cy.findByRole('textbox').type('Make a sandwich');
    cy.findByRole('button', { name: /Add/i }).click();

    cy.findByRole('list').should('have.length', 1);
  });

  it('should remove a todo', () => {
    cy.findByRole('textbox').type('Make a sandwich{enter}');
    cy.findByRole('list').should('have.length', 1);
    cy.findByLabelText(/Delete todo/).click();

    cy.findAllByRole('listitem').should('have.length', 0);
  });

  it('should toggle a todo', () => {
    cy.findByRole('textbox').type('Make a sandwich');
    cy.findByRole('button').click();
    cy.findByRole('checkbox').click();

    cy.findByRole('list').should('have.length', 1);
    cy.findByRole('checkbox').should('be.checked');
  });
});
