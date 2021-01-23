import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    text: {
        fontWeight: '200',
    },
    button: {
        fontWeight: '200',
        borderRadius: '25px',
        minWidth: '17em'
    },
    loginIconContainer: {
        display: 'flex',
        margin: 'auto',
    }
}));


export default function SocialLoginButton({ logoUrl, label, alt, onClick }) {
    const classes = useStyles();

    return (
        <Grid item>
            <Button
                color='secondary'
                onClick={onClick}
                variant='outlined'
                className={classes.button}
            >
                <Grid container justify='center'>
                    <div className={classes.loginIconContainer}>
                        <img src={logoUrl} alt={alt} width='16' />
                    </div>
                    <Typography className={classes.text}>
                        {label}
                    </Typography>
                </Grid>
            </Button>
        </Grid>
    );
}