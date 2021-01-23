import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { useSelector } from 'react-redux';
import firebase from '../firebase';
import ScoreTable from './ScoreTable';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    titleContainer: {
        marginTop: '2em'
    },
    title: {
        fontWeight: '200',
        textTransform: 'uppercase',
        color: '#9aa6b8'
    },
    text: {
        fontWeight: '200',
    },
    startContainer: {
        margin: '3em'
    },
    scoreTable: {
        marginTop: '2em',
        width: '30em'
    }
});


export default function HomePage() {
    const classes = useStyles();
    const user = useSelector(state => state.common.user);
    const [scores, setScores] = useState(null);

    useEffect(() => {
        firebase.getScores(result => {
            setScores(result)
        });
    }, []);


    return (
        <Grid container justify='center'>
            <Grid container item justify='center' alignContent='center' className={classes.titleContainer}>
                <Typography align='center' variant='h3' className={classes.title}>
                    Handtracking Deep Neural Space Game!
                </Typography>
            </Grid>
            <Grid container item justify='center' alignContent='center'>
                <Typography align='center' variant='h4' className={classes.text}>
                    Use your hand to control the game
                </Typography>
            </Grid>
            <Grid container item justify='center' alignContent='center' className={classes.startContainer}>
                <Typography align='center' variant='h5' className={classes.text}>
                    {user ?
                        <span>Go to <Link color='secondary' href='/game'>game page</Link> to start playing</span>
                        :
                        <span><Link color='secondary' href='/login'>Login</Link> to start playing</span>}
                </Typography>
            </Grid>
            <Grid container item justify='center' alignContent='center'>
                {scores ? (
                    <ScoreTable title='Global Score' data={scores} className={classes.scoreTable} />
                ) : (
                    <CircularProgress />
                )}
            </Grid>
        </Grid>
    );
}