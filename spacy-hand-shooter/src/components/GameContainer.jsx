import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import initGame from './shooter/game';
import { useDispatch } from 'react-redux';
import ScoresTable from './ScoreTable';
import firebase from '../firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
    gameContainer: {
        padding: '1em',
        boxShadow: '5px 5px 11px #353a42, -3px -5px 11px #545a66',
        backgroundColor: theme.palette.primary.main,
        margin: '3em 2em 0 2em',
        borderRadius: '20px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
    game: {
        borderRadius: '20px',
        width: '58em',
        height: '38em',
        backgroundImage: 'url(/stars.gif)',
    },
    webcamContainer: {
        boxShadow: '5px 5px 11px #353a42, -3px -5px 11px #545a66',
        backgroundColor: theme.palette.primary.main,
        margin: '5em 2em auto 2em',
        borderRadius: '20px',
    },
    webcam: {
        height: '14em',
        width: '19em',
        margin: '1em',
        transform: 'rotateY(180deg)'
    },
    table: {
        width: '25em',
        marginTop: '1em'
    }
}));


export default function GameContainer(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [score, setScore] = useState(0);
    const [scores, setScores] = useState(null);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const user = localStorage.getItem('authUser');
        if (!user) {
            props.history.replace('/login');
        } else {
            firebase.getCurrentUserScores(result => {
                setScores(result);
                setOpen(true);
            });
        }
    }, [score]);

    useEffect(() => {
        initGame({
            score: score,
            setScore: setScore,
            dispatch: dispatch,
        });

        const video = document.getElementById('webcam');
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    video.srcObject = stream;
                })
                .catch(err => {
                    console.log('Something went wrong!', err);
                });
        }
    }, []);

    return (
        <Grid container justify='center' alignContent='center' alignItems='center'>
            <Grid item className={classes.gameContainer}>
                <Grid item id='game-container' className={classes.game}>
                    <canvas id='game' />
                </Grid>
            </Grid>
            <Grid>
                <Grid item container justify='center'>
                    {scores ? <ScoresTable title='Your Score' data={scores} className={classes.table} /> : <CircularProgress />}
                </Grid>
                <Grid item id='webcam-container' className={classes.webcamContainer}>
                    <video className={classes.webcam} id='webcam' />
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message='Your table scoreboard was updated! 🎉'
            />
        </Grid>
    );
}