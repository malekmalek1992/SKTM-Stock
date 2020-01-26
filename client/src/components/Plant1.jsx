import React from 'react';
import AdminTbale from "./AdminTable";
import NormalTbale from "./NormalTable";

function Plant1 (props){
    return (
    <div className="container " style={{marginLeft: "7.5%"}}>
    {props.user ?
      <div> 
         <AdminTbale plant ={"plant1"}/>
    </div>
       : <NormalTbale plant ={"plant1"} /> 
    }
    </div>)
};
export default Plant1   