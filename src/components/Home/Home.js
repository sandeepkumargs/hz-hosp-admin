import React, { Component } from 'react';
import { Divider, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { Doughnut, Pie, Line } from 'react-chartjs-2';
import { hotelApi, getJwtToken } from '../../config';
//   import GoogleMapReact from 'google-map-react';

const contentBox = {
   flex: 3,
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;


const lineData = {
   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
   datasets: [
      {
         // label: 'My First dataset',
         fill: false,
         lineTension: 0.1,
         backgroundColor: 'rgba(75,192,192,0.4)',
         borderColor: 'rgba(75,192,192,1)',
         borderCapStyle: 'butt',
         borderDash: [],
         borderDashOffset: 0.0,
         borderJoinStyle: 'miter',
         pointBorderColor: 'rgba(75,192,192,1)',
         pointBackgroundColor: '#fff',
         pointBorderWidth: 1,
         pointHoverRadius: 5,
         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
         pointHoverBorderColor: 'rgba(220,220,220,1)',
         pointHoverBorderWidth: 2,
         pointRadius: 1,
         pointHitRadius: 10,
         data: [65, 59, 80, 81, 56, 55, 40],
      },
   ],
};
// const { count } = this.state;

class Home extends Component {
   state = {
      count: [],
    }

   static defaultProps = {
      center: { lat: 40.744679, lng: -73.948542 },
      zoom: 11,
   };
   constructor(props) {
      super(props);
   }
   
   async componentDidMount() {
      // Changing the state after 600ms
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);

   var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
   };
   try{

      const response = await fetch(hotelApi.getAllHotels, requestOptions);
      const result = await response.text();
   
      if (response.status == 200) {
          const data = JSON.parse(result);
          return  this.setState({count: data?.data})
      } else {
         throw { response, result };
      }
      }
      catch(err) {
        throw err;
        console.log(err);
      }
    }
   
   render() {

      const materials = this.state.count.reduce((acc, instructor) => {
         instructor?.devices?.forEach((material) => {
           acc = [...acc, material];
         });
         return acc;
       }, []);

      const privatedata = materials && materials.filter((item) =>item?.state == "Private" )
      const publicdata = materials && materials.filter((item) =>item?.state == "Public" )
      const floatdata = materials && materials.filter((item) => item?.state == "Float")
      const devicesData = [privatedata?.length, publicdata?.length, floatdata?.length]
      const checkOutStatus = materials && materials.filter((item) =>item?.checkOutStatus == "checkOut")
      const totalLength = privatedata?.length + publicdata?.length +floatdata?.length
      const checkInStatus = totalLength - checkOutStatus.length;
      console.log(totalLength, 'props total length')
      console.log(checkOutStatus.length, 'check out length')

      const data = {
         labels: ['Private', 'Public', 'Buffer'],
      
         datasets: [
            {
               data: devicesData,
               backgroundColor: ['#2E7D32', '#DF3C4F', '#0144E8'],
               hoverBackgroundColor: ['#2E7D32', '#DF3C4F', '#0144E8'],
            },
         ],
      };

      const pieData = {
         labels: ['Available', 'Occupied'],
      
         datasets: [
            {
               data: [checkOutStatus.length, checkInStatus],
               backgroundColor: ['#2D7C31', '#DF3C4F', '#FF9B0D'],
               hoverBackgroundColor: ['#2E7D32', '#DF3C4F', '#FF9B0D'],
            },
         ],
      };
      return (
         <div style={{ margin: 10 }}>
            <h5>Dashboard</h5>
            <Grid container spacing={3}>
               <Grid item md={4}>
                  <Card style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                     <CardContent style={{ backgroundColor: '#ebf0f5' }}>
                        <Typography gutterBottom variant='h6' align='center'>
                           Device Management
                        </Typography>
                     </CardContent>
                     <Divider />
                     <div
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Doughnut data={data} />
                     </div>
                  </Card>
               </Grid>
               <Grid item md={4}>
                  <Card style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                     <CardContent style={{ backgroundColor: '#ebf0f5' }}>
                        <Typography gutterBottom variant='h6' align='center'>
                           Room Management
                        </Typography>
                     </CardContent>
                     <Divider />
                     <div
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Pie data={pieData} />
                     </div>
                  </Card>
               </Grid>
               <Grid item md={4}>
               <Card style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                     <CardContent style={{ backgroundColor: '#ebf0f5' }}>
                        <Typography gutterBottom variant='h6' align='center'>
                        Guest Management
                        </Typography>
                     </CardContent>
                     <Divider />
                     <div
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Line data={lineData} />
                     </div>
                  </Card>
               </Grid>
            </Grid>
         </div>
      );
   }
}

export default Home;
