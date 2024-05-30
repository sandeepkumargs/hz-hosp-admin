import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { HotelInfoForm } from './stepperComponets';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import { Row, Form, FormGroup, Label, Col, FormText } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import Spinner from '../../../utils/Spinner';
import Group from 'antd/lib/input/Group';
const CheckboxGroup = Checkbox.Group;
//import { fault as ReactSelect, } from 'react-select';
import { MultiSelect } from "react-multi-select-component";
//import { components } from 'react-select';
//const { SingleValue, Option } = components;

// const IconSingleValue = (props) => (
//    <SingleValue {...props}>
//       <img src={props.data.image} style={{ height: '30px', width: '30px', borderRadius: '50%', marginRight: '10px' }} height="30px" width="30px" />
//       {props.data.label}
//    </SingleValue>
// );

// const IconOption = (props) => (
//    <Option {...props}>
//       <img src={props.data.image} style={{ height: '30px', width: '30px', borderRadius: '50%', marginRight: '10px' }} height="30px" width="30px" />
//       {props.data.label}
//    </Option>
// );

// const customStyles = {
//    option: (provided) => ({
//       ...provided,
//       display: 'flex',
//       flexDirection: 'row',
//       alignItems: 'center',
//    }),
//    singleValue: (provided) => ({
//       ...provided,
//       display: 'flex',
//       flexDirection: 'row',
//       alignItems: 'center',
//    }),
// }

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
      width: '100%',
      padding: '20px',
   },
   channelsBox: {
      width: 500,
      height: 360
   },
   button: {
      margin: theme.spacing(1),
   },
   dailog: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
   },
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
   },
   chips: {
      display: 'flex',
      flexWrap: 'wrap',
   },
   chip: {
      margin: 2,
   },
   noLabel: {
      marginTop: theme.spacing(3),
   },
   dragDrop: {
      padding: '20px',
      backgroundColor: '#FFFFFF',
      height: 500,
      width: 400,
      display: 'grid',
      gridTemplateColumns: "250px 250px",
   },
   dndTitle: {
      marginBottom: 2,
      textAlign: 'center',
   },
   dndGroup: {
      width: '450px',
   },
   current: {
      backgroundColor: 'Red'

   },
   dndItem: {
      backgroundColor: 'Blue',
      //minWidth: 100,
      minHeight: 100,
      padding: '20px',
      marginBottom: 2,
      //      border: 5,
   }
}));
export function HotelInfoEditDailog(props) {
   const { onClose, value: value, open, ...other } = props;
   const radioGroupRef = React.useRef(null);
   const classes = useStyles();
   const [disable, setDisable] = React.useState(false);
   const [info, setInfo] = React.useState({
      dHSCustRef: null,
      BRN_Number: null,
      title: 'Mr ',
      firstName: null,
      lastName: null,
      addressLine1: null,
      addressLine2: ' ',
      addressLine3: ' ',
      postCode: null,
      technicalContactNumber: null,
      hotelContactNumber: null,
      totalNumOfConnections: null,
      totalNumOfOccupancyConnections: null,
      operationStatus: null,
      isValid: false,
      serial_number: null,
      isVODServiceEnabled: null,
   });
   const handleEntering = () => {
      if (radioGroupRef.current != null) {
         radioGroupRef.current.focus();
      }
   };

   const handleCancel = () => {
      onClose();
   };

   const handleOk = () => {
      onClose(info);
   };

   const handleChange = (event) => {
      setValue(event.target.value);
   };

   const callbackFunction = (data) => {
      if (data.valid && data.state.postCode != null) {
         setDisable(false);
      } else {
         setDisable(true);
      }
      setInfo({
         dHSCustRef: data.state.dHSCustRef,
         BRN_Number: data.state.BRN_Number,
         title: data.state.title,
         firstName: data.state.firstName,
         lastName: data.state.lastName,
         email: data.state.email,
         addressLine1: data.state.addressLine1,
         addressLine2: data.state.addressLine2,
         addressLine3: data.state.addressLine3,
         postCode: data.state.postCode,
         technicalContactNumber: data.state.technicalContactNumber,
         hotelContactNumber: data.state.hotelContactNumber,
         totalNumOfConnections: data.state.totalNumOfConnections,
         totalNumOfOccupancyConnections: data.state.totalNumOfOccupancyConnections,
         totalNumOfPrivateConnections: parseInt(data.state.totalNumOfPrivateConnections),
         totalNumOfPublicConnections:
            parseInt(data.state.totalNumOfOccupancyConnections) -
            parseInt(data.state.totalNumOfPrivateConnections),
         totalNumOfBufferConnections:
            data.state.totalNumOfConnections - data.state.totalNumOfOccupancyConnections,
         serial_number: "312018146332",
         isVODServiceEnabled: data.state.isVODServiceEnabled,
         // hotel_name: data.hotelName,

         // hotel_reg_name: data.entityName,
         // property_type: data.propertyType,
         // address: data.address,
         // phone: data.phNum,
         // description: data.desc,
         // rating: data.hotelType,
         // sector: data.sector,
      });
   };
   return (
      <Dialog
         disableBackdropClick
         disableEscapeKeyDown
         // style={{ width: 900 }}
         onEntering={handleEntering}
         aria-labelledby='confirmation-dialog-title'
         open={open}
         {...other}>
         <div className={classes.root}>
            <DialogTitle id='confirmation-dialog-title'>Edit Hotel info</DialogTitle>
            <DialogContent dividers>
               <HotelInfoForm
                  info={value}
                  parentCallback={callbackFunction}
                  postCodes={props.postCodes}
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCancel} color='primary'>
                  Cancel
               </Button>
               <Button onClick={handleOk} disabled={disable} color='primary'>
                  Ok
               </Button>
            </DialogActions>
         </div>
      </Dialog>
   );
}
export function SelectChannels(props) {
   let options = props.data.channels.map(function (e) {
      return { value: e.id, label: e.description, image: e.images[0].url };
   })
   console.log(options)
   var filteredSelectedChannels = props.data?.hotel?.metadata?.selected_channels;
   if(filteredSelectedChannels != null && filteredSelectedChannels != undefined && filteredSelectedChannels.length > 0) {
     var length1 = filteredSelectedChannels.length;
      for( var i = 0; i < length1; i++){ 
         var length2 = options.length;
         var contains = false;
         for( var j = 0; j < length2; j++){ 
            if ( filteredSelectedChannels[i]?.value == options[j]?.value) { 
               contains = true;
            }
        }
        if(!contains) {
         filteredSelectedChannels?.splice(i, 1); 
        }
     }
   }
   const [selected, setSelected] = React.useState(filteredSelectedChannels || props.data?.channels);
   const { onClose, value: value, open, ...other } = props;
   const radioGroupRef = React.useRef(null);
   const classes = useStyles();
   const [disable, setDisable] = React.useState(false);

   const handleEntering = () => {
      if (radioGroupRef.current != null) {
         radioGroupRef.current.focus();
      }
   };

   const handleCancel = () => {
      onClose();
   };

   const handleOk = () => {
      onClose(selected);
   };

   return (
      <Dialog
         disableBackdropClick
         disableEscapeKeyDown
         onEntering={handleEntering}
         aria-labelledby='confirmation-dialog-title'
         open={open}
         {...other}>
         <div >
            <DialogTitle id='confirmation-dialog-title'>Edit Channels</DialogTitle>
            <DialogContent dividers className={classes.channelsBox}>
               <div className={classes.dndGroup}>
                  <MultiSelect
                     options={options}
                     value={selected}
                     onChange={setSelected}
                  />
               </div>

            </DialogContent>
            <DialogActions>
               <Button onClick={handleCancel} color='primary'>
                  Cancel
               </Button>
               <Button onClick={handleOk} disabled={disable} color='primary'>
                  Ok
               </Button>
            </DialogActions>
         </div>
      </Dialog >
   );
}

