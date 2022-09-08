import React, { useState } from 'react'

const getPlacement = () => {
    const promise = new Promise((resolve)=> {
        fetch("/placement").then((response)=> {
            return response.json();
        }).then((student)=>{ resolve(student); });
    });

    return promise;
}

const AppExample16 = () => {
    const [activeMode, setActiveMode] = React.useState("view");
    const [student, setStudent] = React.useState([]);

    const onItemBarSelected = (item) =>{
        if (item==="add") { setActiveMode("add") }
        if (item==="cancel") { setActiveMode("view") }
    }

    const Job =()=> {
        if(student.job=="F"){
            return "Full Time Job"
        } else if(student.job=="I"){
            return "Internship";
        }
    }
    
    React.useEffect(()=>{
        const promise = getPlacement().then((stdt)=>{
            alert(JSON.stringify(stdt))
            setStudent(stdt);
        })
    },[])

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
    const Job =()=> {
        if(student.job=="F"){
            return "Full Time Job"
        } else if(student.job=="I"){
            return "Internship";
        }
    }
    
    return(
        <>
            <h3>Placements</h3>
            <ul>
            {
                student.map((stdnt)=>{
                   return (
                    <li key={stdnt.id}>{stdnt.name} {stdnt.job} {stdnt.company} {stdnt.salary} {stdnt.salarytype}</li>
                        )
                })
            }
            </ul>
        </>

    )
    
}

const StudentAddCompopnent = () => {
    return(
        <h3>Whatsup</h3>
    )
   
}
export default AppExample16;
