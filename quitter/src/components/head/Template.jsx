import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Collapse, Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { postIMGFlipCaption } from '../../api/imgflip';
import { useDispatch } from 'react-redux';
import { setMeme } from '../../actions/common';
import { withFirebase } from '../../context';

const useStyles = makeStyles((theme) => ({
    templateContainer: {
        marginBottom: '20px',
        border: '2px solid #ffffff0f',
        borderRadius: '10px',
        backgroundColor: '#23262b',
        padding: '10px'
    },
    tempalteImg: {
        margin: '10px',
        width: '93%',
        '&:hover': {
            boxShadow: '0px 0px 6px 1px #4c5969',
            cursor: 'pointer'
        },
        transition: '0.3s'
    },
    textContainer: {
        margin: '10px auto',
    },
    collpase: {
        width: '100%'
    },
    dialogButton: {
        borderRadius: '20px',
        fontSize: '12px',
        height: '27px',
        marginTop: '15px',
        marginBottom: '15px',
    },
}));

function Template(props) {
    const { template, handleClose, firebase, isSelector } = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({});

    const handleTemplateClick = () => {
        if (isSelector) {
            dispatch(setMeme({ meme: template.url }));
            handleClose();
        } else {
            setOpen(!open);
            if (!open) {
                const element = document.getElementById(`${template.id}_field_0`);
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    const handleChange = (e, index) => {
        setValues({
            ...values,
            [index]: e.target.value
        });
    };

    const onSubmit = async () => {
        if (Object.entries(values).length) {
            const response = await postIMGFlipCaption(values, template.id);
            setValues({});
            setOpen(false);
            handleClose();
            if (response) {
                dispatch(setMeme({ meme: response.data.url }));
                firebase.addMeme(response.data.url);
            }
        }
    };

    const boxCounter = [...Array(template['box_count']).keys()];

    return (
        <Grid
            key={template.id}
            className={classes.templateContainer}
            container
            item
            xs={12}
            justify='center'
            direction='column'
            alignItems='center'
        >
            <Typography>
                {template.name}
            </Typography>
            <img
                src={template.url}
                alt='Meme Template'
                className={classes.tempalteImg}
                onClick={handleTemplateClick}
            />
            <Collapse in={open} classes={{ container: classes.collpase }}>
                <Typography>
                    Enter your text for the meme:
                </Typography>
                {boxCounter && boxCounter.map(index =>
                    <Grid
                        key={`${index}_${template.id}`}
                        item
                        container
                        className={classes.textContainer}
                    >
                        <TextField
                            fullWidth
                            id={`${template.id}_field_${index}`}
                            label={`Text ${index + 1}`}
                            value={values[index] ? values[index] : ''}
                            onChange={(e) => handleChange(e, index)}
                        />
                    </Grid>)}
                <Grid item container justify='center'>
                    <Button
                        disableElevation
                        variant='contained'
                        color='primary'
                        className={classes.dialogButton}
                        onClick={onSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </Collapse>
        </Grid>
    )
}

export default withFirebase(Template);