/*
- [o] - counter의 초기값은 0이다.
- [o] - 버튼을 클릭 시 count가 1증가한다.
- [o] - 버튼을 클릭 시 count가 1감소한다.
- [o] - 버튼을 클릭 시 count가 10이 넘는 경우 더이상 증가하지 못한다. (Max 값이 10)
- [o] - 버튼을 클릭 시 count가 0보다 작아지는 경우 감소하지 못한다. (Min 값이 0)
- [o] - reset 버튼을 클릭 시 counter가 0으로 초기화된다.
*/

describe('example counter app', () => {
  // 모든 검사 전에 한번 이루어져아 할 코드 (홈페이지 열기)
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/index.html');
  });

  //첫번째 조건
  it('counter의 초기값은 0이다.', () => {
    cy.get('#value').invoke('text').should('eq', '0');
  });

  // 두번째 조건
  it('버튼을 클릭 시 count가 1증가한다.', () => {
    cy.get('#value')
      .invoke('text')
      .then((value) => {
        const preValue = +value;
        cy.get('.increase-btn').click();
        cy.get('#value')
          .invoke('text')
          .should('eq', String(preValue + 1));
      });
  });

  // 세번째 조건
  it('버튼을 클릭 시 count가 1감소한다.', () => {
    cy.get('.increase-btn').click();

    cy.get('#value')
      .invoke('text')
      .then((value) => {
        const preValue = +value;
        cy.get('.decrease-btn').click();
        cy.get('#value')
          .invoke('text')
          .should('eq', String(preValue - 1));
      });
  });

  // 네번째 조건
  it('버튼을 클릭 시 count가 10이 넘는 경우 더이상 증가하지 못한다.', () => {
    for (let i = 0; i < 11; i++) {
      cy.get('.increase-btn').click();
    }

    cy.get('#value').invoke('text').should('eq', '10');
  });

  // 다섯번째 조건
  it('버튼을 클릭 시 count가 0보다 작아지는 경우 감소하지 못한다.', () => {
    cy.get('.decrease-btn').click();
    cy.get('#value').invoke('text').should('eq', '0');
  });

  // 여섯번째 조건
  it('reset 버튼을 클릭 시 counter가 0으로 초기화된다.', () => {
    cy.get('.increase-btn').click();
    cy.get('.reset-btn').click();
    cy.get('#value').invoke('text').should('eq', '0');
  });
});
