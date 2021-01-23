import React from 'react';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    container: {
        borderTop: '1px solid',
        borderColor: theme.palette.secondary.main,
        position: 'fixed',
        left: '0',
        bottom: '0',
        height: '28px',
        backgroundColor: theme.palette.primary.main,
    },
    text: {
        fontWeight: '200',
        fontSize: '12px'
    }
}));


export default function Footer() {
    const classes = useStyles();

    return (
        <Grid container justify='center' alignContent='center' alignItems='center' className={classes.container}>
            <Typography className={classes.text}>
               (。・∀・)ノ Created by Alexei Bunazov
               (github: <Link target='_blank' href='https://github.com/swrd1337' color='secondary'>swrd1337</Link>).
               More about <Link target='_blank' href='https://en.wikipedia.org/wiki/Deep_learning' color='secondary'> Deep Learning</Link>.
            </Typography>
        </Grid>
    );
}