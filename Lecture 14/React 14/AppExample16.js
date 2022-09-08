import React, { useState } from 'react'

const getStudent = () =>{
    const promise = new Promise((resolve)=>{
        fetch("/placement").then((response) => { return response.json(); })
        .then((student) => {
            resolve(student);
        });
    });
    return promise;
}

const AppExample9 = () => {
    const [activeMode, setActiveMode] = React.useState("view");
    const [student, setStudent] = React.useState([]);

    React.useEffect(()=>{
        getStudent().then((s)=>{
            setStudent(s);
        })
    })

    const onItemBarSelected = (item) =>{
        if (item==="add") { setActiveMode("add") }
        if (item==="cancel") { setActiveMode("view") }
    }
 
    return (
        <div>
           <h1>Thinking Machines</h1><hr/>
           <ToolBar mode={activeMode} onItemSeleted={onItemBarSelected}/> 
           {activeMode==="view" && <StudentViewComponent student={student}/>}
           {activeMode==="add" && <StudentAddCompopnent />}
        </div>
    )
}

const ToolBar = ({mode, onItemSeleted}) =>{
    const takeAction=(ev)=>{
        onItemSeleted(ev.currentTarget.getAttribute("take_action"))
    }

    return(  
        <>
          {mode==="view" && <button onClick={takeAction} take_action="add">Add</button>}
          {mode==="add" && <button onClick={takeAction} take_action="cancel">Cancel</button>}
          <hr/>
          </>
    )
}

const StudentViewComponent = ({student}) =>{
    return (
        <>
        <h3>Placements</h3>
        <hr/>
            {
                student.map((students)=>{
                    return(
                        <div key={students.id}>
                            Name : {students.name} <br/>
                            Company : {students.company} ({students.placementType})<br/>
                            Package : {students.salary}
                            <hr/>
                        </div>
                    )
                })
            }
    </>
    )
    
}

const StudentAddCompopnent = () => {
    
    const [id,setId] = React.useState(0);
    const [idError, setIdError] = React.useState("");

    const [name,setName] = React.useState("");
    const [nameError, setNameError] = React.useState("");

    const [company,setCompany] = React.useState("");
    const [companyError, setCompanyError] = React.useState("");
    
    const [salary, setSalary] = React.useState(0);
    const [salaryError, setSalaryError] = React.useState("");

    const [salaryType,setSalaryType] = React.useState("Y");

    const [fullTimeChecked, setFullTimeChecked] = React.useState("checked");
    const [internshipChecked, setInternshipChecked] = React.useState("");
    const [placementType, setPlacementType] = React.useState("F");

    const idChanged =  (ev) => {
        setId(ev.target.value);
    }

    const nameChanged = (ev) =>{
        setName(ev.target.value.trim());
        setNameError("");
    }

    const companyChanged = (ev) =>{
        setCompany(ev.target.value.trim());
    }

    const salaryChanged=(ev)=>{
        setSalary(ev.target.value);
    }

    const salaryTypeChanged=(ev)=>{
        setSalaryType(ev.target.value);
    }

    const placementTypeChanged=(ev)=>{
       // alert(ev.target.value+","+ev.target.checked);
        if (ev.target.value=="F" && ev.target.checked) {
            setFullTimeChecked("checked");
            setInternshipChecked("");
            setPlacementType("F")
        }
        if (ev.target.value=="I" && ev.target.checked) {
            setFullTimeChecked("");
            setInternshipChecked("checked");
            setPlacementType("I");
        }
    }

    const clearAllErrors=()=> {
        setIdError("");
        setNameError("");
        setCompanyError("");
        setSalaryError("");
    }

    const addClickHandler = () =>{
        clearAllErrors();
        //alert(id+","+name+","+company+","+salary+","+salaryType+","+placementType)
        if(id=="" || id<=0) setIdError(" * ");
        if(name=="") setNameError(" * ");
        if(company=="") setCompanyError(" * ");
        if(salary=="" || salary<=0) setSalaryError(" * ");
    }

    return(
        <div>
        <h1>Add a placement entry</h1>

        <label htmlFor='id'>Id.</label>
        <input type='number' id='id' value={id} onChange={idChanged}/>
        <span style={{color: 'red'}}>{idError}</span>
        <br/>

        <label htmlFor='name'>Name</label>
        <input type='text' id='name' value={name} onChange={nameChanged}/>
        <span style={{color: 'red'}}>{nameError}</span>
        <br/>

        Placement Type
        <input type='radio' id='fullTime' name='placementType' checked={fullTimeChecked} value='F' onChange={placementTypeChanged}/>Full-Time
        &nbsp;&nbsp;&nbsp;
        <input type='radio' id='internship' name='placementType' checked={internshipChecked} value='I' onChange={placementTypeChanged}/>Internship
        <br/>

        <label htmlFor='company'>Company</label>
        <input type='text' id='company' value={company} onChange={companyChanged} />
        <span style={{color: 'red'}}>{companyError}</span>
        <br/>

        <label htmlFor='salary' >Salary</label>
        <input type='text' id='salary' value={salary} onChange={salaryChanged}/>
        <select id='salaryType' value={salaryType} onChange={salaryTypeChanged}>
            <option value='Y'>per annum</option>
            <option value='M'>per month</option>
        </select>
        <span style={{color: 'red'}}>{salaryError}</span>
        <br/>

        <button type='button' onClick={addClickHandler}>Add</button>
        </div>
    )
   
}
export default AppExample9;
