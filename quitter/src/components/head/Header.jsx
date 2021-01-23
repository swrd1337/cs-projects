import { useState } from 'react'; 
import { useSelector } from 'react-redux';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoginDialog from './LoginDialog';
import Profile from './Profile';
import WriteSomething from './WriteSomething';


const useStyles = makeStyles((theme) => ({
    container: {
        height: '18vh',
        backdropFilter: 'blur(50px)',
        borderRadius: '0px',
        border: '2px solid #ffffff0f'
    },
    button: {
        transition: '0.3s',
        border: '2px solid #ffffff0f',
        borderRadius: '20px',
        width: '28vh',
        backgroundColor: '#6f2b768c',
        '&:hover': {
            backgroundColor: '#6f2b768c',
            boxShadow: '0px 0px 15px 1px #191b1dcf'
        }
    }
}));

export default function Header() {
    const classes = useStyles();
    const user = useSelector(state => state.common.user)
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    return (
        <div>
            {
                user ? <Grid container item justify='space-between' alignItems='center' className={classes.container}>
                    <Profile />
                    <WriteSomething />
                </Grid> : <Grid container item justify='center' alignItems='center' className={classes.container}>
                    <Button variant='contained' disableElevation className={classes.button} onClick={handleOpen}>
                        <Typography color='primary' variant='button' noWrap>
                            LOGIN NOW
                        </Typography>
                    </Button>
                    <LoginDialog open={open} handleClose={handleClose} />
                </Grid>
            }
        </div>
    )
}