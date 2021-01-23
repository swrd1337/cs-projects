import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import UserBar from './UserBar';
import Typography from '@material-ui/core/Typography';
import ConnectedPlayers from './ConnectedPlayers';

const useStyles = makeStyles({
    rootContainer: {
        marginTop: '4em',
    },
    row: {
        display: 'block',
        whiteSpace: 'nowrap',

    },
    boardCell: {
        width: '6.5em',
        height: '6.5em',
        borderRadius: '0'
    }
})

export default function Board({ tableBoard, username, playersNumber, stompClient, currentPlayerMove, connectedPlayers }) {
    const classes = useStyles();
    const [player, setPlayer] = useState(null);
    const [activeSkill, setActiveSkill] = useState(null);

    return (
        <Grid container justify='center' alignContent='center' alignItems='center'>
            <UserBar
                username={username}
                playersNumber={playersNumber}
                player={player}
                setPlayer={setPlayer}
                setActiveSkill={setActiveSkill}
                activeSkill={activeSkill}
                tableBoard={tableBoard}
            />
            <Grid container item justify='center' alignContent='center' alignItems='center'>
                {currentPlayerMove && <Typography color='primary' variant='h5'>{`Is ${currentPlayerMove}'s turn!`}</Typography>}
            </Grid>
            <Grid
                container
                item
                className={classes.rootContainer}
                justify='center'
                alignContent='center'
                alignItems='center'
            >
                <Grid item>
                    {tableBoard && tableBoard.map((row, rowIndex) => {
                        return (
                            <div
                                className={classes.row}
                                key={`cell_container_${rowIndex}`}
                            >
                                {row.map((item, index) => {
                                    return (
                                        <Button
                                            className={classes.boardCell}
                                            key={`board_cell_${rowIndex}_${index}`}
                                            variant='outlined'
                                            style={{
                                                backgroundColor: item,
                                            }}
                                            onClick={() => {
                                                if (stompClient) {
                                                    stompClient.send('/app/board', {}, JSON.stringify({
                                                        activeSkill: activeSkill,
                                                        username: username,
                                                        rowIndex: rowIndex,
                                                        colIndex: index,
                                                        color: player.color
                                                    }));
                                                }
                                            }}
                                        >
                                            🍙
                                        </Button>
                                    )
                                })}
                                <br />
                            </div>)
                    })}
                </Grid>
                <Grid>
                    <ConnectedPlayers connectedPlayers={connectedPlayers} />
                </Grid>
            </Grid>
        </Grid>
    );
}