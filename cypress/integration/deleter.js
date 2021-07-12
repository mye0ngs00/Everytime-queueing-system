/**
 * settings
 */
const minLikes = 1
const minComments = 1

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
      .then(() => {
        pageParser()
      })

    let queue = []
    const pageParser = () => {
      if (cy.get('a.next').then(($inner) => { $inner.text().includes('다음') })) {
        cy.get('article > a')
          .then(el => {
            const length = Cypress.$(el).length
            cy.get('article > a')
              .each(($, idx) => {
                queue.push($)
                console.log(length)
                if (length - 1 === idx) {
                  cy.get('a.next')
                    .click()
                    .then(pageParser)
                }
              })
          })
      } else return
    }
    // cy.wrap($).href cy.visit(href..,.)
  })
})
