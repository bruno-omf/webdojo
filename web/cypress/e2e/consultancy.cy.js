describe('Consultancy Form', () => {

    it.only('Should request individual consultancy', () => {
        cy.start() // pre-condição
        cy.submitLoginForm('papito@webdojo.com', 'katana123') // pre-condição

        cy.goTo('Formulários', 'Consultoria')

        cy.get('input[placeholder="Digite seu nome completo"]').type('Bruno Oliveira')
        cy.get('input[placeholder="Digite seu email"]').type('papito@webdojo.com')
        // .should('have.value', 'papito@webdojo.com')
        cy.contains('label', 'Telefone')
            .parent()
            .find('input').type('81988880000')
            .should('have.value', ('(81) 98888-0000'))

        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('Individual')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .check()

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type('60936861088')
            .should('have.value', '609.368.610-88')

        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo'
        ]

        discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/document.pdf', { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')


        const techs = [
            'Cypress',
            'Selenium',
            'WebDriverIO',
            'Playwright',
            'Robot Framework'
        ]

        techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]') // o get seleciona este elemento com o input que tem este placeholder em específico.
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias') // o contains busca o elemento que contenha um trecho de texto específico
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        cy.contains('label', 'Li e aceito os')
            .find('input')
            .check()
        
        cy.contains('button', 'Enviar formulário')
            .click()
        
        cy.get('.modal')
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

        // cy.get('input[placeholder="Digite seu nome completo"]').type('Fernando Papito') // selecionando um campo pelo placeholder, caso nao haja ID. selecionar a tag que representa o elemento.
        // // cy.get('#email').type('papito@webdojo.com') // selecionando um campo pelo ID
        // cy.get('input[placeholder="Digite seu email"]').type('papito@webdojo.com')
        // cy.get('input[placeholder="(00) 00000-0000"]').type('81988880000')
        //     .should('have.value', '(81) 98888-0000') // o should vai garantir que o formato do campo a ser preenchido conforme o esperado/solicitado do cliente

        // // cy.get('#consultancyType').select('Individual')
        // cy.contains('label', 'Tipo de Consultoria') // o label é um elemento que traz o título do campo que vai ser usado para a entrada de dados. 
        //     .parent() // volto um "diretorio"
        //     .find('select') // acho o elemento "select" dentro da div
        //     .select('Individual') // seleciono a opcao "individual" do elemento "select"

        // // cy.contains('span', 'Pessoa Física')
        // //     .parent()
        // //     .find('input')
        // //     .check()
        // cy.contains('label', 'Pessoa Física')
        // .find('input')
        // .check() // o click aqui também funcionaria para selecionar uma opçao de botao estilo 'radio'
        // .should('be.checked') // garantia de que o botão radio de pessoa física está marcado

        // cy.contains('label', 'Pessoa Jurídica')
        // .find('input')
        // .should('be.not.checked') // garantia de que o campo irá ficar desmarcado, já que estamos num caso de teste de pessoa física.

        // cy.contains('label', 'CPF')
        //     .parent()
        //     .find('input')
        //     .type('60936861088')
        //     .should('have.value', '609.368.610-88')
    })

    it('Should validate required fields ', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.goTo('Formulários', 'Consultoria')
        
        cy.contains('button', 'Enviar formulário')
            .click()

        cy.contains('label', 'Nome Completo')
            .parent()
            .contains('p', 'Campo obrigatório')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'Email')
            .parent()
            .contains('p', 'Campo obrigatório')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('p', 'Você precisa aceitar os termos de uso')
            .should('be.visible')
    })
})