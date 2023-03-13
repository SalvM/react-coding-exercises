import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Tris from './Tris';

describe('Tris', () => {
    it('renders the game board', () => {
        render(<Tris />);
        
        expect(screen.getByTestId('board_button_0')).toBeInTheDocument();
        expect(screen.getByTestId('board_button_1')).toBeInTheDocument();
        expect(screen.getByTestId('board_button_2')).toBeInTheDocument();
        expect(screen.getByTestId('board_button_3')).toBeInTheDocument();
        expect(screen.getByTestId('board_button_4')).toBeInTheDocument();
        expect(screen.getByTestId('board_button_5')).toBeInTheDocument();
        expect(screen.getByTestId('board_button_6')).toBeInTheDocument();
        expect(screen.getByTestId('board_button_7')).toBeInTheDocument();
        expect(screen.getByTestId('board_button_8')).toBeInTheDocument();
    });

    it('allows a player to make a move', () => {
        render(<Tris />);
        
        fireEvent.click(screen.getByTestId('board_button_0'));
        expect(screen.getByText('x')).toBeInTheDocument();
    });
  
    it('allows players to take turns and updates the board accordingly', () => {
        render(<Tris />);
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(9);

        fireEvent.click(buttons[0]);
        expect(buttons[0]).toHaveTextContent('x');

        fireEvent.click(buttons[1]);
        expect(buttons[1]).toHaveTextContent('o');

        fireEvent.click(buttons[3]);
        expect(buttons[3]).toHaveTextContent('x');
    });

    it('disables buttons that have already been clicked', () => {
        render(<Tris />);
        const buttons = screen.getAllByRole('button');

        fireEvent.click(buttons[0]);
        expect(buttons[0]).toBeDisabled();

        fireEvent.click(buttons[0]);
        expect(buttons[0]).toBeDisabled();
    });

    it('alternates between players', () => {
        render(<Tris />);
        const buttons = screen.getAllByRole('button');

        fireEvent.click(buttons[0]);
        expect(buttons[0]).toHaveTextContent('x');

        fireEvent.click(buttons[1]);
        expect(buttons[1]).toHaveTextContent('o');

        fireEvent.click(buttons[2]);
        expect(buttons[2]).toHaveTextContent('x');

        fireEvent.click(buttons[3]);
        expect(buttons[3]).toHaveTextContent('o');
    });
});
