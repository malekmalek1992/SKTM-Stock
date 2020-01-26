import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

function NavBar(props){
  const user ={
    username:"",
    password:""
}
  function handlClick(){
    axios.get("http://localhost:5000/logout")
    .then(res => props.logout(res.data,user))
  }
    return (
 <nav className="navbar navbar-default">
    <div className="container">
      <div className="navbar-header">
        <p className="navbar-brand">Stock items list</p>
      </div>
        <ul className="nav navbar-nav navbar-right">
          <li ><Link to="/">Home</Link></li>
          <li><Link to="/plant1">Plant 1</Link></li>
          <li ><Link to="/plant2">Plant 2</Link></li>
          <li ><Link to="/plant3">Plant 3</Link></li>
          {(props.admin1 || props.admin2) && 
          <li> <Link to="/order"> order </Link> </li>}
          <li ><button type="button" className="btn btn-danger" style={{marginTop :"10px"}} onClick = {handlClick} >logout</button> </li>
        </ul>
    </div>
  </nav>
    )
};
export default NavBar;
