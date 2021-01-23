import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from './Login';
import Register from './Register';


const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(img/aest.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
}));

export default function Root() {
    const classes = useStyles();
    const [isSignUpSelected, setSignUpSelected] = useState(false);
    const changePage = () => setSignUpSelected(!isSignUpSelected);

    return (
        <Grid container component='main' className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            {
                isSignUpSelected ? <Register setSignUpSelected={changePage} /> : <Login setSignUpSelected={changePage} /> 
            }
        </Grid>
    );
}