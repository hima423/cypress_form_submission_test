describe('template spec', () => {
  it('passes', () => {

    Cypress.on("uncaught:exception", () => { return false;});

    cy.visit('https://docs.google.com/forms/d/e/1FAIpQLScPfEbpaoUu3WVwSDM9wIFX5uo1XQ1xpuHNtP7cF_rkR-o8Zg/viewform');
    cy.url().should('eq', 'https://docs.google.com/forms/d/e/1FAIpQLScPfEbpaoUu3WVwSDM9wIFX5uo1XQ1xpuHNtP7cF_rkR-o8Zg/viewform');
    cy.contains('Health Survey').should('be.visible');
    cy.get('input[type="text"]').type('Himabindu');
    cy.get('[data-value="18 or above"]').click();
    cy.get('div[role="listbox"]').then($listbox => {
      if ($listbox.attr('aria-expanded') === 'false') {
        cy.wrap($listbox).click();
      }
    });
    cy.get('div[role="option"]').contains('Yes').click();
    cy.get('div[role="option"][data-value="Yes"]').should('have.attr', 'aria-selected', 'true');
    cy.contains('Submit').click();
    cy.url().should('include', '/formResponse');
    cy.contains('Your response has been recorded.').should('be.visible');
  })
})