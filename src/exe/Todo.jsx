import React, { useEffect, useReducer } from "react";
import { Container } from "@mui/material";
import TodoListItem from '../components/TodoListItem';

const initialTodoState = [
    {
        id: 0,
        description: 'Lorem ipsum sic dolor',
        checked: false
    },    {
        id: 1,
        description: 'Lorem ipsum sic dolor',
        checked: false
    }
];

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'add': 
            return [...state, action.payload];
        case 'check':
            return state.map(t => {
                if (t.id === action.payload.id) {
                    return { ...t, checked: !t.checked };
                }
                return t;
            });
        case 'edit':
            return state.map(t => {
                if (t.id === action.payload.id) {
                    return { ...t, description: action.payload.description };
                }
                return t;
            })
        case 'delete':
            return state.filter(t => t.id !== action.payload.id);
        default:
            return state;
    }
}

const TodoPage = () => {
    const [state, dispatch] = useReducer(todoReducer, initialTodoState);

    return (
        <Container>
            { state.map(t => (
                <TodoListItem {...t} key={t.id} check={() => dispatch({ type: 'check', payload: { id: t.id }})} delete={() => dispatch({ type: 'delete', payload: { id: t.id }})} />
            ))}
        </Container>
    )
}

export default TodoPage;