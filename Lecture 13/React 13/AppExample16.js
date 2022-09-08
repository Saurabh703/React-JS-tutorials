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
    return(
        <h3>Whatsup</h3>
    )
   
}
export default AppExample9;
