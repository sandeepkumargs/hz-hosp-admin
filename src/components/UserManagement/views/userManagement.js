//import basic react, router required files
import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { getNotification } from '../actions';
//Importing Material UI files as per need
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
// import '../../custom.scss';
import { getMuiTheme, textLabels } from '../../CustomToolbarStyle';
//Custom files imported
import MUIDataTable from 'mui-datatables';
import CustomToolbarUser from './CustomToolBarUser';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MoreActions from './editnDel';
import { getAllUsers } from '../actions';
import _ from 'lodash';
import Spinner from '../../../utils/Spinner';
import LinearIndeterminate from '../../../utils/linearProgress';
import Alert from '../../../utils/Alert';
//Properties of each column for notifications table

const columns = [
   {
      name: '_id',
      label: 'user ID',
      options: {
         filter: false,
         sort: true,
         print: false,
         display: false,
      },
   },
   {
      name: 'fullname',
      label: 'User Name',
      options: {
         filter: false,
         sort: true,
         print: false,
      },
   },
   {
      name: 'email',
      label: 'Email',
      options: {
         filter: false,
         sort: true,
         print: false,
      },
   },
   {
      name: 'isAdmin',
      label: 'Role',
      options: {
         filter: true,
         sort: true,
         print: false,
         customBodyRender: (value, tableMeta, updateValue) => {
            return <div>{value === 1 ? <p>Admin</p> : <p>User</p>}</div>;
         },
      },
   },
   {
      name: 'Action',
      options: {
         filter: true,
         sort: true,
         print: false,
         customBodyRender: (value, tableMeta, updateValue) => {
            return (
               <div>
                  <MoreActions tableMeta={tableMeta} />
               </div>
            );
         },
      },
   },
];

//Options for the notification table

const options = {
   selectableRows: 'none',
   filterType: 'dropdown',
   rowsPerPage: 50,
   rowsPerPageOptions: [10, 20, 50, 100],
   print: false,
   download: false,
   filter: false,
   viewColumns: false,
   responsive: 'scrollFullHeight',
   fixedHeader: true,
   // fixedHeaderOptions: {
   //    xAxis: false,
   //    yAxis: false,
   // },
   customToolbar: () => {
      return <CustomToolbarUser />;
   },
   textLabels: textLabels,
};

//Default Edit is a function as Material UI does not support Class and returns error with hooks
function UserManagement(props) {
   const [data, setData] = React.useState();
   const [error, setError] = React.useState(true);
   const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));

   const _handleClose = () => {};
   const onClick = () => {
      setError(false);
      if (props.channelList.status == 422) {
         window.location = '/login';
      }
   };

   useEffect(() => {
      if (userDetails.isAdmin === 0) {
         setData(
            _.find(_.values(props.usersList.users), {
               email: userDetails.email,
            })
         );
      }
   }, [props.usersList]);
   useEffect(() => {
      props.getAllUsers();
   }, []);

   return (
      <div>
         {props.usersList.loading ? <LinearIndeterminate /> : null}
         <div style={{ margin: 10 }}>
            <MuiThemeProvider theme={getMuiTheme}>
               <MUIDataTable
                  title={'User Management'}
                  data={data ? [data] : _.values(props.usersList.users)}
                  columns={columns}
                  options={options}
               />
            </MuiThemeProvider>

            {props.usersList.error && error ? (
               <Alert
                  isOpen={props.usersList.error}
                  onClose={_handleClose}
                  hasTwoButtons={false}
                  handleSubmit={onClick}
                  status={props.usersList.status}
                  title={'User Management'}
                  text={props.usersList.message}
                  submitButtonText='OK'
               />
            ) : null}
         </div>
      </div>
   );
}

const mapStateToProps = (state) => {
   return {
      usersList: state.users,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getAllUsers: () => dispatch(getAllUsers()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
