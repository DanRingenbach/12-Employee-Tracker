const mysql = require('mysql');
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
    viewAllEmployees();
});






function viewAllEmployees() {
    const query = `SELECT employees.id, employees.first_name, employees.last_name, role.title, department.department AS department
    FROM employees
    INNER JOIN role ON (role.id = employees.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    `;
    connection.query(query, (err, data) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(data);
        // prompt();
    });
}
