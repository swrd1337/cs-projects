import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import firebase from '../firebase';
import Divider from '@material-ui/core/Divider';

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
    title: {
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
    }
}));

const emailRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export default function RegisterPage(props) {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState(false);
    const [validation, setValidation] = useState({
        name: true,
        email: true,
        password: true,
        rePassword: true
    });

    const onNameChange = event => {
        const value = event.target.value;
        let nameValidation = true;
        if (value.length < 3) {
            nameValidation = false;
        }
        setName(value);
        setValidation({
            ...validation,
            name: nameValidation
        });
    };

    const onEmailChange = event => {
        const value = event.target.value;
        let emailValidation = false;
        if (emailRegExp.test(value)) {
            emailValidation = true;
        }
        setEmail(value);
        setValidation({
            ...validation,
            email: emailValidation
        });
    };

    const onPasswordChange = event => {
        const value = event.target.value;
        let passwordValidation = false;
        if (passwordRegExp.test(value)) {
            passwordValidation = true;
        }
        setPassword(value);
        setValidation({
            ...validation,
            password: passwordValidation
        });
    };

    const onRePasswordChange = event => {
        const value = event.target.value;
        let rePasswordValidation = false;
        if (value === password) {
            rePasswordValidation = true;
        }
        setRePassword(value);
        setValidation({
            ...validation,
            rePassword: rePasswordValidation
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault()
        let valid = true;
        for (const key in validation) {
            if (!validation[key]) {
                valid = false;
            }
        }

        if (name && email && password && rePassword && valid) {
            try {
                await firebase.register(name, email, password);
                props.history.replace('/login');
            } catch {
                setError(true);
            }
        } else {
            setValidation({
                name: false,
                email: false,
                password: false,
                rePassword: false
            });
            setError(true);
        }
    }

    return (
        <Grid container justify='center' alignContent='center' alignItems='center'>
            <Grid id='register-container' className={classes.registerContainer}>
                <Grid item container justify='center' alignItems='center' className={classes.titleContainer}>
                    <Typography color='secondary' variant='h4' className={classes.title}>
                        Registration Form
                    </Typography>
                </Grid>
                <Divider />
                {error && (<Grid container item justify='center' alignItems='center'>
                    <Typography color='error' variant='body2' className={classes.title}>
                        Something went wrong! <span role='img' aria-label='Sad face'>😥😥😥</span>
                    </Typography>
                </Grid>)}
                <form onSubmit={onSubmit}>
                    <Grid item container justify='center' alignItems='center' className={classes.textFieldContainer}>
                        <TextField
                            variant='outlined'
                            className={classes.textField}
                            color='secondary'
                            label='Your name'
                            value={name}
                            error={validation && !validation.name}
                            helperText={validation && !validation.name && 'Invalid name!'}
                            onChange={onNameChange}
                        />
                    </Grid>
                    <Grid item container justify='center' alignItems='center' className={classes.textFieldContainer}>
                        <TextField
                            variant='outlined'
                            className={classes.textField}
                            color='secondary'
                            label='E-mail address'
                            value={email}
                            error={validation && !validation.email}
                            helperText={validation && !validation.email && 'Invalid e-mail address!'}
                            onChange={onEmailChange}
                        />
                    </Grid>
                    <Grid item container justify='center' alignItems='center' className={classes.textFieldContainer}>
                        <TextField
                            variant='outlined'
                            className={classes.textField}
                            color='secondary'
                            label='Password'
                            type='password'
                            error={validation && !validation.password}
                            helperText={validation && !validation.password && 'Please, use stronger password!'}
                            onChange={onPasswordChange}
                        />
                    </Grid>
                    <Grid item container justify='center' alignItems='center' className={classes.textFieldContainer}>
                        <TextField
                            variant='outlined'
                            className={classes.textField}
                            color='secondary'
                            label='Repeat password'
                            type='password'
                            error={validation && !validation.rePassword}
                            helperText={validation && !validation.rePassword && `Passwords don't match!`}
                            onChange={onRePasswordChange}
                        />
                    </Grid>
                    <Grid item container justify='space-evenly' alignItems='center' className={classes.buttonsContainer}>
                        <Button
                            color='secondary'
                            className={classes.button}
                            type='submit'
                            variant='outlined'
                        >
                            Submit
                    </Button>
                    </Grid>
                </form>
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
                        onClick={() => props.history.replace('/login')}
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}