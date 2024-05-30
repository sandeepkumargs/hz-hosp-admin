import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        // width: '100%',
        '& > * + *': {
            // margin: theme.spacing(60),
            // marginLeft: theme.spacing(10),
        },
    },
}));

export default function Loader() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* <LinearProgress /> */}
            <CircularProgress size={40}
                left={-20}
                top={10}
                status={'loading'}
                // style={{ marginLeft: '50%', marginTop: '30%' }}
                 />
            {/* <LinearProgress color="secondary" /> */}
        </div>
    );
}