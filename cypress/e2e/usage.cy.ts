describe('App usage', () => {

  it('Login to test and logout', () => {
    cy.visit('/');
    cy.get('input[name="login"]')
      .type('test');
    cy.get('input[name="password"]')
      .type('test');
    cy.get('button').click();
    cy.contains('Bus Stops');
    cy.get('button').contains('Logout').click();
  });

  describe('After logging in', () => {

    beforeEach(() => {
      cy.visit('/');
      cy.get('input[name="login"]')
        .type('test');
      cy.get('input[name="password"]')
        .type('test');
      cy.get('button').click();
    });

    afterEach(() => {
      cy.get('button').contains('Logout').click();
    });

    it('all bus stops load', () => {
      cy.contains('Bus Stops');

      cy.get('.stop-list')
        .should('contain.text', 'Loading...')

      cy.get('input[name="filter"]')
        .type('opera')

      cy.get('.highlight')
        .first()
        .get('.stop-list')
        .first()
        .should('not.contain.text', 'Empty...');

    });

    it('favorites is empty', () => {
      cy.contains('Favorites');

      cy.get('input[name="filter"]')
        .type('opera')

      cy.get('.stop-list')
        .last()
        .should('contain.text', 'Empty...')

    });

    it('should add and remove from favorites', () => {
      cy.contains('Favorites');

      cy.get('input[name="filter"]')
        .type('opera')

      cy.get('.stop-list')
        .first()
        .find('.highlight')
        .first()
        .find('div')
        .last()
        .click()

      cy.get('.stop-list')
        .last()
        .find('.highlight')
        .first()
        .find('div')
        .last()
        .click()
    });

    it('should be able to check departures', () => {
      cy.contains('Departures');

      cy.get('input[name="filter"]')
        .type('opera')

      cy.get('.stop-list')
        .first()
        .find('.highlight')
        .first()
        .click()

      cy.contains('Loading...')
        .get('.grid.grid-nogutter')
        .contains('Line')
        .get('.grid.grid-nogutter')
        .contains('Direction')
        .get('.grid.grid-nogutter')
        .contains('Time')
    });

  });

});