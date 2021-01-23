import { useState } from 'react';
import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import MDEditor from '@uiw/react-md-editor';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { updatePosts } from '../../actions/common';
import MdDialog from '../head/MdDialog';
import { withFirebase } from '../../context';

const useStyles = makeStyles((theme) => ({
    paper: {
        minWidth: '27em',
        width: '80%',
        minHeight: '18vh',
        borderRadius: '10px',
        boxShadow: '0px 7px 10px -3px #191b1dcf',
        backgroundColor: theme.palette.background.primary,
        margin: '25px auto',
        border: '2px solid #ffffff0f',
    },
    toolContainer: {
        height: '6vh'
    },
    mdContainer: {
        padding: '25px 20px',
        wordBreak: 'break-all'
    },
    info: {
        margin: 'auto 30px',
    },
    utils: {
        margin: 'auto 10px',
        width: '22vh'
    },
    button: {
        borderRadius: '20px',
        fontSize: '9px',
        height: '22px',
    }
}));


function Post(props) {
    const { data, firebase } = props;

    const classes = useStyles();
    const user = useSelector(state => state.common.user);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(data.content);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handlePublish = async () => {
        if (value) {
            await firebase.updatePostById(data.id, value);
            setOpen(false);
            dispatch(updatePosts({ update: true }));
        }
    }

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const date = new Date(data.date).toLocaleDateString('en-US', options);

    const handleClick = async () => {
        await firebase.deletePost(data.id);
        dispatch(updatePosts({ update: true }));
    }

    return (
        <Grid item container justify='center'>
            <Paper className={classes.paper}>
                <Grid item container justify='space-between' className={classes.toolContainer}>
                    <Grid item className={classes.info}>
                        <Typography variant='body2'>
                            {`${data.user} at ${date}`}
                        </Typography>
                    </Grid>
                    {
                        (user && user.uid === data.userId) && (
                            <Grid item container className={classes.utils} justify='space-evenly'>
                                <Grid item>
                                    <Button variant='outlined' className={classes.button} disableElevation onClick={handleOpen}>
                                        Edit
                                     </Button>
                                </Grid>
                                <MdDialog
                                    open={open}
                                    value={value}
                                    setValue={setValue}
                                    handleClose={handleClose}
                                    handlePublish={handlePublish}
                                    editPost={true}
                                />
                                <Grid item>
                                    <Button variant='outlined' className={classes.button} onClick={handleClick} disableElevation>
                                        Remove
                                    </Button>
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>
                <Divider />
                <Grid item container justify='center' className={classes.mdContainer}>
                    <MDEditor.Markdown source={data.content} />
                </Grid>
            </Paper>
        </Grid>
    );
} 

export default withFirebase(Post);