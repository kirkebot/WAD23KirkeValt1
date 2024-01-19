/// <reference types = "cypress"/>  

it('Test 1', () => {
    cy.visit('http://localhost:8080/Instructor')
    cy.get('h1').contains('Instructor Management Pannel')
    
})
