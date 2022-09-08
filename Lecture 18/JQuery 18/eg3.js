const express = require('express');
const app=express();
const oracle = require('oracledb');
const bodyParser=require('body-parser');
const port=3000;

const urlEncodedBodyParser = bodyParser.urlencoded({extended:false});

class Department
{
 constructor(id, name)
   {
	this.id = id;
	this.name= name;
   }
   getId(){
   return this.id;
 }
   getName(){
    return this.name;
  }
}
class Employees
{
  constructor(id,firstName,lastName)
  {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
  getId()
  {
    return this.id;
  }
  getFirstName()
  {
    return this.firstName;
  }
  getLastName()
  {
    return this.lastName;
  }
}

app.use(express.static("learn"));
app.get("/", function(request, response) {
response.redirect("/index.html");
});

app.get('/getFirstNames',urlEncodedBodyParser, async function(request,response){
  var connection = null;
  connection = await oracle.getConnection({
    "user":"hr",
    "password":"hr",
    "connectString":"localhost:1521/xepdb1"
  })

  var firstNamePattern = request.query.firstNamePattern;
 
  var resultSet = await connection.execute(`select distinct first_name from employees where lower(first_name) like '${firstNamePattern}%' order by first_name`)
  var firstName = [];
  var fn;
  var i = 0;
  while(i<resultSet.rows.length){
    fn = resultSet.rows[i][0];
    firstName.push(fn);
    i++;
  }
  await connection.close();
  response.send(firstName);
})

app.get("/getEmployees", async function(request, response){
  var connection=null;
  connection=await oracle.getConnection({
      "user": "hr",
      "password": "hr",
      "connectString": "localhost:1521/xepdb1"
  });

  var resultSet = await connection.execute("select employee_id,first_name,last_name from employees");
    
    var emps = [];
    var id, firstName, lastName;
    var emp;
        var i = 0;
        while (i<resultSet.rows.length) 
        {
           id  = resultSet.rows[i][0];
           firstName = resultSet.rows[i][1];
           lastName = resultSet.rows[i][2];
           emp = new Employees(id, firstName,lastName);
           emps.push(emp);
        i++;        
      }

      await connection.close();
      response.send(emps);
});

app.get("/getDepartments", async function(request, response){
  var connection=null;
  connection=await oracle.getConnection({
      "user": "hr",
      "password": "hr",
      "connectString": "localhost:1521/xepdb1"
  });

  var resultSet = await connection.execute("select department_id,department_name from departments order by department_name");
    
    var departments = [];
    var department;
    var id, name;
    var emp;
        var i = 0;
        while (i<resultSet.rows.length) 
        {
           id  = resultSet.rows[i][0];
           name = resultSet.rows[i][1];
           department = new Department(id,name);
           departments.push(department);
        i++;        
      }

      await connection.close();
      response.send(departments);
});

app.get('/getEmployeesByDepartment',urlEncodedBodyParser, async function(request,response){
  var connection = null;
  connection = await oracle.getConnection({
    "user":"hr",
    "password":"hr",
    "connectString":"localhost:1521/xepdb1"
  })

  var departmentId = parseInt(request.query.departmentId);
  
  var resultSet = await connection.execute(`select  employee_id,first_name,last_name from employees where department_id=${departmentId} order by first_name,last_name`);

  var employees = [];
  var id,firstName,lastName;
  var i = 0;
  while(i<resultSet.rows.length){
    id = resultSet.rows[i][0];
    firstName = resultSet.rows[i][1];
    lastName = resultSet.rows[i][2];
    employee = new Employees(id,firstName,lastName)
    employees.push(employee);
    i++;
  }
  await connection.close();
  response.send(employees);
})


app.get("/employees", async function(request, response){
    var connection=null;
    connection=await oracle.getConnection({
        "user": "hr",
        "password": "hr",
        "connectString": "localhost:1521/xepdb1"
    });

    var resultSet = await connection.execute("select employee_id,first_name,last_name from employees");
    var html="";
    html=html+"<!DOCTYPE HTML>";
    html=html+"<html>";
    html=html+"<head>";
    html=html+"<meta charset='utf-8'>";
    html=html+"        <title>HR - Application</title>";
    html=html+"        <style>";
    html=html+"            table {";
    html=html+"                border: 1px solid black;";
    html=html+"               border-collapse: collapse;";
    html=html+"            }";
    html=html+"            table th,td{";
    html=html+"                border: 1px solid black;";
    html=html+"    }";
    html=html+"        </style>";
    html=html+"</head>";
    html=html+"<body>";
    html=html+"    <h1>Employees</h1>";
    html=html+"    <table>";
    html=html+"        <thead>";
    html=html+"            <tr>";
    html=html+"                <th>S.No.</th>";
    html=html+"                <th>Id.</th>";
    html=html+"                <th>First Name</th>";
    html=html+"                <th>Last Name</th>";
    html=html+"            </tr>";
    html=html+"        </thead>";
    html=html+"        <tbody>";
          var i = 0;
          while (i<resultSet.rows.length) 
          {
            html=html+"  <tr>";
            html=html+"      <td>";
            html=html+(i+1);
            html=html+"      </td>";
            html=html+"      <td>";
            html=html+resultSet.rows[i][0];
            html=html+"      </td>";
            html=html+"      <td>";
            html=html+resultSet.rows[i][1];
            html=html+"      </td>";
            html=html+"      <td>";
            html=html+resultSet.rows[i][2];
            html=html+"      </td>";
            html=html+"  </tr>";
          i++;        
        }
        html=html+"</tbody>";
        html=html+"</table>";

        html=html+"<a href='/index.html'>Home</a>";
        html=html+"</body>";
        html=html+"</html>";

        await connection.close();
        response.send(html);
});

app.listen(port, function(error){
if(error)
{
console.log(`Some problem ${error}`);
}
console.log(`Server is ready to accept request on port ${port}`);
});