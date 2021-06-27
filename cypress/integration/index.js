describe('Macro', () => {
  const signInfo = Cypress.env()
  before(() => {
    cy.visit(`https://everytime.kr/`)
  })

  it('Move to sign page', () => {
    cy.get('.login')
      .contains('로그인')
      .click()
  })

  it('Sign in', () => {
    cy.get('input[name=userid]')
      .type(signInfo.id)
    cy.get('input[name=password]')
      .type(signInfo.password)
    cy.get('input[type=submit]')
      .contains('로그인')
      .click()
  })
})