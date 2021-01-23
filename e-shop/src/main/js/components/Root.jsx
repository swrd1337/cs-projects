import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { Grid } from '@material-ui/core';
import SubheaderComponent from './SubheaderComponent';
import ProductsContainer from './ProductsContainer';
import { PRIMARY_1 } from '../constants/Colors';
import DrawerContent from './DrawerContent';
import CategoryIcon from '@material-ui/icons/CategoryOutlined';
import Divider from '@material-ui/core/Divider';
import UserComponent from './UserComponent';
import LockOpenIcon from '@material-ui/icons/LockOpen';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        minHeight: '100vh',
    },
    appBar: {
        backgroundColor: PRIMARY_1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        marginLeft: theme.spacing(3),
    },
    drawerTitle: {
        color: PRIMARY_1,
        padding: '1.1em',
        borderBottom: '2px solid',
    },
    titleIcon: {
        margin: 'auto 10px',
        fontSize: '30px',
    },
    drawer: {
        minWidth: '20em',
    },
}));

export default function Root() {
    const classes = useStyles();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [category, setCategory] = useState(null);
    const [user, setUser] = useState(null);
    const [reload, setReload] = useState(false);
    const [basket, setBasket] = useState(null);

    useEffect(() => {
        if (user) {
            getBasketItems();
        } else {
            getMe();
        }
    }, [user]);

    const getMe = () => {
        fetch('/auth/api/user/me', {
            method: 'GET',
        }).then(response => {
            if (response.ok) {
                return response.json();
            } 
        }).then(data => {
            setUser(data);
        });
    };

    const getBasketItems = () => {
        fetch(`/auth/api/basket/products?userId=${user.id}`, {
            method: 'GET'
        }).then(response => {
            if (response.status && response.status === 200) {
                return response.json();
            }
        }).then(data => {
            setBasket(data);
        });
    }

    return (
        <div className={classes.root}>
            <React.Fragment>
                <CssBaseline />
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge='start'
                            className={classes.menuButton}
                            color='inherit'
                            aria-label='menu'
                            onClick={() => setDrawerOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Grid container justify='flex-end'>
                            {
                                user ? <UserComponent 
                                            user={user}
                                            basket={basket}
                                            setBasket={setBasket}
                                            getBasketItems={getBasketItems}
                                        /> : <IconButton color='inherit' href='/login'> 
                                    <LockOpenIcon/>
                                </IconButton>
                            }
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Drawer
                    open={isDrawerOpen}
                    onClose={() => setDrawerOpen(false)}
                >
                    <Grid container className={classes.drawer}>
                        <Grid item container justify='center' alignItems='center' alignContent='center' className={classes.drawerTitle}>
                            <CategoryIcon style={{ marginRight: '5px' }} />
                            <Typography variant='h6' >
                                Categories
                            </Typography>
                        </Grid>
                        <Divider />
                        <Grid item container>
                            <DrawerContent setCategory={setCategory} setDrawerOpen={setDrawerOpen} category={category} />
                        </Grid>
                    </Grid>
                </Drawer>
                <Grid container component='main'>
                    <SubheaderComponent />
                    <ProductsContainer user={user} category={category} basket={basket} getBasketItems={getBasketItems}/>
                </Grid>
            </React.Fragment>
        </div>
    );
}