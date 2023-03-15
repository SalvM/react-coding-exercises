import { Box, Container, ListItem } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

const CustomAutocomplete = (props) => {
    const array = props?.array || [];
    const minLength = props?.minLength || 1;
    const maxLength = props?.maxLength || 100;

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([])
    
    const autocomplete = (event) => {
        const value = event?.target?.value;
        setQuery(value)
        setSuggestions([])
        if(!(value && value.length >= minLength && value.length <= maxLength)) return;
        let newSuggestions = []
        array.forEach(element => {
            if(element.substr(0, value.length).toUpperCase() === value.toUpperCase()) {
                newSuggestions.push(element)
            }
        })
        setSuggestions(newSuggestions)
    };
    
    const options = useMemo(() => {
        return suggestions.map((element, index) => (
            <ListItem 
                role={'option'}
                key={index}
                onClick={() => {
                    setQuery(element);
                    setSuggestions([])
                }}
            >
                {element}
            </ListItem>
        ))
    }, [suggestions])

    return (
        <Box>
            <input value={query} onChange={e => autocomplete(e)} className="custom_component" />
            <div data-testid="custom-options" className="custom_options">
                {options}
            </div>
        </Box>
    )
}

const AutocompletePage = () => {
    const [array, setArray] = useState([]);

    const loadArray = async () => {
        try {
            const rawResponse = await fetch('https://raw.githubusercontent.com/marispro/auto-cars-makes-models-types/master/cars.json');
            if (!rawResponse?.ok) throw rawResponse;
            return await rawResponse.json();
        } catch(e) {
            console.error('[page] loadArray', e);
            return []
        }
    };

    const brands = useMemo(() => {
        return array.map(e => e.brand);
    }, [array])

    const initializer = async () => {
        const newArray = await loadArray();
        setArray(newArray);
    }

    useEffect(() => {
        initializer()
    }, []);

    return (
        <Container className="flex_center">
            <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} className="flex_center">
                <CustomAutocomplete array={brands} />
            </Box>
        </Container>
    );
}

export { AutocompletePage, CustomAutocomplete };