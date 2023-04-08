import React, {useReducer, useState} from "react";
import { Box, Container, ListItem } from "@mui/material";
import ChessPiece from "../components/ChessPiece";

const initialGridStatus = [
    ['R','P','','','','','P','R'],
    ['N','P','','','','','P','N'],
    ['B','P','','','','','P','B'],
    ['Q','P','','','','','P','Q'],
    ['K','P','','','','','P','K'],
    ['B','P','','','','','P','B'],
    ['N','P','','','','','P','N'],
    ['R','P','','','','','P','R'],
];

const initialGameStatus = {
    grid: initialGridStatus,
    initiative: '', // '', 'B', 'W'

}

const gridReducer = (action, state) => {
    switch (action.type) {

        default: return state;
    }
};

const ChessGame = () => {
    const [gameStatus, dispatcher] = useReducer(gridReducer, initialGameStatus);
    console.group(gameStatus)

    return (
        <Container style={{flex: 1}}>
            <Box style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
                {
                    gameStatus.grid.map((col, y) => {
                        return (
                            <Box style={{flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 48}}>
                                {
                                    col.map((row, x) => {
                                        return (
                                                <ChessPiece x={x} y={y} type={row} key={`${y}_${x}`} />
                                        );
                                    })
                                }
                            </Box>
                        )
                    })
                }
            </Box>
        </Container>

    );
};

export default ChessGame;