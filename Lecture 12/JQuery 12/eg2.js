const express = require('express');
const app=express();
const oracle = require('oracledb');
const port=3000;

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