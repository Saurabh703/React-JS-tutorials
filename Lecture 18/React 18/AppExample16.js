import React, { useState } from 'react'
import progress from './Loader Gif.gif';

const addPlacement = (student) => {
var promise = new Promise((resolve)=>{
var dataString=`id=${student.id}&name=${encodeURIComponent(student.name)}&placementType=${student.placementType}&company=${encodeURIComponent(student.company)}&salary=${student.salary}&salaryType=${student.salaryType}`;
//alert(dataString);
fetch("/addPlacement",{
"method":"POST",
"header": {
"Content-Type":"application/x-www-form-urlencoded"
},
"body": dataString
})
.then((response)=>{ 
return response.json();
})
.then((responseJSON)=>{
resolve(responseJSON);
});
});
return promise;
}

const getStudent = () =>{
    const promise = new Promise((resolve)=>{
        fetch("/placement").then((response) => { return response.json(); })
        .then((student) => {
            resolve(student);
        });
    });
    return promise;
}

const AppExample16 = () => {
    const [activeMode, setActiveMode] = React.useState("view");
    const [students, setStudents] = React.useState([]);

    React.useEffect(()=>{
        getStudent().then((s)=>{
            setStudents(s);
        })
    })

    const onItemBarSelected = (item) =>{
        if (item==="add") { setActiveMode("add") }
        if (item==="cancel") { setActiveMode("view") }
    }
    
    const onStudentAdded=(student)=>{
if(student.placementType=="F") student.placementType="Full Time";
else if(student.placementType="I") student.placementType="Internship";
if (student.salary_type == 'Y') {
            if (student.salary>990000) {
                student.salary = (student.salary/100000) + " lac per annum"; 
            }else{
                student.salary = student.salary + " per annum";
            }
        }
        if(student.salary_type=='M'){
            if (student.salary>990000) {
                student.salary = (student.salary/100000) + " lac per month";
            }
            else{
                student.salary = student.salary + " per month";
            }
        }


	students.push(student);
} 

const setViewMode = () => {
setActiveMode("view");
};

    return (
        <div>
           <h1>Thinking Machines</h1><hr/>
           <ToolBar mode={activeMode} onItemSeleted={onItemBarSelected}/> 
           {activeMode==="view" && <StudentViewComponent students={students}/>}
           {activeMode==="add" && <StudentAddCompopnent onStudentAdded={onStudentAdded} onDismiss={setViewMode}/>}
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

const StudentViewComponent = ({students}) =>{
    return (
        <>
        <h3>Placements</h3>
        <hr/>
            {
                students.map((student)=>{
                    return(
                        <div key={student.id}>
                            Name : {student.name} <br/>
                            Company : {student.company} ({student.placementType})<br/>
                            Package : {student.salary}
                            <hr/>
                        </div>
                    )
                })
            }
    </>
    )
    
}

const StudentAddCompopnent = ({onStudentAdded,onDismiss}) => {

    const [displayWhat, setDisplayWhat] = React.useState("formSection");

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

    const [formError,setFormError] = React.useState("");

    const idChanged =  (ev) => {
        setId(ev.target.value);
    }

    const nameChanged = (ev) =>{
        setName(ev.target.value);
        setNameError("");
    }

    const companyChanged = (ev) =>{
        setCompany(ev.target.value);
        setCompanyError("");
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
	setFormError("");
        setIdError("");
        setNameError("");
        setCompanyError("");
        setSalaryError("");
    }

    const clearForm=()=> {
	setId(0);
	setName("");
	setPlacementType("F");
	setFullTimeChecked("checked");
	setInternshipChecked("");
	setCompany("");
	setSalary(0);
	setSalaryType("Y");
}

const yesHandler=()=> {
setDisplayWhat("formSection");
};

const noHandler=()=> {
onDismiss();
};

    const addClickHandler = () =>{
        clearAllErrors();
        //alert(id+","+name+","+company+","+salary+","+salaryType+","+placementType)   
var hasErrors=false;
  //validation part starts here   
if(id=="" || id<=0)
{ 
setIdError(" * ");
hasErrors = true;
}
        if(name=="") 
{ 
setNameError(" * ");
hasErrors = true;
};
        if(company=="") 
{ 
setCompanyError(" * ");
hasErrors = true;
};
        if(salary=="" || salary<=0) 
{
setSalaryError(" * ");
hasErrors = true;
}
//validation ends here
if(hasErrors==true) return;
var student={
"id":id,
"name":name,
"placementType":placementType,
"company":company,
"salary":salary,
"salaryType": salaryType
};
setDisplayWhat("processingSection");

addPlacement(student).then((responseJSON)=>{
if(responseJSON.success==true)
{
 //alert('Placement entry added');
 onStudentAdded(student);
 clearForm();
 setDisplayWhat("addMoreSection");
}
else
{
setFormError(responseJSON.error);
setDisplayWhat("formSection");
}
})
}

if(displayWhat === "addMoreSection") return(
<div>
Add More ?<br/>
<button type='button' onClick={yesHandler}>YES</button>&nbsp;&nbsp;&nbsp;
<button type='button' onClick={noHandler}>NO</button>
</div>
)

if(displayWhat==="processingSection")return(
<div>
<img src={progress}/>
</div>
)
    return(
        <div>
        <h1>Add a placement entry</h1>
	<div style={{color: 'red'}}>{formError}</div>
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
export default AppExample16;
