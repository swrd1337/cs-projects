import React from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
    paper: {
        margin: '2em',
    },
    title: {
        margin: '1em'  
    }
})



export default function ConnectedPlayers({ connectedPlayers }) {
    const classes = useStyles();

    return (
        <Grid container item justify='center'>
            <Grid container item justify='center' className={classes.title}>
                <Typography variant='h6' color='primary'>Online Players</Typography>
            </Grid>
            <Paper elevation={3} className={classes.paper}>
                <Grid container item justify='center'>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>
                                    <Typography variant='subtitle1' color='primary'>Username</Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    <Typography variant='subtitle1' color='primary'>Username</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {connectedPlayers && connectedPlayers.map((player) => (
                                <TableRow key={player.username}>
                                    <TableCell align='center'>
                                        <Typography variant='body1'>{player.username}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <div style={{
                                            minWidth: '100px',
                                            minHeight: '45px',
                                            backgroundColor: player.color
                                        }} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
            </Paper>
        </Grid>
    )

}