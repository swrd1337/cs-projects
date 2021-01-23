import React, { useEffect, useState } from 'react';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import NavBar from './components/NavBar';
import GameContainer from './components/GameContainer';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './actions/common';
import { makeStyles } from '@material-ui/core/styles';

// https://colorhunt.co/palette/117601 - Pallete
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#393e46',
        },
        secondary: {
            main: '#4ecca3',
        },
        type: 'dark',
        background: {
            default: '#232931',
        }
    },
});

const useStyles = makeStyles({
    root: {
        minHeight: 'calc(100vh - 1em)',
        backgroundImage: 'url(/bg.png)',
    },
    main: {
        marginBottom: '5em'
    }
})

export default function App() {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        const user = localStorage.getItem('authUser');
        if (user) {
            dispatch(setUser({ user: JSON.parse(user) }));
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.root}>
                <NavBar />
                <main className={classes.main}>
                    <Router>
                        <Switch>
                            <Route exact path='/' component={HomePage} />
                            <Route exact path='/game' component={GameContainer} />
                            <Route exact path='/login' component={LoginPage} />
                            <Route exact path='/register' component={RegisterPage} />
                            <Route component={NotFound} />
                        </Switch>
                    </Router>
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </ThemeProvider>
    );
}