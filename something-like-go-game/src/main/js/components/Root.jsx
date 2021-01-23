import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Board from './Board';
import DisconnectButton from './DisconnectButton';
import Snackbar from '@material-ui/core/Snackbar';
import WinnerDialog from './WinnerDialog';

const useStyles = makeStyles((theme) => ({
    connectTitle: {
        color: '#2F4F4F',
        fontWeight: '300',
        marginBottom: '3em'
    },
    appBarTitle: {
        fontWeight: '300',
    },
    main: {
        height: 'calc(100vh - 48px)'
    },
    button: {
        margin: '20px'
    }
}));

let socket = null;
let stompClient = null;

function connectToServer(username, callbacks) {
    stompClient.connect({}, frame => {
        stompClient.subscribe('/game/users', res => {
            const data = JSON.parse(res.body);
            callbacks.setPlayersNumber(parseInt(data.playersNumber));
            callbacks.setConnectedPlayers(data.connectedPlayers);
            if (data.disconnected) {
                callbacks.openConnectionBar(`${data.username} is disconnected, you can continue without him! 😥`);
            } else {
                callbacks.openConnectionBar(`${data.username} is connected, very good, more users, more fun! 🤩`);
            }
        });
        stompClient.subscribe('/game/board', res => {
            if (res.body) {
                const data = JSON.parse(res.body);
                callbacks.setTableBoard(data.board);
                callbacks.setCurrentPlayerMove(data.currentPlayer);
                if (data.winner) {
                    callbacks.setWinner(`Winner is ${data.winner}!!! ✨🎉🎊`);
                    stompClient.send('/app/connect', {}, username);
                    callbacks.setGame(false);
                    setTimeout(() => {
                        stompClient.disconnect();
                    }, 1000);
                }
            }
        })

        callbacks.setGame(true);
        stompClient.send('/app/connect', {}, username);
        stompClient.send('/app/board', {}, JSON.stringify({
            username: username,
            rowIndex: -1,
            colIndex: -1,
            color: '#ffffff'
        }));
        sessionStorage.setItem('user', username);
    });
}

export default function Root() {
    const classes = useStyles();
    const [username, setUsername] = useState('Guest');
    const [isGame, setGame] = useState(false);
    const [tableBoard, setTableBoard] = useState(null);
    const [playersNumber, setPlayersNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [connectionBar, setConnectionBar] = useState(null);
    const [currentPlayerMove, setCurrentPlayerMove] = useState(null);
    const [winner, setWinner] = useState(null);
    const [connectedPlayers, setConnectedPlayers] = useState(null);

    const handleClose = () => setOpen(false);
    const handleConnectionBar = () => setConnectionBar(null);
    const openConnectionBar = newMessage => setConnectionBar(newMessage);

    useEffect(() => {
        const handler = e => {
            e.preventDefault();
            const sessionUser = sessionStorage.getItem('user');
            if (stompClient && sessionUser) {
                alert('ok')
                stompClient.send('/app/connect', {}, sessionUser);
                stompClient.send('/app/board', {}, JSON.stringify({
                    rowIndex: -9,
                    colIndex: -9
                }));
                setTimeout(() => {
                    stompClient.disconnect();
                }, 1000);
                sessionStorage.removeItem('user');
            }
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', handler);
        return () => window.removeEventListener('beforeunload', handler);
    }, [])

    return (
        <Grid container justify='center' alignContent='center' alignItems='center'>
            <WinnerDialog winner={winner} setWinner={setWinner} />
            <AppBar position='static'>
                <Toolbar variant='dense'>
                    <Grid container item justify='space-between'>
                        <Typography variant='h6' color='inherit' className={classes.appBarTitle}>
                            Something Like GO
                        </Typography>
                        <DisconnectButton
                            stompClient={stompClient}
                            isGameRunning={isGame}
                            setGame={setGame}
                            username={username}
                        />
                    </Grid>
                </Toolbar>
            </AppBar>
            {
                !isGame ?
                    <Grid container item justify='center' alignContent='center' alignItems='center' className={classes.main}>
                        <Grid container item justify='center' alignContent='center' alignItems='center'>
                            <Typography variant='h4' className={classes.connectTitle}>
                                Connect to start playing! 🐱‍👤
                            </Typography>
                        </Grid>
                        <Grid container item justify='center' alignContent='center' alignItems='center'>
                            <TextField
                                error={!username || username.length < 4}
                                variant='outlined'
                                label={!username || username.length < 4 ? 'Invalid username!' : 'Username'}
                                value={username}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.length < 13) {
                                        setUsername(value);
                                    }
                                }}
                            />
                            <Button
                                color='primary'
                                variant='outlined'
                                className={classes.button}
                                onClick={() => {
                                    if (username && username.length > 3) {
                                        fetch(`/check/valid?username=${username}`, {}).then(res => {
                                            if (res.ok) {
                                                return res.text();
                                            }
                                        }).then(data => {
                                            if (data === 'true') {
                                                socket = new SockJS('/web-game');
                                                stompClient = Stomp.over(socket);
                                                connectToServer(username, {
                                                    setGame,
                                                    setTableBoard,
                                                    setPlayersNumber,
                                                    openConnectionBar,
                                                    setCurrentPlayerMove,
                                                    setWinner,
                                                    setConnectedPlayers
                                                });
                                            } else {
                                                setOpen(true);
                                            }
                                        })
                                    }
                                }}
                            >
                                Connect now
                            </Button>
                        </Grid>
                    </Grid>
                    :
                    <Board
                        username={username}
                        playersNumber={playersNumber}
                        tableBoard={tableBoard}
                        stompClient={stompClient}
                        currentPlayerMove={currentPlayerMove}
                        connectedPlayers={connectedPlayers}
                    />
            }
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={`Room is full or this username already exists! 😢`}
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={Boolean(connectionBar)}
                autoHideDuration={6000}
                onClose={handleConnectionBar}
                message={connectionBar}
            />
        </Grid>
    );
}