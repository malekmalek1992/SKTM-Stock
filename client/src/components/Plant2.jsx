import React from 'react';
import AdminTbale from "./AdminTable";
import NormalTbale from "./NormalTable";

function Plant2 (props){
    
    return (
    <div className="container " style={{marginLeft: "7.5%"}}>
     {props.user ?  
     <div> 
         <AdminTbale plant ={"plant2"}/>
    </div>
           : <NormalTbale plant ={"plant2"} />}      
    </div>)
  
};
export default Plant2    