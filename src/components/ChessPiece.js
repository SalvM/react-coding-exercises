import { Box } from "@mui/material";
import React from "react";

class ChessPiece extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canMove: props.canMove,
            color: props.color,
            selected: props.selected,
            type: props.type, // P = Pawn, ...
        }
    }
    cellColor() {
        return (this.props.x + this.props.y) % 2 === 0 ? '#333' : '#ccc';
    }
    render() {
        return (
            <Box style={{height: 32, width: 32, padding: 8, backgroundColor: this.cellColor()}}>
                <p style={{color: this.props.color, margin: 0}}>{this.state.type}</p>
            </Box>
        )
    }
}

export default ChessPiece;