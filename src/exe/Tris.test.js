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
    it('finishs when all the buttons have been pressed and resets', () => {
        render(<Tris />);
        const buttons = screen.getAllByRole('button');

        fireEvent.click(buttons[0]);
        fireEvent.click(buttons[1]);    
        fireEvent.click(buttons[4]);
        fireEvent.click(buttons[8]);
        fireEvent.click(buttons[3]);
        fireEvent.click(buttons[5]);
        fireEvent.click(buttons[2]);
        fireEvent.click(buttons[6]);
        fireEvent.click(buttons[7]);

        const resetButton = screen.getByTestId('reset_button')
        expect(resetButton).toBeInTheDocument();
        fireEvent.click(resetButton);
        expect(resetButton).not.toBeInTheDocument();
    });
    it('tells the winner', () => {
        render(<Tris />);
        const buttons = screen.getAllByRole('button');

        fireEvent.click(buttons[0]);
        fireEvent.click(buttons[3]);    
        fireEvent.click(buttons[1]);    
        fireEvent.click(buttons[4]);    
        fireEvent.click(buttons[2]);    
        expect(screen.getByTestId('winner_text')).toBeInTheDocument();
    })
});
