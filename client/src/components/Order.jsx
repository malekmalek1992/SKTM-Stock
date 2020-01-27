import React, { useState } from 'react';
import axios from "axios";
function Order(props){
 const [itemsName,setItemsName]= useState({
  item1:"",
  quantity1:"",
  item2:"",
  quantity2:"",
  item3:"",
  quantity3:"",
 });
 const [isSubmitted,setIsSubmitted]=useState(false)
 function handelChange(event){
   const {name , value } = event.target;
   setItemsName(prevValue => {
      return {
        ...prevValue,
        [name]:value
      };
    });
 }
 function submit (event){
   var plantName = "";
   if(props.admin1){
     plantName="Plant 1"
   }else if(props.admin2){
    plantName="Plant 2"
   }
     const employeeID = props.user;
     const order ={
         fromPlant:plantName,
         toPlant:event.target.toPlant.value,
         employeeID : employeeID,
         item1:{
           name:itemsName.item1,
           quantity:itemsName.quantity1
         },
         item2:{
           name:itemsName.item2,
           quantity:itemsName.quantity2
        },
        item3:{
          name:itemsName.item3,
          quantity:itemsName.quantity3
        },
     }
     axios.post("/order",order)
     .then(res=>
     setIsSubmitted(res.data));
     setItemsName({
      item1:"",
      quantity1:"",
      item2:"",
      quantity2:"",
      item3:"",
      quantity3:""
    });
     event.preventDefault();
 }
 function handlClick(){
   setIsSubmitted(false);
 }

return <div className="container order">
  
<form onSubmit={submit} style={{backgroundColor:"#fff"}}>
{!isSubmitted ?
<div>
  <h2>Order form</h2>
  <div className="input-group form-group">
    <label >To (Plant name) :  </label>
    <select name="toPlant" className="form-control" >
    {!props.admin1 && <option value="Plant1">Plant 1</option>} {/* to exclude plant 1  from options if admin from plant 1 is making the order */}
    {!props.admin2 && <option value="Plant2">Plant 2</option>} 
    <option value="Plant2">Plant 3</option>
    {/*number of options depends on the number of plants */}
    </select>
  </div>
 
 
<div className="input-group form-row" > 
  <div className="form-group col-md-9 " style={{paddingLeft: "0px"}}>
    <label >Item 1 name</label>
    <input type="text" className="form-control" name="item1" onChange={handelChange} value={itemsName.item1} required />
  </div>
  <div className="form-group col-md-3 ">
    <label >Quantity</label>
    <input type="text" className="form-control" name="quantity1" onChange={handelChange} value={itemsName.quantity1}required />
  </div>
</div>

  <div className="form-row form-group input-group" > 
  <div className="form-group col-md-9" style={{paddingLeft: "0px"}}>
    <label >Item 2 name</label>
    <input type="text" className="form-control" name="item2" onChange={handelChange} value={itemsName.item2} />
  </div>
  <div className="form-group col-md-3">
    <label >Quantity</label>
    <input type="text" className="form-control" name="quantity2" onChange={handelChange} value={itemsName.quantity2} />
  </div>
  </div>

  <div className="form-row form-group input-group" > 
  <div className="form-group col-md-9" style={{paddingLeft: "0px"}}>
    <label >Item 3 name</label>
    <input type="text" className="form-control" name="item3"  onChange={handelChange} value={itemsName.item3}  />
  </div>
  <div className="form-group col-md-3">
    <label >Quantity</label>
    <input type="text" className="form-control" name="quantity3" onChange={handelChange} value={itemsName.quantity3}  />
  </div>
  </div>

  <button type="submit" className=" form-group  btn  btn-success btn-sm" style={{marginRight :"2.5%"}}> Submit order </button>
   </div> : <div>
     <h2 style={{color:"green"}}> Submitted Succecsully </h2>
     <button className=" form-group  btn  btn-success btn-sm" onClick={handlClick}> submit an other order </button>
     </div>}
</form>
</div>
}
export default Order;