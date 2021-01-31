import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { EMAIL_REGEX, PASS_REGEX } from '../../constants/Patterns';
import CustomTextField from './CustomTextField';
import { useStyles } from './useStyles';


export default function Register(props) {
    const classes = useStyles();
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { setSignUpSelected } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (errors.emailError || errors.passError || errors.rePassError) {
            return;
        }

        fetch('/public/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: nickname,
                email: email,
                password: password,
                role: 'ROLE_USER'
            })
        }).then(response => {
            if (response.ok) {
                setSignUpSelected();
            } else {
                throw Error('Something went wrong... 😓😓😓');
            }
        }).catch(error => {
            setErrors({
                ...errors,
                main: error.message
            })
        })

    }

    const handleNickname = (e) => setNickname(e.target.value);

    const handleEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (!EMAIL_REGEX.test(value)) {
            setErrors({
                ...errors,
                emailError: 'Invalid e-mail address! 😅'
            })
        } else {
            const { emailError, ...err } = errors;
            setErrors(err);
        }
    }
    const handlePassword = (e) => {
        const pass = e.target.value;
        setPassword(pass);

        if (!PASS_REGEX.test(pass)) {
            setErrors({
                ...errors,
                passError: 'Password is weak! 😅'
            })
        } else {
            if (pass !== repeatPassword) {
                const { passError, ...err } = errors;
                setErrors({
                    ...err,
                    rePassError: 'Password doesn\'t match! 😅'
                });
            } else {
                const { passError, rePassError, ...err } = errors;
                setErrors(err);
            }
        }
    }

    const handleRepeatPassword = (e) => {
        const pass = e.target.value;
        setRepeatPassword(pass);
        if (pass !== password) {
            setErrors({
                ...errors,
                rePassError: 'Password doesn\'t match! 😅'
            })
        } else {
            const { rePassError, ...err } = errors;
            setErrors(err);
        }
    }

    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign Up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    {
                        errors.main && 
                            <Grid container justify='center' alignContent='center'>
                                <Typography color='error'>{errors.main}</Typography>
                            </Grid>
                    }
                    <CustomTextField
                        helperText={'Your account display name. 😉'}
                        variant='outlined'
                        margin='normal'
                        autoFocus
                        required
                        fullWidth
                        id='nickname'
                        label='Nickname'
                        name='nickname'
                        autoFocus
                        value={nickname}
                        onChange={handleNickname}
                    />
                    <CustomTextField
                        error={errors.emailError ? true : false}
                        helperText={errors.emailError}
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='username'
                        label='Email Address'
                        name='username'
                        value={email}
                        onChange={handleEmail}
                    />
                    <CustomTextField
                        error={errors.passError ? true : false}
                        helperText={errors.passError}
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        value={password}
                        onChange={handlePassword}
                    />
                    <CustomTextField
                        error={errors.rePassError ? true : false}
                        helperText={errors.rePassError}
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='repassword'
                        label='Repeat Password'
                        type='password'
                        id='repassword'
                        value={repeatPassword}
                        onChange={handleRepeatPassword}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href='#' variant='body2' className={classes.link} onClick={setSignUpSelected}>
                                Already have an account? Sign In
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Grid>
    );
}