export function SelectLang(props) {
   const { onClose, open, ...other } = props;
   const plainOptions = ['English', 'Chinese', 'French', 'Russian', 'German'];
   const defaultCheckedList = ['English'];
   const [state, setState] = React.useState({
      checkedList: props.value ? props.value : defaultCheckedList,
      indeterminate: true,
      checkAll: false,
   });
   const classes = useStyles();
   const handleCheck = (e, x) => {
      setState((state) => ({
         checkedList: state.checkedList.includes(x)
            ? state.checkedList.filter((c) => c !== x)
            : [...state.checkedList, x],
      }));
   };
   const radioGroupRef = React.useRef(null);
   React.useEffect(() => {
      setState({
         ...state,
         checkedList: props.value,
      });
   }, [props.value]);

   const handleEntering = () => {
      if (radioGroupRef.current != null) {
         radioGroupRef.current.focus();
      }
   };

   const handleCancel = () => {
      onClose();
   };

   const handleOk = () => {
      onClose(state.checkedList);
   };

   return (
      <div>
         <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            onEntering={handleEntering}
            aria-labelledby='confirmation-dialog-title'
            open={open}
            {...other}>
            <div className={classes.root}>
               <DialogTitle id='confirmation-dialog-title'>Select Languages</DialogTitle>
               <DialogContent dividers>
                  <FormGroup aria-label='position' row>
                     {plainOptions.map((x) => (
                        <FormControlLabel
                           key={x.toString()}
                           label={x.toString()}
                           disabled={x.toString() == 'English' ? true : false}
                           labelPlacement='end'
                           control={
                              <Checkbox
                                 key={x.toString()}
                                 onChange={(e) => handleCheck(e, x)}
                                 checked={state.checkedList ? state.checkedList.includes(x) : null}
                                 color='primary'
                              />
                           }
                        />
                     ))}
                  </FormGroup>
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleCancel} color='primary'>
                     Cancel
                  </Button>
                  <Button onClick={handleOk} color='primary'>
                     Ok
                  </Button>
               </DialogActions>
            </div>
         </Dialog>
      </div>
   );
}

