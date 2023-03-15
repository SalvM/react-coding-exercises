import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import { CustomAutocomplete } from "./CustomAutocomplete";

describe('CustomAutocomplete', () => {
    it('displays suggestions based on user input', () => {
        const mockArray = ['Ferrari', 'Ford', 'Volvo'];
        render(<CustomAutocomplete array={mockArray} />)

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'f' }});

        const suggestions = screen.getAllByRole('option')
        expect(suggestions).toHaveLength(2);
        expect(suggestions[0]).toHaveTextContent('Ferrari');
        expect(suggestions[1]).toHaveTextContent('Ford');
    })
})