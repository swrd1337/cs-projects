import { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Header from './head/Header';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/common';
import Container from './body/Container';
import { Typography, Link } from '@material-ui/core';
import { withFirebase } from '../context';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: '5vh',
        marginBottom: '5vh',
        width: '60%',
        minHeight: '80vh',
        backgroundColor: theme.palette.background.secondary,
        boxShadow: '1px 0px 20px 1px rgba(0,0,0,0.2)',
        borderRadius: '22px',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
    headerPaper: {
        width: '100%',
        minHeight: '18vh',
        borderRadius: '28px',
        boxShadow: '0px 7px 10px -3px #191b1dcf',
        backgroundColor: theme.palette.background.primary,
        backgroundImage: 'url(neon.jpg)',
        backgroundRepeat: 'no-repeat',
    },
    titleContainer: {
        marginTop: '5vh',
        width: '30vh',
        height: '10vh',
        backgroundImage: 'url(neon.jpg)',
    },
    blur: {
        backdropFilter: 'blur(30px)'
    },
    title: {
        margin: 'auto auto 2vh auto',
        fontFamily: `'Leckerli One', cursive`
    },
    footer: {
        borderRadius: '10px 10px 0 0',
        border: '2px solid #2d3034;',
        background: 'rgb(72,17,98)',
        background: 'linear-gradient(67deg, rgba(72,17,98,1) 0%, rgba(136,26,87,1) 37%, rgba(63,12,183,1) 100%)',
        width: '60%',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    }
}));


function Root(props) {
    const { firebase } = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        const listener = firebase.auth.onAuthStateChanged(
            authUser => {
                authUser
                    ? dispatch(setUser({ user: authUser }))
                    : dispatch(setUser({ user: null }));
            },
        );
        return () => {
            listener();
        }
    }, []);


    return (
        <main>
            <Grid container justify='center'>
                <Grid item container justify='center' className={classes.titleContainer}>
                    <Grid container justify='center' className={classes.blur}>
                        <Typography variant='h3' className={classes.title}>quitter</Typography>

                    </Grid>
                </Grid>
                <Grid item container justify='center'>
                    <Paper elevation={0} className={classes.paper}>
                        <Paper elevation={0} className={classes.headerPaper}>
                            <Header />
                        </Paper>
                        <Container />
                    </Paper>
                </Grid>
                <Grid item container className={classes.footer} justify='center'>
                    <Typography variant='subtitle2'>
                        Check out my <Link href='https://github.com/swrd1337' color='inherit'>GitHub</Link> 🎉
                    </Typography>
                </Grid>
            </Grid>
        </main>
    );
}

export default withFirebase(Root);