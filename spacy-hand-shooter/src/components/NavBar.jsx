import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import firebase from '../firebase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../actions/common';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        margin: '1em',
        borderRadius: '25px',
        width: 'auto',
        boxShadow: '5px 5px 11px #353a42, -3px -5px 11px #545a66'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontWeight: '200'
    },
    button: {
        fontWeight: '200',
        borderRadius: '25px'
    },
    link: {
        '&:hover': {
            textDecoration: 'unset',
        }
    },
    score: {
        fontWeight: '200',
        marginRight: '4em',
    }
}));

const SpacyMenu = withStyles((theme) => ({
    paper: {
        border: '1px solid',
        borderColor: theme.palette.secondary.main,
        borderRadius: '15px',
        backgroundColor: theme.palette.primary.main
    },
}))((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));


export default function ButtonAppBar(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const score = useSelector(state => state.common.score);
    const user = useSelector(state => state.common.user);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = e => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => {
        localStorage.removeItem('authUser');
        firebase.logout();
        dispatch(setUser({ user: null }));
        window.location.pathname = '/login';
    }

    return (
        <div className={classes.root}>
            <AppBar position='static' color='primary' className={classes.appBar}>
                <Toolbar>
                    <Grid container justify='space-between' alignContent='center' alignItems='center'>
                        <Grid item>
                            <Typography variant='h6' color='secondary' className={classes.title}>
                                <Link href='/' color='secondary' className={classes.link}>
                                    <span role='img' aria-label='Alien'>🛸</span> Spacy Hand Shooter
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            {
                                window.location.pathname === '/game' && (
                                    <Typography className={classes.score}>
                                        Score: {score}
                                    </Typography>
                                )
                            }
                        </Grid>
                        <Grid item>
                            {
                                user ?
                                    (<div>
                                        <Button
                                            color='secondary'
                                            className={classes.button}
                                            onClick={handleClick}
                                        >
                                            {`Hello, ${user.displayName}`}
                                        </Button>
                                        <SpacyMenu
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            className={classes.menu}
                                        >
                                            <MenuItem onClick={handleLogout}>
                                                <Typography color='secondary' variant='button' className={classes.title}>
                                                    <span role='img' aria-label='Alien'>🔒</span> Logout
                                                </Typography>
                                            </MenuItem>
                                        </SpacyMenu>
                                    </div>)
                                    :
                                    <div>
                                        <Button
                                            variant='outlined'
                                            color='secondary'
                                            className={classes.button}
                                            href='/login'
                                        >
                                            Login
                                        </Button>
                                    </div>
                            }
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}