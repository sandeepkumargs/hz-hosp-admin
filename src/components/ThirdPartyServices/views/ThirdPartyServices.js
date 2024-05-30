import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getThirdPartyServices, deleteThirdPartyServices } from '../actions';
import { Link } from 'react-router-dom';

//Importing Material UI files as per need
import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CustomToolbar from './CustomToolbarThird';
import { getMuiTheme, textLabels } from '../../CustomToolbarStyle';
import MoreActions from './editnDel';
import LinearIndeterminate from '../../../utils/linearProgress';
import Alert from '../../../utils/Alert';

//Properties of each column
const columns = [
	{
		name: '_id',
		label: 'Service ID',
		options: {
			filter: true,
			sort: true,
			print: false,
			download: true,
			display: false,
		},
	},
	{
		name: 'name',
		label: 'Services',
		options: {
			filter: true,
			sort: true,
			print: false,
			download: true,
		},
	},
	{
		name: 'url',
		label: 'URL',
		options: {
			filter: true,
			sort: true,
			print: false,
			download: true,
		},
	},
	{
		name: 'Actions',
		options: {
			filter: false,
			sort: true,
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

//Render class of ThirdPartyServices Component

function ThirdPartyServices(props) {
	const [error, setError] = React.useState(true);

	React.useEffect(() => {
		props.getThirdPartyServices();
	}, []);

	const _handleClose = () => {};
	const onClick = () => {
		setError(false);
		if (props.channelList.status == 422) {
			window.location = '/login';
		}
	};

		const options = {
		selectableRows: 'none',
		// filterType: "checkbox",
		print: false,
		download: false,
		viewColumns: false,
		filter: false,
		// filterType: "dropdown",
		responsive: 'scrollFullHeight',
		fixedHeader: true,
		textLabels: textLabels,
		customToolbar: () => {
			return null;
			// return <CustomToolbar />;
		},
	};

	//MUIDataTable rendering

	return (
		<div>
			{props.thirdPartyServicesList.loading && <LinearIndeterminate />}

			<div style={{ margin: 10 }}>
				<MuiThemeProvider theme={getMuiTheme}>
					<MUIDataTable
						title={'Third Party Services'}
						data={
							props.thirdPartyServicesList.thirdPartyServices
								? props.thirdPartyServicesList.thirdPartyServices
								: []
						}
						columns={columns}
						options={options}
					/>
				</MuiThemeProvider>
			</div>
			{props.thirdPartyServicesList.error && error ? (
				<Alert
					isOpen={props.thirdPartyServicesList.error}
					onClose={_handleClose}
					hasTwoButtons={false}
					handleSubmit={onClick}
					status={props.thirdPartyServicesList.status}
					title="Third Party Services"
					text={props.thirdPartyServicesList.message}
					submitButtonText="OK"
				/>
			) : null}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		thirdPartyServicesList: state.thirdPartyServices,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getThirdPartyServices: () => dispatch(getThirdPartyServices()),
		deleteThirdPartyServices: (thirdPartyServices) => dispatch(deleteThirdPartyServices(thirdPartyServices)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ThirdPartyServices);
