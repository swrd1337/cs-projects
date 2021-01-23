import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { getIMGFlipTemplates } from '../../api/imgflip';
import Grid from '@material-ui/core/Grid';
import { DialogTitle, Divider } from '@material-ui/core';
import Template from './Template';
import { withFirebase } from '../../context';


const useStyles = makeStyles((theme) => ({
    card: {
        transition: '0.3s',
        width: '70%',
        minHeight: '90vh',
        maxHeight: '90vh',
        backgroundColor: '#1c1e20',
        border: '2px solid #ffffff0f',
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            minWidth: '80%',
        },
        [theme.breakpoints.down('xs')]: {
            minWidth: '100%',
        },
    },
    dialogButton: {
        borderRadius: '20px',
        fontSize: '12px',
        height: '27px',
        marginRight: '5px',
        marginBottom: '5px'
    },
    templateContainer: {
        marginBottom: '20px',
        border: '2px solid #ffffff0f',
        borderRadius: '10px',
        backgroundColor: '#23262b',
        padding: '10px'
    },
    tempalteImg: {
        margin: '10px',
        width: '40vh',
        '&:hover': {
            boxShadow: '0px 0px 6px 1px #4c5969',
            cursor: 'pointer'
        },
        transition: '0.3s'
    },
}));

function IMGFlipTemplatesDialog(props) {
    const { open, handleClose, isSelector, firebase } = props;
    const classes = useStyles();

    const [templates, setTemplates] = useState(null);

    const getData = async () => {
        if (isSelector) {
            firebase.getUserMemes(memes => {
                setTemplates(memes.sort((a, b) => new Date(b.date) - new Date(a.date)));
            })
        } else {
            const response = await getIMGFlipTemplates();
            setTemplates(response.data.memes.sort(() => Math.random() - 0.5));
        }
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (open && isSelector) {
            getData();
        }
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            classes={{ paper: classes.card }}
        >
            <DialogTitle>
                {isSelector ? 'My Memes 💣' : 'ImageFlip Templates'}
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Grid container>
                    {templates && templates.map(template =>
                        <Template
                            key={template.id}
                            template={template}
                            handleClose={handleClose}
                            isSelector={isSelector}
                        />)}
                </Grid>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button
                    onClick={() => handleClose(true)}
                    disableElevation
                    variant='outlined'
                    color='primary'
                    className={classes.dialogButton}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withFirebase(IMGFlipTemplatesDialog);