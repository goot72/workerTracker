const inquirer = require('inquirer');
const fs = require('fs');
const { default: Choices } = require('inquirer/lib/objects/choices');



const options = {
    type: 'list',
    name: 'options',
    choices: ['View all departments', 'View all roles', 'View all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
    

};

inquirer.prompt(options).then((anwsers) => {

    
})