export function ConfigDevices(props) {
   const { onClose, value: value, open, ...other } = props;
   const radioGroupRef = React.useRef(null);

   const [totalDevices, SetTotalDevices] = React.useState(props.value.devices.length);
   const classes = useStyles();
   const [state, setState] = React.useState({
      privateDevices: 0,
      publicDevices: 0,
      bufferDevices: 0,
      error: false,
   });
   var data = {};

   const handleChange = (evt) => {
      setState({
         ...state,
         [evt.target.id]: evt.target.value ? evt.target.value : parseInt(0),
      });
   };
   React.useEffect(() => {
      if (
         parseInt(state.publicDevices) +
         parseInt(state.bufferDevices) +
         parseInt(state.privateDevices) >
         totalDevices
      ) {
         setState({
            ...state,
            error: true,
         });
      } else {
         setState({
            ...state,
            error: false,
         });
      }
      data = {
         enteredCnt:
            parseInt(state.publicDevices) +
            parseInt(state.bufferDevices) +
            parseInt(state.privateDevices),
         totalDevices: totalDevices,
         privateDevices: state.privateDevices,
         publicDevices: state.publicDevices,
         bufferDevices: state.bufferDevices,
      };
   }, [state.publicDevices, state.privateDevices, state.bufferDevices]);

   const handleEntering = () => {
      if (radioGroupRef.current != null) {
         radioGroupRef.current.focus();
      }
   };

   const handleCancel = () => {
      onClose();
   };

   const handleOk = () => {
      onClose(state);
   };

   return (
      <Dialog
         disableBackdropClick
         disableEscapeKeyDown
         // style={{ width: 900 }}
         onEntering={handleEntering}
         aria-labelledby='confirmation-dialog-title'
         open={open}
         {...other}>
         <div className={classes.root}>
            <DialogTitle id='confirmation-dialog-title'>Device configuration</DialogTitle>
            <Typography className={classes.button} variant='subtitle1' gutterBottom>
               Total Number of Devices : {totalDevices}
            </Typography>
            <DialogContent dividers>
               <Row>
                  <Col md={{ size: 4 }}>
                     <Form>
                        <Row form>
                           <Col md={6}>
                              <FormGroup>
                                 <TextField
                                    id='privateDevices'
                                    label='Private Device Count'
                                    multiline
                                    rowsMax='4'
                                    variant='outlined'
                                    helperText='Enter the Number of Private devices'
                                    style={{
                                       width: 222,
                                       marginBottom: 10,
                                       marginTop: 10,
                                    }}
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                    // defaultValue={state.privateDevices}
                                    onChange={handleChange}
                                    error={state.error}
                                    autoFocus
                                 />
                              </FormGroup>
                           </Col>
                        </Row>
                        <Row form>
                           <Col md={6}>
                              <FormGroup>
                                 <TextField
                                    id='publicDevices'
                                    label='Public Device Count'
                                    multiline
                                    rowsMax='4'
                                    variant='outlined'
                                    style={{ width: 222, marginBottom: 10 }}
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                    helperText='Enter the Number of Public devices'
                                    // defaultValue={state.publicDevices}
                                    onChange={handleChange}
                                    error={state.error}
                                 />
                              </FormGroup>
                           </Col>
                        </Row>
                        <Row form>
                           <Col md={6}>
                              <FormGroup>
                                 <TextField
                                    id='bufferDevices'
                                    label='Buffer Device Count'
                                    multiline
                                    rowsMax='4'
                                    variant='outlined'
                                    style={{ width: 222, marginBottom: 10 }}
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                    helperText='Enter the Number of Buffer devices'
                                    // defaultValue={state.bufferDevices}
                                    onChange={handleChange}
                                    error={state.error}
                                 />
                              </FormGroup>
                           </Col>
                        </Row>
                     </Form>
                  </Col>
               </Row>
               {state.error && (
                  <Typography
                     className={classes.button}
                     variant='caption text'
                     color='error'
                     gutterBottom>
                     Allocating Count should not exceed the total number of devices count
                  </Typography>
               )}
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCancel} color='primary'>
                  Cancel
               </Button>
               <Button onClick={handleOk} color='primary'>
                  Ok
               </Button>
            </DialogActions>
         </div>
      </Dialog>
   );
}

