import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { withFirebase } from '../../context';
import { useDispatch, useSelector } from 'react-redux';
import { updatePosts } from '../../actions/common';
import MdDialog from './MdDialog';
import IMGFlipTemplatesDialog from './IMGFlipTemplatesDialog';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto 2.5em',
    },
    button: {
        transition: '0.3s',
        borderRadius: '20px',
        border: '2px solid #1c1e205c',
        '&:hover': {
            boxShadow: '0px 0px 15px 1px #191b1dcf'
        }
    },
    card: {
        transition: '0.3s',
        minWidth: '55%',
        minHeight: '60vh',
        backdropFilter: 'blur(40px)',
        backgroundColor: '#ffffff0f',
        border: '2px solid #ffffff0f',
        borderRadius: '26px',
        [theme.breakpoints.down('sm')]: {
            minWidth: '80%',
        },
        [theme.breakpoints.down('xs')]: {
            minWidth: '100%',
        }
    },
    dialogButton: {
        borderRadius: '20px',
        fontSize: '12px',
        height: '27px',
        marginRight: '5px',
        marginBottom: '5px'
    },
}));

function WriteSomething(props) {
    const { firebase } = props;

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [openTemplatesDialog, setOpenTemplatesDialog] = useState(false);

    const meme = useSelector(state => state.common.meme);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (meme) {
            setValue(value + `\n![meme](${meme})`);
            setOpen(true);
        }
    }, [meme]);

    const handleTemplatesDialog = () => {
        setOpenTemplatesDialog(true);
        handleOpen();
    }
    
    const closeTemplatesDialog = openEditor => {
        setOpenTemplatesDialog(false);
        if (openEditor) {
            handleOpen();
        }
    }

    const handleClick = () => {
        setOpen(true);
    }

    const handleOpen = () => {
        setOpen(!open);
    }

    const handlePublish = async () => {
        if (value) {
            await firebase.addPost(value)
            setValue('');
            setOpen(false);
            dispatch(updatePosts({ update: true }));
        }
    }

    return (
        <Grid className={classes.container}>
            <Button variant='contained' color='primary' disableElevation className={classes.button} onClick={handleClick}>
                <Typography noWrap variant='button'>
                    Write something new! 📝
                </Typography>
            </Button>
            <MdDialog
                open={open}
                value={value}
                setValue={setValue}
                handleOpen={handleOpen}
                handleClose={handleOpen}
                handlePublish={handlePublish}
                handleTemplatesDialog={handleTemplatesDialog}
            />
            <IMGFlipTemplatesDialog
                open={openTemplatesDialog}
                handleClose={closeTemplatesDialog}
            />
        </Grid>
    )
}

export default withFirebase(WriteSomething);