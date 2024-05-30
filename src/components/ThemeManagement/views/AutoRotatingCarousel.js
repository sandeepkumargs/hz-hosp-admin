import React, { useState } from 'react'
const Button = require('@material-ui/core/Button').default;
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles } from '@material-ui/core/styles';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import DemoV4 from'./Slider'

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    marginLeft: theme.spacing(1),
    overflow: 'hidden'
  },
  div: {
    position: 'absolute',
    top: 28,
    right: 0,
    left: 0,
    overflow: 'hidden',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));
export default function Carousal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  return (

    < div style={{ position: 'relative', overflow: 'hidden'}}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.wrapper}>
          {/* <button type="button" onClick={handleClick}>
            Open menu dropdown
        </button> */}

          {/* <ClickAwayListener onClickAway={handleClickAway}> */}
          <Button variant="outlined" color="primary" onClick={handleClick} >  Preview  </Button>
          {/* {open ? (
          <div className={classes.div}>Click me, I will stay visible until you click outside.</div>
        ) : null} */}
          {
            open ? (
              <div className={classes.div}>  <AutoRotatingCarousel
                open={open}
             
              >
                <DemoV4/>
                {/* {slider} */}
                {/* {Dem} */}
                {/* <Slide
                  media={<img src='http://www.icons101.com/icon_png/size_256/id_79394/youtube.png' />}
                  mediaBackgroundStyle={{ backgroundColor: red[400] }}
                  style={{ backgroundColor: red[600] }}
                  title='This is a very cool feature'
                  subtitle='Just using this will blow your mind.'
                />
                <Slide
                  media={<img src='http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png' />}
                  mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                  style={{ backgroundColor: blue[600] }}
                  title='Ever wanted to be popular?'
                  subtitle='Well just mix two colors and your are good to go!'
                />
                <Slide
                  media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' />}
                  mediaBackgroundStyle={{ backgroundColor: green[400] }}
                  style={{ backgroundColor: green[600] }}
                  title='May the force be with you'
                  subtitle='The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe.'
                /> */}
              </AutoRotatingCarousel>  </div>
            ) : null}
        </div>
      </ClickAwayListener>
      {/* </ClickAwayListener> */}
    </div >
  )
}