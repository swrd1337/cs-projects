import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    paper: {
        margin: '2em',
    },
    container: {
        padding: '1em',
        width: '8em',
    },
    actionsContainer: {
        padding: '1em',
        width: '36em',
    },
    userContainer: {
        width: '8em',
        height: '3em',
    },
    text: {
        fontWeight: '300'
    },
    button: {
        height: '3em',
        width: '10em',
        margin: '10px'
    }
})



export default function UserBar({ username, playersNumber, player, setPlayer, setActiveSkill, activeSkill, tableBoard }) {
    const classes = useStyles();

    useEffect(() => {
        fetch(`/current?username=${username}`).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                setPlayer(data);
            }
        });
    }, [tableBoard]);

    return (
        <Grid container item justify='center'>
            <Paper elevation={3} className={classes.paper}>
                <Grid container item justify='center'>
                    <Grid container item justify='center' className={classes.container}>
                        <Grid container item justify='center' alignContent='center' className={classes.user} style={{
                            backgroundColor: player && player.color,
                        }}>
                            <Typography color='inherit' variant='h6' className={classes.text} style={{ color: '#ffffff' }}>
                                {username}
                            </Typography>
                        </Grid>
                        <Grid container item justify='center' alignContent='center'>
                            <Typography className={classes.text} variant='subtitle2'>
                                {`Players: ${playersNumber} / 5`}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item justify='center' className={classes.actionsContainer}>
                        <Button 
                            variant={activeSkill === 'doubleMove' ? 'contained' : 'outlined'}
                            color='primary'
                            className={classes.button}
                            disabled={player && !player.doubleMove}
                            onClick={() => {setActiveSkill(activeSkill === 'doubleMove' ? null : 'doubleMove');}}
                        >
                            Double Move
                        </Button>
                        <Button
                            variant={activeSkill === 'substitution' ? 'contained' : 'outlined'}
                            color='primary'
                            className={classes.button}
                            disabled={player && !player.substitution}
                            onClick={() => {setActiveSkill(activeSkill === 'substitution' ? null : 'substitution');}}
                        >
                            Substitution
                        </Button>
                        <Button
                            variant={activeSkill === 'freedom' ? 'contained' : 'outlined'}
                            color='primary'
                            className={classes.button}
                            disabled={player && !player.freedom}
                            onClick={() => {setActiveSkill(activeSkill === 'freedom' ? null : 'freedom');}}
                        >
                            Freedom
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )

}