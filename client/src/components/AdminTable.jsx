import React,{ useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from "axios";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { BrowserRouter as Router,Route,Link} from "react-router-dom";
import AddDeleteUser from './AddDelete';
import Request from './Request';
function AdminTbale(props){
const [tableItems,setTableItem]=useState([])
const plantName= props.plant;
useEffect(() => {
  const fetchData = async () => {
    const result = await axios.get(
      '/'+plantName+'/get', 
    );
    setTableItem(result.data);
  };
  fetchData();
  // eslint-disable-next-line
}, []);
const [isRequests,setIsRequests]=useState()
function handlRequest(e){
  setIsRequests(e);
}
function handlClick(){
  setIsRequests(true);
}
const theme = createMuiTheme({
    overrides: {
      MuiTablePagination: {
        toolbar: { 
          fontSize: "1.5rem"
        },
        selectIcon:{
          width: "18px !important",
          height: "18px !important"
        },
        menuItem:{
          fontSize:"1.5rem"
        },
        actions:{
          backgroundColor:"red",
          fontSize:"1.5rem"
        }
      }
    }
  });
return  <div className="container">
  <Router>
  <Link onClick={handlClick} role="button" to="/request" style={{color:"black",fontSize:"2.25rem"}}>Show Orders List</Link>
  <Route path="/request">
    <Request plantName={plantName} isRequests={isRequests} request={handlRequest} />
   </Route>
  </Router>
 { !isRequests && 
 <div> 
 <AddDeleteUser />
 <ThemeProvider theme={theme}>
<MaterialTable
title="Stock list "
columns={[ 
    {title: "Name", field: "name"},
    {title: "Quantity", field: "stock", type:"numeric"},
    {title: "Contract", field: "contract"},
    {title: "Reference", field: "reference"},
    {title: "Description", field: "description"},
    {title: "Location", field: "location"}
]}
data={tableItems}
options={{
  search : true,
  headerStyle:{
    backgroundColor: 'black',
    color: '#FFF',
    fontSize: "1.5rem",
    position: 'sticky', top: 0
  },
  maxBodyHeight: '650px',
  cellStyle:{
    fontSize: "1.5rem"
  },
  rowStyle: {
    backgroundColor:"#EEE",
  },
  searchFieldStyle:{
    fontSize: "1.5rem"
  }

}}
editable={{ 
  onRowAdd: newData =>
  new Promise(resolve => {
    setTimeout(() => {
       axios.post("/"+plantName+"/add",newData)
       .then(res=>
         setTableItem(prevTable =>{
             return [...prevTable,res.data]

         })
        );
       resolve();
       
    }, 1000);
  }),
  onRowUpdate: (newData, oldData) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
      if (oldData) {
          axios.post("/"+plantName+"/update",newData)
         .then(res=>
               setTableItem(res.data))
      }
    }, 600);
  }),
  onRowDelete: oldData =>
    new Promise((resolve) => {
        setTimeout(() => {
                axios.post("/"+plantName+"/delete",oldData)
               .then(res=> 
               setTableItem(res.data))
            resolve();
        }, 1000);
    })
 
}}
/>
</ThemeProvider>
</div>}
</div> 
}
export default AdminTbale;