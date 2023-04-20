import React, {useReducer, useState} from "react";
import { Box, Container, ListItem } from "@mui/material";
import ChessPiece from "../components/ChessPiece";

const createPieceObject = ({type}) => ({
    canMove: false,
    clickable: false,
    color: false,
    selected: false,
    type,
});

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
    selectedPiece: [-1 , -1],
}

const gridReducer = (state, action) => {
    switch (action.type) {
        case 'select_piece':
            return {...state, selectedPiece: [action.payload.x, action.payload.y]}
        default: return state;
    }
};

const ChessGame = () => {
    const [gameStatus, dispatcher] = useReducer(gridReducer, initialGameStatus);
    console.group(gameStatus)

    const pieceIsSelected = (x, y) => (x === gameStatus.selectedPiece[0] && y === gameStatus.selectedPiece[1]);
    const pieceSelection = (x, y) => {
        dispatcher({type: 'select_piece', payload: {x, y}});
    }

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
                                                <ChessPiece x={x} y={y} type={row} key={`${y}_${x}`} selected={pieceIsSelected(x, y)} onClick={pieceSelection} />
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