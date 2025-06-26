describe('Consultancy Form', () => {

    it('Should request individual consultancy', () => {
        cy.start() // pre-condição
        cy.submitLoginForm('papito@webdojo.com', 'katana123') // pre-condição

        cy.goTo('Formulários', 'Consultoria')
    })
})