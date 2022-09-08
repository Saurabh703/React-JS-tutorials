import React, { useState } from 'react';

const getPlacements=()=>{
    const promise = new Promise((resolve)=> {
        // send code request to http://localhost:5050/placements
        fetch("/placements").then((response)=>{
            return response.json();
        }).then((employees)=> { resolve(employees); });
    });
    return promise;
}

const AppExample14=()=>{

    const [employees, setEmployees] = useState([]);
    const [title, setTitle] = useState("Think Big");

    React.useEffect(() => {
        const promise = getPlacements();
        promise.then((emps)=>{
            //alert(employees);
            setEmployees(emps);
        });
    },[])

    const changeTitle = () => {
        setTitle("Good Employees");
    }

    return(
    <div>
        <h1>Thinking Machines</h1>
        <TitleComponent title={title} />
        <button type='button' onClick={changeTitle}>Change Title</button>
        <EmployeesComponent employees={employees}/>
    </div>
    )
}

const EmployeesComponent =({employees}) => {
    return(
        <ul>
        {
            employees.map((employee) => {
                return(
                <li key={employee.id}>{employee.firstName} {employee.lastName}</li>
                )
            })
        }
        </ul>
    )
}

const TitleComponent = ({title}) => {
    return(
        <>
        <h3>{title}</h3>
        </>
    );
}

export default AppExample14;