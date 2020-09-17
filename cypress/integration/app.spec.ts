describe('TODO test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show the title', () => {
    cy.findByText(/TODO APP/).should('be.visible');
  });

  it('should create a todo', () => {
    cy.findByRole('textbox', {name: /Task/i}).type('Make a sandwich');
    cy.findByRole('button', { name: /Add/i }).click();

    cy.findByRole('list').should('have.length', 1);
    cy.findByText('Make a sandwich').should('exist');
  });

  it('should mark one todo as completed', () => {
    cy.findByRole('textbox', {name: /Task/i}).type('Make a sandwich{enter}');
    cy.findAllByRole('listitem')
      .first()
      .within(() => {
        cy.findByRole('checkbox', { name: /^Mark .* as done$/i }).click();
        cy.findByRole('checkbox', { name: /^Mark .* as undone$/i }).should('be.checked');
      });
  });

  it('should remove a todo', () => {
    cy.findByRole('textbox', {name: /Task/i}).type('Make a sandwich{enter}');
    cy.findAllByRole('listitem')
      .first()
      .within(() => {
        cy.findByRole('button', {name: /^Delete todo/i}).click();
      });

    cy.findByRole('listitem').should('have.text', 'The list of todo will appear here.');
  });

  it('should edit a todo', () => {
    cy.findByRole('textbox', {name: /Task/i}).type('Make a sandwich{enter}');
    cy.findAllByRole('listitem')
      .first()
      .within(() => {
        cy.findAllByRole('button').first().dblclick();
        cy.findByRole('textbox').clear().type('Make a salad').type('{enter}');
      });

    cy.findByText('Make a salad').should('exist')
  });
});
