//Icon style designing

import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
export const getMuiTheme = createMuiTheme({
   palette: {
      backgroundColor: '#266199',
   },

   overrides: {
      MUIDataTable: {
         paper: {
            // margin: '1%',
            // width: "90%"
            boxShadow: 'none',
         },
      },
      MuiTypography: {
         h6: {
            fontWeight: 'bold',
         },
      },
      MUIDataTableFilter:{
         root:{
            width:'385px',
            height:'300px',
         },
      },
      MUIDataTableToolbar: {
         root: {
            backgroundColor: '#F9FAFC',
         },
         data: {
            fontWeight: 'bold',
            // fontSize: '14px',
            // textDecoration: 'underline',
            lineHeight: '20px',
            color: '#212630',
         },
      },
      MuiTablePagination: {
         input: {
            backgroundColor: '#FFFFFF',
            margin: '1%',
            width: '5%',
         },
      },
      MUIDataTableBodyCell: {
         root: {
            // backgroundColor: '#F9FAFC',
            // align: 'center',
            // textAlign: 'center',
         },
      },
      MUIDataTableHeadCell: {
         root: {
            // borderBottom: '1px solid  blue',
            '&:nth-child(n)': {
               backgroundColor: '#D0D5DC',

               // textAlign: 'center',
            },
         },
         data: {
            fontWeight: 'bold',
            fontSize: '14px',
            // textDecoration: 'underline',
            lineHeight: '20px',
            color: '#212630',
         },
         sortAction: {
            fontSize: '16px',
            lineHeight: '20px',
            color: '#212630',
         },
      },
      // MuiTable: {
      //    root: {
      //       backgroundColor: "#E4E4E4",
      //    },
      // },
      MuiPaper: {
         // elevation4: {
         //    boxShadow: "none",
         // },
         // root: {
         //   backgroundColor: "none",
         // }
      },
      MuiTableCell: {
         head: {
            fontWeight: 'bold',
         },
      },
   },
});
export const CustomToolbarStyle = {
   iconButton: {
      color: '#045FB4',
      fontWeight: 'bold',
      backgroundColor: '#CFD9E3',
   },
};

export const textLabels = {
   body: {
      noMatch: 'No matching items to display',
      toolTip: 'Sort',
      columnHeaderTooltip: (column) => `Sort for ${column.label}`,
   },
   pagination: {
      next: 'Next Page',
      previous: 'Previous Page',
      rowsPerPage: 'Items per page:',
      displayRows: 'of',
   },
   toolbar: {
      search: 'Search',
      downloadCsv: 'Download CSV',
      print: 'Print',
      viewColumns: 'View Columns',
      filterTable: 'Filter Table',
   },
   filter: {
      all: 'All',
      title: 'FILTERS',
      reset: 'RESET',
   },
   viewColumns: {
      title: 'Show Columns',
      titleAria: 'Show/Hide Table Columns',
   },
   selectedRows: {
      text: 'row(s) selected',
      delete: 'Delete',
      deleteAria: 'Delete Selected Rows',
   },
};

export const theme = createMuiTheme({
   typography: {
      h6: {
         fontWeight: 550,
      },
      button: {
         fontWeight: 'bold',
      },
   },

   overrides: {
      MuiPaper: {
         root: {
            backgroundColor: '#FFFFFF',
            color: '#000000',
            fontFamily: 'Roboto',
         },
      },
      MuiListItemIcon: {
         root: {
            color: '#FFFFFF',
         },
      },
   },
});
// export default {CustomToolbarStyle,theme};
// getMuiTheme = () =>
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
//             width: "100%"
//           },
//         },
//         MuiTableCell: {
//           root: {
//             color: "#4E4E4E"
//           }
//         },
//       }
//     });
