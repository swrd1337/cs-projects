import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function WinnerDialog({ winner, setWinner }) {
    return (
        <Dialog
            open={Boolean(winner)}
            onClose={() => { setWinner(null); }}
        >
            <DialogTitle>{'Game Over'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {winner}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setWinner(null); }} color='primary' variant='outlined'>
                    {'Close'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}