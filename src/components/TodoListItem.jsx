import React, { useState } from "react";

import { IconButton, Stack, Typography, Tooltip } from "@mui/material";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoListItem = (props) => {
    const [showOptions, setShowOptions] = useState(false);

    const renderOptions = (
        <div>
            {
                props.edit && props.edit instanceof Function &&
                <Tooltip title="Edit">
                    <IconButton
                        color="secondary"
                        onClick={() => props.edit()}
                        aria-label="edit"
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            }
            {
                props.check && props.check instanceof Function &&
                <Tooltip title="Check">
                    <IconButton
                        color="secondary"
                        onClick={() => props.check()}
                        aria-label="check"
                    >
                        <CheckIcon />
                    </IconButton>
                </Tooltip>
            }
            {
                props.delete && props.delete instanceof Function &&
                <Tooltip title="Delete">
                    <IconButton
                        color="secondary"
                        onClick={() => props.delete()}
                        aria-label="delete"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                
            }
        </div>
    )

    return (
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} className={`todo_list_item ${props.checked ? 'checked' : ''}`}>
            <Typography>
                {props.description}
            </Typography>
            {showOptions && renderOptions}
            <IconButton
                aria-label="show commands"
                component="label"
                onClick={() => setShowOptions(!showOptions)}
            >
                {!showOptions ? <MoreVertIcon /> : <CloseIcon />}
            </IconButton>
        </Stack>
    );
}

export default TodoListItem;