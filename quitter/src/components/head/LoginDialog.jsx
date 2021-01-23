import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions/common';
import { withFirebase } from '../../context';

const useStyles = makeStyles((theme) => ({
    container: {
        height: 'auto',
    },
    card: {
        transition: '0.3s',
        width: '30%',
        minHeight: '30vh',
        backdropFilter: 'blur(40px)',
        backgroundColor: '#ffffff0f',
        border: '2px solid #ffffff0f',
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
    closeButton: {
        borderRadius: '20px',
        fontSize: '12px',
        height: '27px',
        marginRight: '5px',
        marginBottom: '5px'
    },
    authButton: {
        margin: 'auto',
        borderRadius: '20px',
        width: '26vh',
        justifyContent: 'space-evenly'
    },
    authContainer: {
        marginTop: 'auto',
    },
    icon: {
        width: '20px',
        height: '20px'
    }
}));

function LoginDialog(props) {
    const { open, handleClose, firebase } = props;

    const classes = useStyles();

    const dispatch = useDispatch();

    const doLogin = async loginCallback => {
        await loginCallback();
        const user = firebase.getUser();
        dispatch(setUser({ user: user }));
    }


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                classes={{ paper: classes.card, container: classes.container }}
            >
                <DialogContent>
                    <Grid container alignItems='center' spacing={2} className={classes.authContainer}>
                        <Grid item container>
                            <Button variant='contained' disableElevation className={classes.authButton} onClick={() => doLogin(firebase.githubLogin)}>
                                <img className={classes.icon} alt='GitHub' src='https://img.icons8.com/fluent-systems-filled/24/000000/github.png' />
                                GitHub
                            </Button>
                        </Grid>
                        <Grid item container>
                            <Button variant='contained' disableElevation className={classes.authButton} onClick={() => doLogin(firebase.googleLogin)}>
                                <img className={classes.icon} alt='Google' src='https://img.icons8.com/material-sharp/24/000000/google-logo.png' />
                                Google
                            </Button>
                        </Grid>
                        <Grid item container>
                            <Button variant='contained' disableElevation className={classes.authButton} onClick={() => doLogin(firebase.facebookLogin)}>
                                <img className={classes.icon} alt='Facebook' src='https://img.icons8.com/android/24/000000/facebook-new.png' />
                                Facebook
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='outlined' color='primary' className={classes.closeButton}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withFirebase(LoginDialog);