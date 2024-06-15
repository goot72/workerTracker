const inquirer = require('inquirer');
const fs = require('fs');
const { default: Choices } = require('inquirer/lib/objects/choices');
const db = require('./db/connections');



const options = {
    type: 'list',
    name: 'options',
    choices: ['View all departments', 'View all roles', 'View all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
    
    
};
const newDept ={
    type: 'input',
    name: 'departments_name',
    message: 'What is the name of the new department?'
}
const newRole ={
    type: 'input',
    name: 'title',
    message: 'What is the name of the new role?',
}

async function getDepartments(){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM departments', function (err, results) {
            if(err) {
                reject(err);
            }else{
                resolve(results);
            }
        });
    });
}
async function getRoles(){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM roles', function (err, results) {
            if(err) {
                reject(err);
            }else{
                resolve(results);
            }
        });
    });
}function getEmployees(){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM employees', function (err, results) {
            if(err) {
                reject(err);
            }else{
                resolve(results);
            }
        });
    });
}
function main_menu() {
    inquirer.prompt(options).then((anwsers) => {
        const {options} = anwsers;
        
        if (options == 'View all departments'){
            db.query('SELECT * FROM departments', function (err, results) {
                console.log(results);
                main_menu();
            });
            
        }else if (options == 'View all roles'){
            db.query('SELECT * FROM roles ', function (err, results) {
                if(err) console.log(err);
                console.log(results);
                main_menu();
            });
        }else if(options == 'View all employees'){
            db.query('SELECT first_name, last_name, roles.title FROM employees LEFT JOIN roles on employees.role_id = roles.id',
            function (err, results) {
                if(err) console.log(err);
                console.log(results);
                main_menu();
            });
        }else if (options == 'add a department'){
            inquirer.prompt(newDept).then((answers) => {
                db.query('INSERT INTO departments SET?', answers, function (err, results) {
                    if(err) console.log(err);
                    console.log(results);
                    main_menu();
                });
            });
        }else if (options == 'add a role'){
            getDepartments().then((departments) => {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "title",
                        message: "Enter the title of the new role:",
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "Enter the salary of the new role:",
                    },
                    {
                        type: "list",
                        name: "departments_id",
                        message: "Select the department for the new role:",
                        choices: departments.map((departments) => {
                            return {
                                name: departments.name,
                                value: departments.id,
                            };
                        })
                    },
                ]).then((answers) => {
                    db.query('INSERT INTO roles SET?', answers, function (err, results) {
                        if(err) console.log(err);
                        console.log(results);
                        main_menu();
                        
                    });
                });
            });
        }else if(options == 'add an employee') {
            getRoles().then((roles) => {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "first_name",
                        message: "Enter the first name of the new employee:",
                    },
                    {
                        type: "input",
                        name: "last_name",
                        message: "Enter the last name of the new employee:",
                    },
                    {
                        type: "list",
                        name: "role_id",
                        message: "Select the role for the new employee:",
                        choices: roles.map((roles) => {
                            return {
                                name: roles.title,
                                value: roles.id,
                            };
                        })
                    },
                    // {
                    //     type: "list",
                    //     name: "manager_id",
                    //     message: "Select the manager for the new employee:",
                    //     choices: managers.map((managers) => {
                    //         return {
                    //             name: managers.first_name,
                    //             value: managers.first_name,
                    //         };
                    //     })
                    // },
                ]).then((anwsers) => {
                    db.query('INSERT INTO employees SET?', anwsers, function (err, results) {
                        if(err) console.log(err);
                        console.log(results);
                        main_menu();
                    });
                })
            })
        }else if(options == 'update an employee role'){
            getEmployees().then((employees) => {
                inquirer.prompt([
                    {
                        type: "list",
                        name: "employee_id",
                        message: "Select the employee you want to update:",
                        choices: employees.map((employees) => {
                            return {
                                name: employees.first_name,
                                value: employees.id,
                            };
                        })
                    },
                    {
                        type: "list",
                        name: "role_id",
                        message: "Select the new role for the employee:",
                        choices: roles.map((roles) => {
                            return {
                                name: roles.title,
                                value: roles.id,
                            };
                        })
                    },
                    
                ]).then((answers) => {
                    db.query('UPDATE employees SET role_id =? WHERE id =?', [answers.role_id, answers.employee_id], function (err, results) {
                        if(err) console.log(err);
                        console.log(results);
                        main_menu();
                    });
                });
            });
        }; 
    });
};
main_menu();
