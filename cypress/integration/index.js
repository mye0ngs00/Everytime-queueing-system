const queue = [
  {
    title: '제목으 ㄴ아무거나 입력할게요',
    article: '안녕하세요 dpqmfl타임'
  },
  {
    title: '제목3213213123321입력할게요',
    article: '안23232321mfl타임'
  },
]

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
      cy.get('input[name=title]')
        .type(item.title)
      cy.get('textarea[name=text]')
        .type(item.article)
      cy.get('li.submit')
        .click()

      const random = 1000 * 60 * 5 + Math.random() * 2 * 1000 * 60 // 5  min + 0~2 min
      cy.wait(random)
    })
  })
})
