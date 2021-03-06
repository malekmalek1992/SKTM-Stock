import React,{ useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from "axios";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
function NormalTable(props){
    const [tableItems,setTableItem]=useState([])
useEffect(() => {
  const fetchData = async () => {
    const result = await axios.get(
      '/'+props.plant+'/get',
    );
    setTableItem(result.data);
  };
  fetchData();
  // eslint-disable-next-line
}, []);
    const theme = createMuiTheme({
        overrides: {
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
return <div>
<ThemeProvider theme={theme}>
<MaterialTable
        title="Stock list"
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
          rowStyle: rowData => ({
                   backgroundColor: (rowData.tableData.id % 2) ? '#fbe3b9' : '#FFF'
          }),
          searchFieldStyle:{
            fontSize: "1.5rem"
          },
        }}
        components={{
    }}
        
        />
 </ThemeProvider>
 </div>
    
}
export default NormalTable;