import React from 'react';
import MaterialTable from 'material-table';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
export default function LangSelection() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Language', field: 'lang' },
     
    ],
    data: [
      { lang: 'English'},
      { lang: 'French'},
      { lang: 'German'},
     
    ],
  });
  const theme = createMuiTheme({
    palette: {
        backgroundColor: "#266199",
    },
});
  return (
    <MuiThemeProvider theme={theme}>
      <Box   
   >
    <MaterialTable    
   
      title="Languages"
      columns={state.columns}
      data={state.data}
      options={{actionsColumnIndex: -1}}
      // detailPanel={[
      //   {
      //     tooltip: 'Show Name',
      //     render: rowData => {
      //       return (
      //         <div
      //           style={{
      //             fontSize: 100,
      //             textAlign: 'center',
      //             color: 'white',
      //             backgroundColor: '#43A047',
      //           }}
      //         >
      //           {rowData.name}
      //         </div>
      //       )
      //     },
      //   },
      //   {
      //     icon: 'account_circle',
      //     tooltip: 'Show Surname',
      //     render: rowData => {
      //       return (
      //         <div
      //           style={{
      //             fontSize: 100,
      //             textAlign: 'center',
      //             color: 'white',
      //             backgroundColor: '#E53935',
      //           }}
      //         >
      //           {rowData.surname}
      //         </div>
      //       )
      //     },
      //   }]}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
     
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
      actions={[
        {
          icon: 'add',
          tooltip: 'Assign to Hotel',
          onClick: (event, rowData) => alert("You saved " + rowData.name)
        }
      ]}
     
    />
    </Box>
    </MuiThemeProvider>
  );
}



// /**Rendering of ThirdPartyServices component
//  * Handling the mui datatable and data
//  * Redux and saga implementation needs to be done. (Commented as of now)
// */

// //import basic react, redux required files 
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// // import { getAllDevices } from '../../actions/devices';
// import { Link } from "react-router-dom";
// import CustomToolbar from "./CustomToolbarLang";

// //Importing Material UI files as per need
// import MUIDataTable from "mui-datatables";
// import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import Button from '@material-ui/core/Button';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
// import Switch from '@material-ui/core/Switch';

// const contentBox = {
//   flex: 0
// };

// const deleteHandler = () => {
//   // window.alert(data[1].services + ' deleted');
// };

// //Static data supplied 
// let data = [
//   { lang: "English" },
//   { lang: "Spanish" },
//   { lang: "Mandarin" },
// ];

// //Properties of each column
// const columns = [
//   {
//     name: 'lang',
//     label: 'Language',
//     options: {
//       filter: true,
//       sort: true,
//       print: false,
//       download: true,
//     }
//   },
//   {
//     name: "Actions",
//     options: {
//       filter: false,
//       sort: false,
//       customBodyRender: () => {
//         return (
//           <span>

//             <DeleteIcon style={{ color: "#7C7C7D" }} onClick={deleteHandler} />
//           </span>
//         );
//       }
//     }
//   },
// ];


// //Render class of LangSelection Component

// class LangSelection extends Component {
//   constructor(props) {
//     super(props);
//   }

//   //Customising the UX of Mui Datatable
//   getMuiTheme = () =>
//     createMuiTheme({
//       typography: {
//         useNextVariants: true,
//         suppressDeprecationWarnings: true,
//       },
//       overrides: {
//         MUIDataTableToolbar: {
//           root: {
//             backgroundColor: "#E4E4E4"
//           },
//         },
//         MuiTablePagination: {
//           input: {
//             backgroundColor: "#FFFFFF",
//             margin: "1%",
//             width: "5%"
//           }
//         },
//         MUIDataTableBodyCell: {
//           root: {
//             backgroundColor: "#F9FAFC",

//           }
//         },
//         MUIDataTableHeadCell: {
//           fixedHeader: {
//             backgroundColor: "#D0D5DC",
//             zIndex: "0"
//           },
//           data: {
//             fontSize: "16px",
//             lineHeight: "20px",
//             color: "#212630"
//           },
//           sortAction: {
//             fontSize: "16px",
//             lineHeight: "20px",
//             color: "#212630"
//           }
//         },
//         MuiTable: {
//           root: {
//             backgroundColor: "#E4E4E4"
//           }
//         },
//         MuiPaper: {
//           elevation4: {
//             boxShadow: "none"
//           },
//           root: {
//             backgroundColor: "none",
//           }
//         },
//         MUIDataTable: {
//           paper: {
//             width: "170%"
//           },
//         },
//         MuiTableCell: {
//           root: {
//             color: "#4E4E4E"
//           }
//         },
//       }
//     });


//   render() {

//     //Customise mui datatable with options
//     // Refer to https://github.com/gregnb/mui-datatables for the entire list

//     const options = {
//       selectableRows: "none",
//       filterType: 'checkbox',
//       print: false,
//       download: false,
//       viewColumns: false,
//       textLabels: {
//         pagination: {
//           rowsPerPage: "Items per Page:",
//         }
//       },
//       //Using Custom toolbar designed in CustomToolbarLang.js
//       customToolbar: () => {
//         return (
//           <CustomToolbar />
//         );
//       }
//     };

//     //MUIDataTable rendering
//     return (
//       <MuiThemeProvider theme={this.getMuiTheme()}>
//         <MUIDataTable
//           title={""}
//           data={data}
//           columns={columns}
//           options={options}

//         />
//       </MuiThemeProvider>
//     )
//   }
// }

// const mapStateToProps = (state) => ({
//   devices: state.devices,
// });

// const mapDispatchToProps = {
//   // getDevices: getAllDevices,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LangSelection);