/**
 * settings
 */
const isAnonym = true
const queue = [
  {
    title: '배고프다.',
    article: '뭐 먹지?'
  },
  {
    title: '내일 뭐하지',
    article: '뭐할까?'
  },
  {
    title: '다음 학기 비대면 수업 한대?',
    article: '아니면 대면도 한대?'
  },
]

/**
 * main
 */
describe('Macro', () => {
  const signInfo = Cypress.env('signInfo')
  const boardUri = Cypress.env('board')

  beforeEach(() => {
    cy.visit(`https://everytime.kr/${boardUri}`)
  })

  queue.map((item, idx) => {
    it(`article${idx}`, () => {
      cy.get('input[name=userid]')
        .type(signInfo.id)
      cy.get('input[name=password]')
        .type(signInfo.password)
      cy.get('input[type=submit]')
        .contains('로그인')
        .click()
      
      cy.get('a#writeArticleButton')
        .click()
      if (isAnonym) {
        cy.get('li.anonym')
          .click()
      }
      cy.get('input[name=title]')
        .type(item.title)
      cy.get('textarea[name=text]')
        .type(item.article)
      cy.get('li.submit')
        .click()

      const random = 1000 * 60 * 5 + Math.random() * 2 * 1000 * 60 // 5 min + 0~2 min
      cy.wait(random)
    })
  })
})