export const EditTheme = (props) => {
   const { onClose, value: value, selected_info, open, ...other } = props;
   const radioGroupRef = React.useRef(null);
   const classes = useStyles();

   const [state, setState] = React.useState({
      selected_theme_id: selected_info.theme.id,
      theme: value?.themes,
      themeSelected: selected_info.theme.type,
      color:
         selected_info.theme.name == 'Blue Bobber'
            ? value?.themes[1]?.color_schemes
            : value?.themes[0]?.color_schemes,
      selected_color: selected_info.theme.colorScheme.color_scheme_name,
   });
   const handleTheme = (e) => {
      let index = _.findIndex(value.themes, function (o) {
         return o.type == e.target.value;
      });

      setState({
         ...state,
         themeSelected: e.target.value,
         color: value?.themes[index].color_schemes,
         selected_theme_id: value?.themes[index]._id,
         selected_color: value?.themes[index].color_schemes[0].color_scheme_name,
      });
   };
   const handleColor = (e) => {
      setState({ ...state, selected_color: e.target.value });
   };

   const handleEntering = () => {
      if (radioGroupRef.current != null) {
         radioGroupRef.current.focus();
      }
   };

   const handleCancel = () => {
      onClose();
   };

   const handleOk = () => {
      onClose({
         selected_theme: state.selected_theme_id,
         selected_color_scheme: state.selected_color,
      });
   };

   return (
      <Dialog
         disableBackdropClick
         disableEscapeKeyDown
         // style={{ width: 900 }}
         onEntering={handleEntering}
         aria-labelledby='confirmation-dialog-title'
         open={open}>
         <div className={classes.root}>
            <DialogTitle id='confirmation-dialog-title'>Change theme</DialogTitle>

            <DialogContent dividers>
               <Form>
                  <Row>
                     <Col>
                        <FormGroup>
                           <TextField
                              id='theme'
                              select
                              label='Theme'
                              fullWidth
                              defaultValue={state.themeSelected}
                              onChange={handleTheme}
                              variant='outlined'
                              SelectProps={{
                                 native: true,
                              }}
                              InputLabelProps={{
                                 shrink: true,
                              }}
                              helperText='Select theme in the list'>
                              {value.themes.map((option) => (
                                 <option key={option.type} value={option.type}>
                                    {option.type == 'vertical' ? 'Vertical' : 'Horizontal'}
                                 </option>
                              ))}
                           </TextField>
                        </FormGroup>
                     </Col>
                     <Col>
                        <FormGroup>
                           <TextField
                              select
                              label='Color Scheme'
                              fullWidth
                              onChange={handleColor}
                              variant='outlined'
                              defaultValue={state.selected_color}
                              value={state.selected_color}
                              SelectProps={{
                                 native: true,
                              }}
                              InputLabelProps={{
                                 shrink: true,
                              }}
                              placeholder='Color schemes'
                              helperText='Select Color Scheme in the list'>
                              {state.color.map((option) => (
                                 <option
                                    key={option.color_scheme_name}
                                    value={option.color_scheme_name}>
                                    {option.color_scheme_name}
                                 </option>
                              ))}
                           </TextField>
                        </FormGroup>
                     </Col>
                  </Row>
               </Form>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCancel} color='primary'>
                  Cancel
               </Button>
               <Button onClick={handleOk} color='primary'>
                  Ok
               </Button>
            </DialogActions>
         </div>
      </Dialog>
   );
};

