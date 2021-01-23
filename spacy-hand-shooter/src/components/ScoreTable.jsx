import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
    text: {
        fontWeight: '200',
    },
})

export default function ScoreTable({ title, data, className }) {
    const classes = useStyles();

    return (
        <Grid container justify='center' className={className}>
            <Grid container item justify='center'>
                <Typography className={classes.text}>
                    {title}
                </Typography>
            </Grid>
            <Grid container item justify='center'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Name</TableCell>
                            <TableCell align='left'>Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((entry, index) => (
                            <TableRow key={entry.id}>
                                <TableCell className={classes.text}>{`${index + 1}. ${entry.userName}`}</TableCell>
                                <TableCell className={classes.text}>{entry.score}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
}