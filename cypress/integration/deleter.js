/**
 * settings
 */
 
/**
  * main
  */
describe('Macro', () => {
  const signInfo = Cypress.env('signInfo')

  beforeEach(() => {
    cy.visit(`https://everytime.kr/myarticle`)
  })

  it(`article`, () => {
    cy.get('input[name=userid]')
      .type(signInfo.id)
    cy.get('input[name=password]')
      .type(signInfo.password)
    cy.get('input[type=submit]')
      .contains('로그인')
      .click()
    
  })
})
