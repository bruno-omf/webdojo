// describe('template spec', () => {
//   it('passes', () => {
//     cy.viewport(1440, 900)
//     cy.visit('http://localhost:3000')
//   })
// })

describe('Login', ()=>{ // cenário de login
  it('Should log in successfully', ()=> { // caso de teste 1
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')
  })

  it('Should not log in with wrong password', ()=> { // caso de teste 2
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana000')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('Should not log in with wrong email', ()=> { // caso de teste 3
    cy.start()
    cy.submitLoginForm('404@webdojo.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

})