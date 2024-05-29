const inquirer = require('inquirer');
const fs = require('fs');
const { default: Choices } = require('inquirer/lib/objects/choices');
const db = require('./db/connections');



const options = {
    type: 'list',
    name: 'options',
    choices: ['View all departments', 'View all roles', 'View all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
    
    
};

function main_menu() {
    inquirer.prompt(options).then((anwsers) => {
        const {options} = anwsers;
        
        if (options == 'View all departments'){
            db.query('SELECT * FROM departments', function (err, results) {
                console.log(results);
                main_menu();
            });
            
        }else if (options == 'View all roles'){
            db.query('SELECT * FROM roles', function (err, results) {
                if(err) console.log(err);
                console.log(results);
                main_menu();
            });
        }
    })
}
main_menu();
