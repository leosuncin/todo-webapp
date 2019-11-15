context('CRA test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should show the link', () => {
    cy.findByText(/Learn React/).should('be.visible');
  });
});
