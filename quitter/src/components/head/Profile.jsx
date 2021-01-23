import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withFirebase } from '../../context';
import { setMeme, setUser } from '../../actions/common';
import IMGFlipTemplatesDialog from './IMGFlipTemplatesDialog';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    container: {
        marginLeft: '20px',
        width: '30%'
    },
    nameButton: {
        borderRadius: '22px',
        whiteSpace: 'nowrap'
    },
    displayName: {
        textTransform: 'none'
    },
    paper: {
        marginTop: '45px',
        width: '10em',
        backdropFilter: 'blur(40px)',
        backgroundColor: '#ffffff0f',
        border: '2px solid #ffffff0f',
        borderRadius: '26px',
    }
}));

function Profile(props) {
    const { firebase } = props; 

    const classes = useStyles();
    const dispatch = useDispatch();

    const user = useSelector(state => state.common.user);
    const [anchorEl, setAnchorEl] = useState(null);
    const [memeSelector, setMemeSelector] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openMemeSelector = () => {
        dispatch(setMeme({ meme: null }));
        setMemeSelector(true);
    }

    const closeMemeSelector = () => {
        setMemeSelector(false);
        setAnchorEl(null);
    }

    const logout = async () => {
        await firebase.logout();
        dispatch(setUser({ user: null }));
        handleClose();
    }

    return (
        <Grid 
            item 
            container 
            justify='flex-start' 
            alignItems='center'
            className={classes.container} 
            spacing={2}
            wrap='nowrap'
        >
            <Grid item>
                <Avatar src={user.photoURL} className={classes.avatar} />
            </Grid>
            <Grid item>
                <Button className={classes.nameButton} onClick={handleClick} disableElevation>
                    <Typography className={classes.displayName}>
                        {user.displayName}
                    </Typography>
                </Button>
            </Grid>
            <Menu
                id='user_menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                classes={{
                    paper: classes.paper
                }}
            >
                <MenuItem onClick={openMemeSelector}>My Memes 💣</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
            <IMGFlipTemplatesDialog
                open={memeSelector}
                handleClose={closeMemeSelector}
                isSelector={true}
            />
        </Grid>
    )
}

export default withFirebase(Profile);