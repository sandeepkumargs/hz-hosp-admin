import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import '../../custom.scss';
import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// import CustomToolbar from "./CustomToolbar";
import { getMuiTheme, textLabels } from '../../CustomToolbarStyle';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { red } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AlertDialog from '../../../utils/warning';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeviceEdit from './deviceEdit';
import AddIcon from '@material-ui/icons/Add';
import { CustomToolbarStyle } from '../../CustomToolbarStyle';
import { deleteHotelSerialNumber } from '../actions';

const useStyles = makeStyles((theme) => ({
   button: {
      margin: theme.spacing(1),
      color: '#266199',
      backgroundColor: '#CFD9E3',
      fontWeight: 'bold',
   },
   buttonFont: {
      color: '#266199',
      backgroundColor: '#CFD9E3',
      fontWeight: '300',
   },
}));

function Devices(props) {
   const classes = useStyles();
   const [editDevice, setEditDevice] = React.useState(false);
   const [opType, setOpType] = React.useState();
   const [slNo, setSlNo] = React.useState();
   const [roomNumber, setRMNo] = React.useState();
   const [state, setState] = React.useState({
      dialog: false,
      warning: false,
   });
   const handleEdit = () => {
      setEditDevice(true);
   };

   const handleClose = () => {
      setEditDevice(false);
   };
   const handleDialogClose = () => {
      setState({
         ...state,
         warning: false,
      });
   };
   const handleDelete = () => {
      setState({
         ...state,
         warning: false,
      });
      props.deleteHotelSerialNumber({
         hotel_id: props.hotelDetails.hotel._id,
         serial_number: slNo,
         room_number: roomNumber
      });
      //window.location.reload();
   };
   const columns = [
      {
         name: 'serialNo',
         label: 'Device Sl No',
         options: {
            filter: false,
            sort: true,
            print: false,
         },
      },
      {
         name: 'DTV.MOBILE_NO',
         label: 'DTV Ac No',
         options: {
            filter: false,
            sort: true,
            print: false,
         },
      },
      {
         name: 'state',
         label: 'Device state',
         options: {
            filter: true,
            sort: true,
            print: false,
         },
      },
      {
         name: 'room_number',
         label: 'Room / Area Code',
         options: {
            filter: true,
            sort: true,
            print: false,
         },
      },
          {
         name: 'package_code',
         label: 'Package Code',
         options: {
            filter: true,
            sort: true,
            print: false,
         },
      },
      {
         name: 'account_category',
         label: 'Account Category',
         options: {
            filter: true,
            sort: true,
            print: false,
         },
      },
      {
         name: 'Actions',

         options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
               return (
                  < div >
                     <Button
                        id='button'
                        //value={data.id}
                        //className={classes.buttonFont}
                        color='secondary'
                        onClick={() => {
                           setState({
                              ...state,
                              warning: true,
                           });    
                           setSlNo(tableMeta.rowData[0]);
                           setRMNo(tableMeta.rowData[3]);
                        }}>
                        <DeleteOutlineOutlinedIcon /> Delete
                        </Button>
                  </div >
               );
            },
         },
      },
      // {
      //    name: 'Actions',

      //    options: {
      //       filter: false,
      //       sort: false,

      //       // empty: true,

      //       customBodyRender: (value, tableMeta, updateValue) => {
      //          // console.log(  tableMeta.rowData.map(i => ';' + i));

      //          return (
      //             <div>
      //                <Button
      //                   id='button'
      //                   className={classes.buttonFont}
      //                   onClick={() => {
      //                      setOpType('Edit');
      //                      setEditDevice(true);
      //                   }}
      //                   // disabled={disable}
      //                   variant='text'>
      //                   edit
      //                </Button>
      //             </div>
      //          );
      //       },
      //    },
      // },
   ];

   const options = {
      selectableRows: 'none',
      // filterType: 'dropdown',
      responsive: 'scrollMaxHeight',
      filterType: 'multiselect',
      print: false,
      download: false,
      viewColumns: false,
      textLabels: textLabels,
      customToolbar: () => {
         return (
            <Button
               id='button'
               style={CustomToolbarStyle.iconButton}
               onClick={() => {
                  setOpType('Add');
                  setEditDevice(true);
               }}>
               <AddIcon />
               Add Device
            </Button>
         );
      },
   };

   return (
      <div>
         <MuiThemeProvider theme={getMuiTheme}>
            <MUIDataTable
               title={'Devices Management'}
               data={props.hotelDetails.hotel.devices}
               columns={columns}
               options={options}
            />
         </MuiThemeProvider>
         <div>
            {editDevice ? (
               <DeviceEdit
                  open={editDevice}
                  onClose={handleClose}
                  value={null}
                  postCodes={null}
                  opType={opType}
                  hotelId={props.hotelDetails.hotel._id}
               />
            ) : null}
         </div>
         <div>
            {state.warning ? (
               <AlertDialog
                  title='Delete Serial Number'
                  open={state.warning}
                  onClose={handleDialogClose}
                  onOK={handleDelete}
                  message={'Are you sure about deleting this Serial Number?'}
               />
            ) : null}
         </div>
      </div>

   );
}

const mapStateToProps = (state) => {
   return {
      hotelDetails: state.hotels,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      deleteHotelSerialNumber: (data) => dispatch(deleteHotelSerialNumber(data))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
