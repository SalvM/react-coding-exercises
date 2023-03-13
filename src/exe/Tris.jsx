import React, { useState } from "react";
import { Box, Button, Container, Grid } from "@mui/material";

const BoardButton = ({status, onClick, index}) => (
    <Button variant="contained" disabled={status != null} onClick={onClick} data-testid={`board_button_${index}`}>{status || '.'}</Button>
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
    const [board, setBoard] = useState([null,null,null,null,null,null,null,null,null]);
    const playerMove = (index) => {
        let newBoardStatus = [...board];
        newBoardStatus[index] = player;
        setPlayer(player === 'x' ? 'o' : 'x');
        setBoard(newBoardStatus)
    };

    return (
        <Container>
            <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
                <Board board={board} playerMove={playerMove} />
            </Box>
        </Container>
    );
}

export default Tris;