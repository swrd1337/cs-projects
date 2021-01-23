import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import firebase from '../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/common';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import SocialLoginButton from './SocialLoginButton';

const useStyles = makeStyles((theme) => ({
    registerContainer: {
        width: '60em',
        boxShadow: '5px 5px 11px #353a42, -3px -5px 11px #545a66',
        backgroundColor: theme.palette.primary.main,
        marginTop: '3em',
        borderRadius: '20px',
        padding: '3em'
    },
    titleContainer: {
        marginBottom: '3em',
    },
    text: {
        fontWeight: '200',
    },
    textFieldContainer: {
        margin: '2em auto',
    },
    textField: {
        width: '23em',
    },
    buttonsContainer: {
        margin: '1em auto'
    },
    button: {
        fontWeight: '200',
        borderRadius: '25px'
    },
    dialogTitle: {
        fontWeight: '200',
        fontSize: '24px'
    },
    dialog: {
        backgroundColor: theme.palette.primary.main,
    }
}));

const emailRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

export default function RegisterPage(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [verified, setVerified] = useState(true);
    const [resetDialog, setResetDialog] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);

    const afterLogIn = () => {
        const user = firebase.getUser();
        dispatch(setUser({ user: user }));
        localStorage.setItem('authUser', JSON.stringify(user));
        props.history.replace('/game');
    }

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            await firebase.login(email, password);
            const isVerified = firebase.isVerified();
            if (isVerified) {
                afterLogIn();
            } else {
                setVerified(false);
            }
        } catch (err) {
            setError(true);
        }
    };

    const onGoogleLogin = async () => {
        try {
            await firebase.googleLogin();
            afterLogIn();
        } catch (err) {
            setError(true);
        }
    };

    const onFacebookLogin = async () => {
        try {
            await firebase.facebookLogin();
            afterLogIn();
        } catch (err) {
            setError(true);
        }
    };

    return (
        <Grid container justify='center' alignContent='center' alignItems='center'>
            <Grid id='register-container' className={classes.registerContainer}>
                <Grid item container justify='center' alignItems='center' className={classes.titleContainer}>
                    <Typography color='secondary' variant='h4' className={classes.text}>
                        Welcome back <span role='img' aria-label='Alien'>👾</span>
                    </Typography>
                </Grid>
                <Divider />
                {error && (<Grid container item justify='center' alignItems='center'>
                    <Typography color='error' variant='body2' className={classes.text}>
                        Invalid credentials! <span role='img' aria-label='Sad face'>😥😥😥</span>
                    </Typography>
                </Grid>)}
                <form onSubmit={onLogin}>
                    <Grid item container justify='center' alignItems='center' className={classes.textFieldContainer}>
                        <TextField
                            variant='outlined'
                            className={classes.textField}
                            color='secondary'
                            label='E-mail address'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item container justify='center' alignItems='center' className={classes.textFieldContainer}>
                        <TextField
                            variant='outlined'
                            className={classes.textField}
                            color='secondary'
                            label='Password'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item container justify='space-evenly' alignItems='center' className={classes.buttonsContainer}>
                        <Button
                            color='secondary'
                            className={classes.button}
                            type='submit'
                            variant='outlined'
                        >
                            Log in
                        </Button>
                    </Grid>
                </form>
                <Grid item container justify='space-evenly' alignItems='center'>
                    <Typography className={classes.text}>
                        or
                    </Typography>
                </Grid>
                <Grid item container justify='space-evenly' alignItems='center' className={classes.buttonsContainer}>
                    <SocialLoginButton
                        onClick={onGoogleLogin}
                        logoUrl='/google.png'
                        alt='Google Sign In'
                        label='Log In with Google'
                    />
                    <SocialLoginButton
                        onClick={onFacebookLogin}
                        logoUrl='/facebook.png'
                        alt='Facebook Sign In'
                        label='Log In with Facebook'
                    />
                </Grid>
                <Divider />
                <Grid item container justify='space-evenly' alignItems='center' className={classes.buttonsContainer}>
                    <Button
                        color='secondary'
                        className={classes.button}
                        onClick={() => props.history.replace('/')}
                    >
                        Go to main page
                    </Button>
                    <Button
                        color='secondary'
                        className={classes.button}
                        onClick={() => props.history.replace('/register')}
                    >
                        Register
                    </Button>
                    <Button
                        color='secondary'
                        className={classes.button}
                        onClick={() => setResetDialog(true)}
                    >
                        Reset Password
                    </Button>
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={!verified}
                autoHideDuration={60000}
                onClose={() => {
                    setVerified(true);
                    firebase.logout();
                }}
                message='Please, verify your e-mail address!'
                action={
                    <Button
                        color='primary'
                        className={classes.button}
                        onClick={() => firebase.reSend(email, password)}
                    >
                        Resend
                    </Button>
                }
            />
            <Dialog
                open={resetDialog}
                onClose={() => setResetDialog(false)}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle>
                    <Typography color='secondary' className={classes.dialogTitle}>
                        Reset your password for Spacy Hand Shooter
                    </Typography>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid item container justify='center' alignItems='center' className={classes.textFieldContainer}>
                        <TextField
                            variant='outlined'
                            className={classes.textField}
                            color='secondary'
                            label='E-mail address'
                            error={invalidEmail}
                            helperText={invalidEmail && 'Invalid e-mail!'}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        color='secondary'
                        variant='outlined'
                        className={classes.button}
                        onClick={() => {
                            if (emailRegExp.test(email)) {
                                firebase.resetPassword(email);
                                setResetDialog(false);
                            } else {
                                setInvalidEmail(true);
                            }
                        }}
                    >
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}