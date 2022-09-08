const express = require('express');
const app =  express();
const oracle = require('oracledb');

class Student{
    constructor(id,name,company,salary,placementType){
        this.id = id;
        this.name = name;
        this.company = company;
        this.salary = salary;
        this.placementType = placementType;
    }
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getCompany(){
        return this.company;
    }
    getSalary(){
        return this.salary
    }
    getPlacementType(){
        return this.placementType;
    }
}

app.get('/placement', async function(request,response){
    var connection = [];
    connection = await oracle.getConnection({
        "user":"hr",
        "password":"hr",
        "connectionString":"localhost:1521/xepdb1"
    });

    var student = [];
    var resultSet  = await connection.execute("select * from student");

    resultSet.rows.forEach(function(row){
        var id = row[0];
        var name = row[1].trim();
        var job_type = row[2]
        var company = row[3].trim();
        var salary = row[4];
        var salary_type = row[5];
        var placementType;
        if (job_type=="F") {
            placementType =  "Full-Time"
        }else if (job_type=="I") {
            placementType = "Internship"
        }

        if (salary_type == 'Y') {
            if (salary>990000) {
                salary = (salary/100000) + " lac per annum"; 
            }else{
                salary = salary + " per annum";
            }
        }
        if(salary_type=='M'){
            if (salary>990000) {
                salary = (salary/100000) + " lac per month";
            }
            else{
                salary = salary + " per month";
            }
        }

        student.push(new Student(id,name,company,salary,placementType));
    })
    response.send(student);
})

app.listen(5050,function(err){
    if (err) {
        console.log(err);
    }
    console.log("Server is ready to request on port 5050")
})