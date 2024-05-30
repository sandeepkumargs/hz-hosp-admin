/**Rendering of Dashboard component
 * 
  */
import React, { Component } from 'react';
import {
  RadialChart,
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
  GradientDefs,
  Borders,
  makeVisFlexible,
  Hint,
  LabelSeries
} from 'react-vis';
import { Divider, 
  Card, 
  CardActionArea, 
  CardContent, 
  Grid, 
  Typography 
} from '@material-ui/core';

const contentBox = {
    flex: 3
  };
  
  const FlexibleXYPlot = makeVisFlexible(XYPlot);
  

class Home_react_vis extends Component {
  constructor(props) {
      super(props);

  }

  state = {
    value: false
  };

  render() {
    const {value} = this.state;
    return (
      <section style={contentBox}>
        <h5>Dashboard</h5>
        <Grid container spacing={3}>
        <Grid item md={4}>
        <Card style={{backgroundColor:"#FFFFFF", color:"#000000"}}>
        <CardContent style={{backgroundColor:"#ebf0f5"}}>          
          <Typography gutterBottom variant="h6" component="h6"  align="center">
            Device Management
          </Typography>
          </CardContent>
          <Divider/>
          <CardActionArea>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <RadialChart
      colorType={'literal'}
      colorDomain={[0, 100]}
      colorRange={[0, 100]}
      margin={{top: 100}}
      getLabel={d => d.name}
      data={[
        {angle: 3, color: '#2D7C31'},
        {angle: 1, color: '#EC4055'},
        {angle: 15, color: '#FF9B0D'},

      ]}
      labelsRadiusMultiplier={1.1}
      labelsStyle={{fontSize: 16, fill: '#222'}}
      showLabels
      onValueMouseOver={v => this.setState({value: v})}
      onSeriesMouseOut={v => this.setState({value: false})}
      style={{stroke: '#fff', strokeWidth: 2}}
      width={400}
      height={300}
    >
      {value !== false && <Hint value={value}/>}
    </RadialChart>
    </div>
    </CardActionArea>
    </Card>
    </Grid>

    <Grid item md={4}>
        <Card style={{backgroundColor:"#FFFFFF", color:"#000000"}}>
          <CardContent style={{backgroundColor:"#ebf0f5"}}>          
            <Typography gutterBottom variant="h6" component="h6"  align="center">
              Room Management
            </Typography>
          </CardContent>
          <Divider/>
          <CardActionArea>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>          
              <RadialChart 
                colorType={'literal'}
                colorDomain={[0, 100]}
                colorRange={[0, 100]}
                innerRadius={100}
                radius={130}
                getAngle={d => d.theta}
                getLabel={d => d.theta}
                data={[
                  {theta: 3, color:'#0144E8'},
                  {theta: 8, color: '#2D7C31'},
                  {theta: 2, color: '#EC4055'},
                ]}
                // onValueMouseOver={v => this.setState({value: v})}
                // onSeriesMouseOut={v => this.setState({value: false})}
                labelsRadiusMultiplier={1.1}
                labelsStyle={{fontSize: 16, fill: '#222'}}
                showLabels
                style={{stroke: '#fff', strokeWidth: 2}}
                width={400}
                height={300}
                padAngle={0.02}
                >
                {/* {value !== false && <Hint value={value} 
                style={{
                fontSize: 14,
                content: {
                  display: 'none',
                },
                value: {
                  color: 'red',
                }
                }}
                />} */}
                  {/* <LabelSeries data={[{x: 0, y: 0, label: 'avg val', style: {}}]} /> */}
                </RadialChart>
              </div>
            </CardActionArea>
          </Card>
      </Grid>

    <Grid item md={4}>
        <Card style={{backgroundColor:"#FFFFFF", color:"#000000"}}>
        <CardContent style={{backgroundColor:"#ebf0f5"}}>          
          <Typography gutterBottom variant="h6" component="h6"  align="center">
            Test
          </Typography>
          </CardContent>
          <Divider/>
          <CardActionArea>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>  
        <RadialChart
      colorType={'literal'}
      colorDomain={[0, 100]}
      colorRange={[0, 10]}
      margin={{top: 100}}
      getLabel={d => d.name}
      data={[
        {angle: 1, color: '#89DAC1', name: 'green', opacity: 0.2},
        {angle: 2, color: '#F6D18A', name: 'yellow'},
        {angle: 5, color: '#1E96BE', name: 'cyan'},
        {angle: 3, color: '#DA70BF', name: 'magenta'},
        {angle: 5, color: '#F6D18A', name: 'yellow1'}
      ]}
      labelsRadiusMultiplier={1.1}
      labelsStyle={{fontSize: 16, fill: '#222'}}
      showLabels
      style={{stroke: '#fff', strokeWidth: 2}}
      width={400}
      height={300}
    />
    </div>
    </CardActionArea>
    </Card>
    </Grid>
    </Grid>

    <Grid container spacing={3}>
        <Grid item md={12}>
        <Card style={{backgroundColor:"#FFFFFF", color:"#000000"}}>
        <CardContent style={{backgroundColor:"#ebf0f5"}}>          
          <Typography gutterBottom variant="h6" component="h6">
            Room Service
          </Typography>
          </CardContent>
          <Divider/>
          <CardActionArea>
          <FlexibleXYPlot xDomain={[1.2, 3]} yDomain={[11, 26]} width={300} height={300}>
      <GradientDefs>
        <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="red" stopOpacity={0.4} />
          <stop offset="100%" stopColor="blue" stopOpacity={0.3} />
        </linearGradient>
      </GradientDefs>
      <VerticalGridLines />
      <HorizontalGridLines />

      <AreaSeries
        color={'url(#CoolGradient)'}
        data={[
          {x: 1, y: 10, y0: 1},
          {x: 2, y: 25, y0: 5},
          {x: 3, y: 15, y0: 3}
        ]}
      />
      <Borders
        style={{
          bottom: {fill: '#fff'},
          left: {fill: 'url(#CoolGradient)', opacity: 0.3},
          right: {fill: '#fff'},
          top: {fill: '#fff'}
        }}
      />
      <XAxis />
      <YAxis />
      <AreaSeries
        data={[
          {x: 3, y: 0, y0: 0},
          {x: 4, y: 15, y0: 11},
          {x: 5, y: 5, y0: 9}
        ]}
      />
    </FlexibleXYPlot>
          </CardActionArea>
          </Card>
          </Grid>
          </Grid>
      </section>
    )
  }
} 
export default Home_react_vis;