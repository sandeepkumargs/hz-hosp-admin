import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import { deleteThirdPartyServices } from '../actions';
import AlertDialog from '../../../utils/warning';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(1),
	},
}));

function MoreActions(props) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [warning, setWarning] = React.useState(false);
	const [itemId, setItemId] = React.useState();
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setWarning(false);
	};

	const deleteHandler = () => {
		const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
		const id = props.tableMeta.rowData[0];
		props.deleteThirdPartyServices({
			id,
			jwt_token: userDetails.jwt_token,
		});
		setAnchorEl(null);
		setWarning(false);
	};
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	const history = useHistory();
	return (
		<div>
			<MoreVertIcon aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
				Open Popover
			</MoreVertIcon>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
			>
				<Typography>
					<Button
                  id='button'
                  color='primary'
                  onClick={() => {
                     history.push(
                        `/addThirdParty?${
                           props.tableMeta.rowData[0] +
                           '-' +
                           props.tableMeta.rowData[1] +
                           '-' +
                           props.tableMeta.rowData[2]
                        }`
                     );
                  }}
                  fullWidth>
                  <EditSharpIcon className='iconStyle' /> &nbsp; Edit
               </Button> <br></br>

					<Button
						color="secondary"
						onClick={() => {
							setWarning(true);
						}}
					>
						<DeleteOutlineIcon /> Delete
					</Button>
				</Typography>
			</Popover>
			{warning ? (
				<AlertDialog
					title="Delete"
					open={warning}
					onClose={handleClose}
					onOK={deleteHandler}
					message={'Are you sure to delete this item?'}
				/>
			) : null}
		</div>
	);
}
const mapStateToProps = (state) => {
		return {
		devicesList: state.devices,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteThirdPartyServices: (devices) => dispatch(deleteThirdPartyServices(devices)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreActions);