export function ChangeBaseCurrency(props) {
   
   const { onClose, open, selected_info, ...other } = props;

   const [state, setState] = React.useState({
      currency: selected_info ? selected_info : 'LKR',
   });
   console.log("props value",props);
   
   const classes = useStyles();

   const handleCancel = () => {
      onClose();
   };

   const handleOk = () => {
      onClose(state.currency);
   };
   const handleCurrency = (e) => {
      setState({
         ...state,
         currency: e.target.value,
         
      });   console.log("props after value",e.target.value);

      
   };

   return (
      <div>
         <Dialog disableBackdropClick disableEscapeKeyDown open={open} {...other}>
            <div className={classes.root}>
               <DialogTitle id='confirmation-dialog-title'>Change Base Currency</DialogTitle>
               <DialogContent dividers>
                  <FormGroup>
                     <RadioGroup
                        aria-label='show'
                        value={state.currency}
                        onChange={handleCurrency}
                        row>
                        <FormControlLabel
                           value='USD'
                           name='cur'
                           control={<Radio id='cur' color='primary' />}
                           label='USD'
                           labelPlacement='top'
                        />
                        <FormControlLabel
                           value='LKR'
                           name='cur'
                           control={<Radio id='cur' color='primary' />}
                           label='LKR'
                           labelPlacement='top'
                        />
                     </RadioGroup>
                  </FormGroup>
                  <FormHelperText>Choose base Currency for the hotel</FormHelperText>
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleCancel} color='primary'>
                     Cancel
                  </Button>
                  <Button onClick={handleOk} color='primary'>
                     Ok
                  </Button>
               </DialogActions>
            </div>
         </Dialog>
      </div>
   );
}
