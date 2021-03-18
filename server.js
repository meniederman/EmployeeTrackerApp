const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'departmentDB',
  });

  const start = () => {
      inquirer
      .prompt([
        {
name: 'whatAction',
type: 'list',
message: 'What action would you like to take with the employee tracker app?',
choices: ['View all employees', 'View all departments', 'View all roles', 'Add an employee', 'Add a department', 'Add a role', 'Update an employees role', 'EXIT']
        },
        ])

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
      let viewall_query = `SELECT * department 
      FROM department INNER JOIN SELECT
      employee ON (eRole.title = employee.role_id)
      FROM eRole
      INNER JOIN SELECT employee ON (department.depName = eRole.department_id);`
      
      connection.query(viewall_query,
          
          (err, res) => {
            if (err) throw err;
              console.table(res);
        
            });
          };
        


  const viewDepartments = () => {
    connection.query(
      `SELECT department.debName FROM department`,  (err, res) => {
        if (err) throw err;
        const value = (debName)
        res.forEach( value === TRUE)
    
           console.log(res);
    }
    )}


    const viewRole = () => {
        connection.query(
          `SELECT eRole.title FROM eRole`, (err, res) => {
            if (err) throw err;
            const value = (title)
              res.forEach (value === TRUE)
              console.log(res);
            });
          };

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
                  { first_name : answer.first,
                    last_name : answer.second,
                    salary : answer.money,
                    title : answer.position,
                    debName : answer.department
                  }, 
                  (err,database) => {if (err) console.log('Error Detected');
                  
                  database.forEach(answer).Console.table();
              
              


                  }




              )
              
          }
          )
      };

      const addRole = () => {
        inquirer.prompt({
            
            type: 'input',
            name: 'roleName',
            message: 'What is name of the role you wish to add?',
          
            
        })
        .then((answer) => {
            connection.query(
                { newRole : answer.roleName,
                  
                }, 
                (err) => {if (err) console.log('Error Detected');
                
                console.table(answer.roleName);




                }




            )
            
        }
        )
    }

    const addDepartment = () => {
      inquirer.prompt({
          
          type: 'input',
          name: 'dName',
          message: 'What is name of the department you wish to add?',
        
          
      })
      .then((answer) => {
          connection.query(
              { newRole : answer.dName,
                
              }, 
              (err) => {if (err) console.log('Error Detected');
              
              console.table(answer.dName);




              }




          )
          
      }
      )
  };

const updateRole = 
() => {
  inquirer.prompt([ {
            
    type: 'input',
    name: 'roleChange',
    message: 'What is last name of the employees role you wish to change?',
  
    
},

{
  type: 'input',
name: 'newPosition',
message: 'What is the updated role?',


},


])


.then((answer) => {
  connection.query(`Update employee where title=?` ,
      { newJob : answer.newPosition,
        
      }, 
      (err) => {if (err) console.log('Error Detected');
      
      console.table(answer.newPosition);




      }




  )
  
}
)





}




      connection.connect((err) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);
        start();
      }
      );
    