const express = require('express');
const app = express();
const oracle = require('oracledb');

class Students {
  constructor(id, name, job, company, salary, salarytype) {
    this.id = id;
    this.name = name;
    this.job = job;
    this.company = company;
    this.salary = salary;
    this.salarytype = salarytype;
  }
  getId() 
  {
    return this.id;
  }
  getName() 
  {
    return this.name;
  }
  getJob() 
  {
    if(this.job=="F"){
      return this.job=="Full-Time";
    }
    else if(this.job=="I"){
      return this.job=="Internship";
    }
    return this.job;
  }
  getCompany() 
  {
    return this.company;
  }
  getSalary() 
  {
    return this.salary;
  }
  getSalaryType() 
  {
    return this.salarytype;
  }
}

app.get("/placement", async function (request, response) {
  var connection = null;
  connection = await oracle.getConnection({
    // we are passing the json object's reference
    user: "hr",
    password: "hr",
    connectionString: "localhost:1521/xepdb1",
  });
  var students = [];
  var resultSet = await connection.execute(
    "select id, name, job_type, company,salary,salary_type from student"
  );

  resultSet.rows.forEach(function(row) {
    students.push(new Students(row[0], row[1], row[2], row[3], row[4], row[5]));
  });
  response.send(students);
});

app.listen(5050, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("Server is ready to request on port 5050");
});
