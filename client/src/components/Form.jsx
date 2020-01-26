import React, { useState } from "react";
import axios from "axios";

function Form(props) {
    const [inputText,setInputText]=useState({
        username :"",
        password:""
    })
    const [isEmployee,setIsEmployee]=useState(true)
    function handlChange(event){
        const {name,value}=event.target
        setInputText(prevValue => {
            return {
                ...prevValue,
                [name]:value
            }
        })
        
    }
  
    function login(event){
        
        axios.post("http://localhost:5000/login",inputText)
        .then(res=> 
            props.login(res.data,inputText.username)
        //console.log(res.data) 
        )

    //   status = isRegistered;
        
    // console.log(isRegistered);
    setInputText({
        username :"",
        password:""
    })
    event.preventDefault();
    }
    function register(event){
    //console.log(inputText)
    axios.post("http://localhost:5000/register",inputText)
    .then(res=>{
        setIsEmployee(res.data)
        props.register(res.data)}
    
    );
    setInputText({
        username :"",
        password:""
    })
    event.preventDefault();  
    }
  return (
     <div className="login">
    <form className="form">
    { !isEmployee && <div>
            <h5>No employee with such an ID (REGISTER AGAIN)!</h5>
            <h5>Or you are alreday registered (login directly)!</h5>
    </div> }
    {props.isRegistered && <h4>Registred SUCCSESFULLY ! Now login  </h4>}
    {props.isIdentified && <h4>login </h4>}
      <input onChange= {handlChange} type="text" name="username" value ={inputText.username} placeholder="Employee ID" required />
      <input onChange= {handlChange} type="password" name="password" value ={inputText.password}  placeholder="Password" required/>
      <button onClick ={login} name="logIn" type="submit">Login</button>
      {!props.isRegistered &&
      <button onClick ={register} name ="register" type="submit">Register</button>}
    </form>
    </div>
  );
}

export default  Form;