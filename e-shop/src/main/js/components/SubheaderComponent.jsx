import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { PRIMARY_1, PRIMARY_2 } from '../constants/Colors';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: 'url("img/aest.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '470px',
        width: '100%',
        borderBottom: `15px solid ${PRIMARY_1}`
    },
    container: {
        height: '100%',
        flexDirection: 'column',
        color: PRIMARY_2
    },
    title: {
        width: 'fit-content',
        margin: '0 auto',
        padding: '8px',
    }
}));

export default function SubheaderComponent() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid className={classes.container} container justify='center'>
                <Typography className={classes.title} variant='h2' style={{ border: `4px solid ${PRIMARY_2}` }}>e Shop</Typography>
                <Typography className={classes.title} variant='h4'>Select your own casual look</Typography>
            </Grid>
        </div>
    );
}