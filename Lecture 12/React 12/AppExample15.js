import React, { useState } from 'react';
import { useEffect } from 'react';

const AppExample15 = () => {
    const [title, setTitle] = React.useState("Think Big");
    const [something, setDoSomething] = useState("Something needs to be done");
    
    useEffect(() => {
        alert("cool");
    },[]); // replace with [] then [title] then [something] then [title, something]

    const changeTitle = () => {
        setTitle("We Teach More than we Promise to Teach");
    }
    const doSomething = () => {
        setDoSomething("whatever you can imagine");
    }
  return (
  <div>
      <h1>Thinking Machines</h1>
      <TitleComponent title={title} abcd={something} /><br/><br/>
      <button type='button' onClick={changeTitle}>Change Title</button><br/><br/>
      <button type='button' onClick={doSomething}> Change Something</button>
  </div>
  );
};

const TitleComponent = ({title, abcd}) => {
    return(
        <div>
            <h3>{title}</h3>
            <br/>
            <h3>{abcd}</h3>
        </div>
    )
}

export default AppExample15;
