const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'departmentDB',
  });

  const begin = () =>{
      inquirer
      .prompt({
name: 'whatAction',
type: 'list',
message: 'What action would you like to take with the employee tracker app?',
choices: ['View all employees', 'View all departments', 'View all roles', 'Add an employee', 'Add a department', 'Add a role', 'Update an employees role', 'EXIT']

      })

.then((answer) => {
    switch (answer.whatAction){
        case 'View all employees':
        viewAll();
        break;
       
            case 'View all departments':
            viewDepartments();
            break;

            case 'View all roles':
            viewRole();
            break;

            case 'Add an employee':
            addEmployee();
            break;

            case 'Add a department':
            addDepartment();
            break;

            case 'Add a role':
            addRole();
            break;

            case 'Update an employees role':
            updateRole();
            break;

            case 'EXIT':
            connection.end();
            break;

    }


});

  };

  const viewAll = () => {
      let viewall_query = `SELECT * FROM departments INNER JOIN eRole ON department.depName = eRole.department_id`;
      viewall_query += `FROM eRole INNER JOIN employee ON (eRole.title=employee.role_id)`;
      connection.query(viewall_query,
          
          (err, res) => {
            if (err) throw err;
              console.table(res);
        
            });
          };
        


  const viewDepartments = () => {
    connection.query(
      'SELECT * FROM departments WHERE depName=?', (err, res) => {
        if (err) throw err;
        
        if(res.rows.length > 0){
        res.forEach(({ depName}) => {
          console.log(`${depName}`);
        })
    }

    
  });


    const viewRole = () => {
        connection.query(
          'SELECT * FROM eRole WHERE title=?',
          (err, res) => {
            if (err) throw err;
            if(res.rows.length >0){
            res.forEach(({ title }) => {
              console.log(`${title}`);
            });
          };


      });
    }
      const addEmployee = () => {
          inquirer.prompt([
              {
              type: 'input',
              name: 'first',
              message: 'What is employees first name',
            
              },

              {
                type: 'input',
                name: 'second',
                message: 'What is employees last name',
              
                },

                {
                    type: 'input',
                    name: 'money',
                    message: 'What is employees salary',
                  
                    },
                    {
                        type: 'input',
                        name: 'position',
                        message: 'What is employees role',
                      
                        },

                        {
                            type: 'input',
                            name: 'depo',
                            message: 'What is employees department',
                          
                            }
  

          ])
          .then((answer) => {
              connection.query(
                  { firstName : answer.first,
                    lastName : answer.second,
                    salary : answer.money,
                    title : answer.position,
                    department : answer.department
                  }, 
                  (err,res) => {if (err) console.log('Error Detected');
                  res.forEach (answer === TRUE);
                  console.log(answer);




                  }




              )
              
          }
          )
      }





      connection.connect((err) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);
        begin();
      }
      );
    }