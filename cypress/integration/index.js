describe('Macro', () => {
  const signInfo = Cypress.env('signInfo')
  const boardUri = Cypress.env('board')
  const queue = [
    {
      title: '제목으 ㄴ아무거나 입력할게요',
      article: '안녕하세요 저는 정보통신학부 16학번 윤딴딴 입니다.'
    }
  ]
  before(() => {
    cy.visit(`https://everytime.kr/${boardUri}`)
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

  it('Write articles', () => {
    queue.map((item) => {
      cy.get('a#writeArticleButton')
        .click()
      cy.get('input[name=title]')
        .type(item.title)
      cy.get('textarea[name=text]')
        .type(item.article)
    })
  })
})