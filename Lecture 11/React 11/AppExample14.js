import React from 'react';

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
    const promise = getPlacements();
    promise.then((employees)=>{
        //alert(employees);
        alert(JSON.stringify(employees));
    })
    return(
    <div>
        <h1>Thinking Machines</h1>
    </div>
    )
}

export default AppExample14;