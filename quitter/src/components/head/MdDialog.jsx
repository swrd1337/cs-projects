import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import MDEditor from '@uiw/react-md-editor';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { getLanguages, checkText } from '../../api/languageTool';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import SpellCheckReplacements from './SpellCheckReplacements';
import { withFirebase } from '../../context';

const useStyles = makeStyles((theme) => ({
    card: {
        transition: '0.3s',
        minWidth: '55%',
        minHeight: '92vh',
        maxHeight: '92vh',
        backdropFilter: 'blur(40px)',
        backgroundColor: '#ffffff0f',
        border: '2px solid #ffffff0f',
        borderRadius: '10px',
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
    selectForm: {
        marginLeft: '15px'
    },
    spellcheckContainer: {
        marginTop: '12px',
        marginBottom: '12px',
        border: '2px solid #ffffff0f',
        borderRadius: '10px',
        backgroundColor: '#23262b',
        padding: '5px 10px',
        minHeight: '17vh'
    },
    spellTitleContainer: {
        marginBottom: '2px',
    },
    spellHintContainer: {
        margin: '5px auto',
    },
    spellMessage: {
        fontWeight: '300'
    },
    context: {
        fontWeight: '700'
    },
    hintText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}));

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: '22em',
            backdropFilter: 'blur(40px)',
            backgroundColor: 'rgba(0, 0, 0, 0.54)',
            border: '2px solid #ffffff0f',
            borderRadius: '0px',
        }
    }
};

export default function MdDialog(props) {
    const { open, handleOpen, handleClose, handlePublish, setValue, value, handleTemplatesDialog, editPost } = props;
    const classes = useStyles();

    const [languages, setLanguages] = useState(null);
    const [language, setLanguage] = useState(navigator.language || navigator.userLanguage);
    const [spellcheck, setSpellcheck] = useState(null);

    useEffect(async () => {
        if (!languages) {
            const data = await getLanguages();
            setLanguages(data);
        }
    }, []);

    const handleLanguageChange = e => {
        setLanguage(e.target.value)
    };

    const verifyTextValue = async v => {
        if (v) {
            let text = v.replace(/!\[(.*?)\]\((.*?)\)/g, '');
            text = text.replace(/(?:__|[*#])|\[(.*?)\]\(.*?\)/g, '');
            text = text.replace(/[^A-Za-z\s\d]+/g, '');
            text = text.replace(/(\s\s+)|(\n)/g, ' ').trim();
            const data = await checkText(language, text);
            setSpellcheck(data.matches);
        }
    };

    const handleMDChange = v => {
        setValue(v);
        verifyTextValue(v);
    }

    const fixValue = (newValue, oldValue) => {
        const fixedValue = value.replace(oldValue, newValue);
        setValue(fixedValue);
        verifyTextValue(fixedValue);
    }
    return (
        <Dialog
            open={open}
            onClose={handleOpen}
            classes={{ paper: classes.card }}
        >
            <DialogContent>
                <MDEditor
                    height='400'
                    visiableDragbar={false}
                    value={value}
                    onChange={handleMDChange}
                />
                <Grid container className={classes.spellcheckContainer}>
                    <Grid item container className={classes.spellTitleContainer}>
                        <Typography variant='subtitle1'>Spellchecking ✔</Typography>
                    </Grid>
                    <Grid item container >
                        { (spellcheck && spellcheck.length) ? spellcheck.map(({ rule, offset, length, message, replacements, sentence }, index) =>
                            <Grid item container justify='space-between' alignItems='center' wrap='nowrap' key={`lang_hint${index}`} className={classes.spellHintContainer}>
                                <Tooltip title={rule.description}>
                                    <Typography variant='subtitle2' className={classes.hintText}>
                                        😔 <span className={classes.context}>{sentence.substring(offset, offset + length)}</span> - {message}
                                    </Typography>
                                </Tooltip>
                                <SpellCheckReplacements
                                    replacements={replacements.slice(0, 10)}
                                    handleHintClick={v => fixValue(v, sentence.substring(offset, offset + length))}
                                />
                            </Grid>) 
                            :
                            <Grid item container justify='center'>
                                <Typography variant='subtitle2'>You're doing great! 🌞</Typography>
                            </Grid>

                            }
                    </Grid>
                </Grid>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Grid container justify='space-between'>
                    <Grid item>
                        {
                            languages &&
                            <FormControl
                                classes={{
                                    root: classes.selectForm,
                                }}
                            >
                                <Select
                                    value={language}
                                    onChange={handleLanguageChange}
                                    MenuProps={MenuProps}
                                >
                                    {languages.map(({ name, longCode }) => <MenuItem key={longCode} value={longCode}>{name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        }
                    </Grid>
                    <Grid item>
                        {
                            !editPost &&
                            <Button onClick={handleTemplatesDialog} disableElevation variant='contained' color='primary' className={classes.dialogButton}>
                                ImageFlip
                            </Button>
                        }
                        <Button onClick={handlePublish} disableElevation variant='outlined' color='primary' className={classes.dialogButton}>
                            {editPost ? 'Save Changes' : 'Publish'}
                        </Button>
                        <Button onClick={handleClose} disableElevation variant='outlined' color='primary' className={classes.dialogButton}>
                            Close
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}