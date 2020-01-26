import React,{ useState} from 'react';
import axios from "axios";
function AddDelete (){
    const [employeeID,setEmployeeID]=useState("")
    const [userID,setUserID]=useState("")
    const [isExiste, setIsExiste]=useState(false)
    function adding(event){
        const name = event.target.value;
        setEmployeeID(name);
        
    }
    function add(event){
        const newUser ={
            name:employeeID
        }
        axios.post("http://localhost:5000/add",newUser)
       .then(res=>
         setIsExiste(res.data)
         )
         setEmployeeID("");
         event.preventDefault();
    };
    function deleting(event){
        const name = event.target.value;
        setUserID(name); 
    }
    function handlDelete (event){
        const user ={
            name:userID
        }
        axios.post("http://localhost:5000/userDelete",user)
       .then(res=>
         console.log(res.data)
         )
         setUserID("");
         event.preventDefault();
    }
    return <div>
        {isExiste && <h5> employee with the same ID existe </h5>}
       <div>
        <div className="input-group  mb-4 input-group-sm " style={{width: "25%", margin:"15px auto 15px 0"}}>
       <input className="form-control" name="employeeID" onChange ={adding} value={employeeID} placeholder="Employee ID" autoComplete="off" />
       <span className="input-group-btn">
        <button className="btn btn-success btn-sm" onClick={add}>Add Employee </button>
       </span>
       </div>
       <div className="input-group  mb-4 input-group-sm " style={{width: "25%", margin:"15px auto 15px 0"}}>
       <input className="form-control" name="userID" onChange ={deleting} value={userID} placeholder="User ID" autoComplete="off" />
       <span className="input-group-btn">
        <button className="btn btn-danger btn-sm" onClick={handlDelete}>Delete User </button>
       </span>
       </div>
      </div>
    </div>
}
export default AddDelete;