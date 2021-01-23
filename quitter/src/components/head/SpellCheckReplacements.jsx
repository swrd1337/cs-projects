import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    button: {
        borderRadius: '8px'
    },
    paper: {
        mamaxHeight: '22em',
        backdropFilter: 'blur(40px)',
        backgroundColor: 'rgba(35, 38, 43, 0.71)',
        border: '2px solid #ffffff0f',
        borderRadius: '0px',
    }
}));

function SpellCheckReplacements({ replacements, handleHintClick }) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            { (replacements && replacements.length > 0) &&
                <Button className={classes.button} onClick={handleClick} disableElevation>
                    <Typography variant='button'>
                        Fix 🔨
                    </Typography>
                </Button>
            }
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                classes={{
                    paper: classes.paper
                }}
            >
                {
                    (replacements && replacements.length > 0) && replacements.map(({ value, shortDescription }, index) =>
                        <MenuItem key={`${index}_replace`} onClick={
                            () => {
                                setAnchorEl(null);
                                handleHintClick(value);
                            }
                        }>
                            {value} {shortDescription ? `(${shortDescription})` : ''}
                        </MenuItem>)
                }
            </Menu>
        </div>
    )
}

export default SpellCheckReplacements;