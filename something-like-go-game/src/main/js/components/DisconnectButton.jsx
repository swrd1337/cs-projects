import React from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    button: {
        fontWeight: '300'
    }
})

export default function DisconnectButton({ stompClient, isGameRunning, setGame, username }) {
    const classes = useStyles();

    const handeClick = () => {
        setGame(false);
        if (stompClient) {
            stompClient.send('/app/connect', {}, username);
            stompClient.send('/app/board', {}, JSON.stringify({
                rowIndex: -9,
                colIndex: -9
            }));
            setTimeout(() => {
                stompClient.disconnect();
            }, 1000);
        }
    }

    return (
        <div>
            {isGameRunning &&
                <Button
                    onClick={handeClick}
                    color='inherit'
                    className={classes.button}
                >
                    Disconnect
                </Button>
            }
        </div>
    );
}