import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table'
import axios from "axios";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
function Request(props){
  const plantName = props.plantName
    const [orders,setOrders]=useState([])
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get(
            '/'+plantName+'/order',
          );
          setOrders(result.data);
        };
        fetchData();
        // eslint-disable-next-line
      }, []);
      function handlClick(){
        props.request(false)
      }
      const theme = createMuiTheme({
        overrides: {
          rowStyle: rowData => ({
            backgroundColor: (rowData.tableData.id % 2) ? '#fbe3b9' : '#FFF'
            }),
          MuiTypography:{
            caption:{
              fontSize: "1.5rem",
            }
          },
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

    return <div >
    { props.isRequests && 
    <div className="container ">
     <button className="btn btn-success btn-sm" style={{margin:"10px auto 10px 0"}} onClick = {handlClick}> Hide Orders Lists </button>
    <ThemeProvider theme={theme}>
    <MaterialTable
    title="Orders Lists"
    columns={[
      { title: 'From plant ', field: 'fromPlant' },
      { title: 'ID ', field: 'employeeID' },
      { title: '1st Item', field: 'name1' },
      { title: 'Quantity', field: 'quantity1' },
      { title: '2nd Item', field: 'name2' },
      { title: 'Quantity', field: 'quantity2' },
      { title: '3rd Item', field: 'name3' },
      { title: 'Quantity', field: 'quantity3' },
    ]}
    data={orders}   
    options={{
  search : true,
  headerStyle:{
    backgroundColor: '#192965',
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
    onRowDelete: oldData =>
    new Promise((resolve) => {
        setTimeout(() => {
                axios.post("/"+plantName+"/deleteOrder",oldData)
               .then(res=> 
                setOrders(res.data))
            resolve();
        }, 1000);
    })
   }}
  />
  </ThemeProvider>
</div>}
</div>
}
export default Request; 