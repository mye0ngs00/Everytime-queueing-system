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
      cy.get('div.pagination')
        .then(($inner) => {
          if ($inner.text().includes('다음')) {
            cy.get('article > a')
              .then(el => {
                const length = Cypress.$(el).length
                cy.get('article > a')
                  .each(($, idx) => {
                    queue.push($)
                    if (length - 1 === idx) {
                      cy.get('a.next')
                        .click()
                        .then(pageParser)
                    }
                  })
              })
          } else return visit()
        })
    }

    const visit = () => {
      queue.map((article) => {
        cy.wrap(article)
          .invoke('attr', 'href')
          .then((url) => {
            cy.visit(`https://everytime.kr${url}`)
          })
      })
    }
  })
})
