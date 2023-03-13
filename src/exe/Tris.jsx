import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

// Win conditions
const STREAKS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const BoardButton = ({status, onClick, index}) => (
    <Button variant="contained" disabled={status !== null} onClick={onClick} data-testid={`board_button_${index}`}>{status || '.'}</Button>
)
const Board = ({board, playerMove}) => {
    return (
        <Grid container id="tris__board_container">
            <Grid item>
                <BoardButton status={board[0]} onClick={() => playerMove(0)} index={0} />
                <BoardButton status={board[1]} onClick={() => playerMove(1)} index={1} />
                <BoardButton status={board[2]} onClick={() => playerMove(2)} index={2} />
            </Grid>
            <Grid item>
                <BoardButton status={board[3]} onClick={() => playerMove(3)} index={3} />
                <BoardButton status={board[4]} onClick={() => playerMove(4)} index={4}/>
                <BoardButton status={board[5]} onClick={() => playerMove(5)} index={5}/>
            </Grid>
            <Grid item>
                <BoardButton status={board[6]} onClick={() => playerMove(6)} index={6} />
                <BoardButton status={board[7]} onClick={() => playerMove(7)} index={7} />
                <BoardButton status={board[8]} onClick={() => playerMove(8)} index={8}/>
            </Grid>
        </Grid>
    );
}
const Tris = () => {
    const [player, setPlayer] = useState('x')
    const [winner, setWinner] = useState(null);
    const [board, setBoard] = useState([null,null,null,null,null,null,null,null,null]);

    const reset = () => {
        setPlayer('x')
        setWinner(null)
        setBoard([null,null,null,null,null,null,null,null,null])
    }

    const playerMove = (index) => {
        if (winner) return;
        let newBoardStatus = [...board];
        newBoardStatus[index] = player;
        setPlayer(player === 'x' ? 'o' : 'x');
        setBoard(newBoardStatus)
    };

    const checkGameStatus = board => {
        // It checks for all the winning conditions
        for (const streak of STREAKS) {
            const [a, b, c] = streak.map(i => board[i]); // It gets the values ('x', 'o', null) from the board status
            if (a !== null && a === b && b === c) {
                return { gameFinished: true, winner: a };
            }
        }

        // It checks for a draw. The game is finished if all the buttons have been pressed
        return { gameFinished: board.findIndex(b => b === null) === -1, winner: null };
    }

    useEffect(() => {
        const {gameFinished, winner} = checkGameStatus(board);
        if (!gameFinished) return;
        setWinner(winner ? `Winner: Player ${winner}!` : "It's a draw!")
    }, [board])

    return (
        <Container>
            <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Typography variant="h3" gutterBottom data-testid="winner_text">
                   {winner}
                </Typography>
                <Board board={board} playerMove={playerMove} />
                {
                    winner && 
                    <Button variant="contained" color="secondary" size="large"
                        data-testid="reset_button"
                        onClick={() => reset()}
                        style={{margin: '0 auto'}}>
                        Reset
                    </Button>
                }
            </Box>
        </Container>
    );
}

export default Tris;