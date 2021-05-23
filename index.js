const inquirer = require('inquirer');
const mysql = require('mysql');
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

const message = {
    viewAllEmployees: 'View All Employees',
    viewDepartments: 'View Departments',
    viewRoles: 'View Roles',
    addRole: 'Add Role',
    addEmployee: 'Add an Employee',
    addDept: 'Add a Department',
    updateRole: 'Update an employees role',
    quit: 'Quit'
}

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    
    inquirerPrompt();
});

function inquirerPrompt() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What action would you like to perform?',
        choices: [
            message.viewAllEmployees,
            message.viewDepartments,
            message.viewRoles,
            message.addRole,
            message.addEmployee,
            message.addDept,
            message.updateRole,
            message.quit,
        ]
    })
        .then(answer => {
            switch (answer.action) {
                case message.viewAllEmployees:
                    viewAllEmployees();
                    break;
                case message.viewDepartments:
                    viewDepartments();
                    break;
                case message.viewRoles:
                    viewRoles();
                    break;
                case message.addRole:
                    addRole();
                    break;
                case message.addEmployee:
                    addEmployee();
                    break;
                case message.addDept:
                    addDept();
                    break;
                case message.updateRole:
                    updateRole();
                    break;
                case message.quit:
                    quit();
                    break;

            }

        })
};


function viewAllEmployees() {
    const query = `SELECT employees.id, employees.first_name, employees.last_name, role.title, department.department AS department
    FROM employees
    LEFT JOIN role ON employees.role_id = role.id  
    LEFT JOIN department ON role.department_id = department.id
    `;
    connection.query(query, (err, data) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(data);
        console.log('\n');
        inquirerPrompt();
    });
}

function viewDepartments() {
    const query = `SELECT * FROM department`;
    connection.query(query, (err, data) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW DEPARTMENTS');
        console.log('\n');
        console.table(data);
        console.log('\n');
        inquirerPrompt();
    });
}

function viewRoles() {
    const query = `SELECT * FROM role
    LEFT JOIN department ON role.department_id = department.id`;
    connection.query(query, (err, data) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ROLES');
        console.log('\n');
        console.table(data);
        console.log('\n');
        inquirerPrompt();
    });
}


function addRole() {
    var deptChoices = []
    var deptQuery = `SELECT * FROM department`
    connection.query(deptQuery, (err, data) => {
        if (err) throw err;
        deptChoices = data.map(({ id, department }) => (
            {
                name: department,
                value: id
            }
        ))

        inquirer.prompt([
            {
                name: 'role',
                type: 'input',
                message: 'What role would you like to add?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role?'
            },
            {
                name: 'department',
                type: 'list',
                message: 'What department does this role belong to?',
                choices: deptChoices
            }
        ])
            .then((answers) => {
                
                const roleQuery = `INSERT INTO role (title, salary, department_id) VALUES ('${answers.role}',${answers.salary},${answers.department})`
                connection.query(roleQuery, (err) => {
                    if (err) throw err;
                    console.log('ROLE ADDED')
                    inquirerPrompt();
                })
            })
    });
}
function addEmployee() {
    var roleChoices = []
    var managerChoices = []
    var managerQuery = `SELECT * FROM employees`
    var query = `SELECT * FROM role`
    connection.query(query, (err, data) => {
        if (err) throw err;
        roleChoices = data.map(({ id, title }) => (
            {
                name: title,
                value: id
            }
        ))

    });

    connection.query(managerQuery, (err, data) => {
        if (err) throw err;
        managerChoices = data.map(({ id, first_name, last_name }) => (
            {
                name: first_name + last_name,
                value: id
            }
        ))
        managerChoices.push({ name: 'none', value: null })
        

        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'What is the first name of the employee?'
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'What is the last name of the employee?'
            },
            {
                name: 'role_id',
                type: 'list',
                message: 'What is the employess role?',
                choices: roleChoices
            },
            {
                name: 'manager_id',
                type: 'list',
                message: 'Who is this employees manager?',
                choices: managerChoices

            }
        ])
            .then((answers) => {
                console.log(answers)
                const employeeQuery = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}','${answers.last_name}',${answers.role_id},${answers.manager_id})`
                connection.query(employeeQuery, (err) => {
                    if (err) throw err;
                    console.log('EMPLOYEE ADDED')
                    inquirerPrompt();
                })
            })


    })

}

function addDept() {
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'What department would you like to add?'
        }
    ])
        .then((answers) => {
            const deptQuery = `INSERT INTO department (department) VALUES ('${answers.department}')`
            connection.query(deptQuery, (err) => {
                if (err) throw err;
                console.log('DEPARTMENT ADDED')
                inquirerPrompt();
            })
        })
}

function updateRole() {
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'What is the employees ID?'
        }
    ])
        .then((answers) => {
            connection.query('SELECT role.id, role.title FROM role ORDER BY role.id;', async (err, res) => {
                if (err) throw err;
                const { role } = await inquirer.prompt([
                    {
                        name: 'role',
                        type: 'list',
                        message: 'What is the employees new role?',
                        choices: () => res.map(res => res.title)
                    }
                ]);
                let roleId;
                for (const row of res) {
                    if (row.title === role) {
                        roleId = row.id;
                        continue;
                    }
                }
                connection.query(`UPDATE employees 
                SET role_id = ${roleId}
                WHERE employees.id = ${answers.id}`, async (err, res) => {
                    if (err) throw err;
                    console.log('\n')
                    console.log('ROLE UPDATED')
                    console.log('\n')
                    inquirerPrompt();
                
                })

            })
        })
}

function quit() {
    console.log('Goodbye')
    connection.end();
}