import React from 'react';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: '200',
        margin: '2em auto'
    }
}));


export default function NotFound() {
    const classes = useStyles();

    return (
        <Grid container justify='center' alignContent='center' alignItems='center'>
            <Typography variant='h3' color='secondary' className={classes.title}>
                404 Not Found <span role='img' aria-label='Fantasy characters'>🧙‍♂️🧚‍♀️🧝‍♀️</span>
            </Typography>
        </Grid>
    );
}