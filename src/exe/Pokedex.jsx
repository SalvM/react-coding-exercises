import React, { useEffect, useState } from "react";

import { Box, Container, IconButton, InputBase, Paper, Stack, nTextField, Typography } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));
const Pokedex = () => {
    const [pokemon, setPokemon] = useState(null);
    const [pokemonList, setPokemonList] = useState(null);
    const [query, setQuery] = useState('');

    const loadPokédex = async () => {
        try {
            const rawResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
            if (!rawResponse.ok) throw rawResponse;
            const responseBody = await rawResponse.json();
            return responseBody?.results;
        } catch(e) {
            console.error('[Pokédex] loadPokédex', e);
            return null;
        }
    }

    const loadPokémon = async (query) => {
        try {
            const rawResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            if (!rawResponse.ok) throw rawResponse;
            const responseBody = await rawResponse.json();
            setPokemon(responseBody)
            return responseBody;
        } catch(e) {
            console.error('[Pokédex] loadPokémon', e);
            return null;
        }
    }

    const renderPokemonData = (_pokemon) => {
        return (
            <Box sx={{display: 'flex', flex: 1}} m={2}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={1}
                >
                    <Item>{_pokemon?.name.toUpperCase()}</Item>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={1}
                    >
                        {
                            _pokemon?.types?.map(t => (<Item>{t?.type?.name}</Item>))
                        }
                    </Stack>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={1}
                    >
                        {
                            _pokemon?.stats?.map(s => (
                                <Item>
                                    <Typography variant="body1" style={{textAlign: 'left'}}>{s?.stat?.name} : {s?.base_stat}</Typography>
                                    <BorderLinearProgress variant="determinate" value={s?.base_stat / 2}/>
                                </Item>
                            ))
                        }
                    </Stack>
                </Stack>
            </Box>
        )
    }

    const initializer = async () => {
        const pokemonList = await loadPokédex();
        setPokemonList(pokemonList);
    }

    useEffect(() => {
        initializer()
    }, [])

    return (
        <Container>
            <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="h1">
                    Pokédex
                </Typography>
                <Paper
                    component="form"
                    sx={{width: 300, minHeight: 600, backgroundColor: '#c50e0e', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    m={12} py={8} px={4}
                >
                    <Box sx={{backgroundColor: 'white', borderRadius: 2, display: 'flex', alignItems: 'center'}} px={2} m={2}>
                        <InputBase
                            id="pokedex-query"
                            fullWidth
                            label="Pokémon"
                            placeholder="Which Pokémon?"
                            inputProps={{ 'aria-label': 'search pokémon' }}
                            data-testid="pokedex-query"
                            autoFocus
                            onChange={e => loadPokémon(e.target.value)}
                        />
                         <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 4,
                            borderWidth: 1, 
                            borderColor: 'primary.dark',
                            width: 128,
                            height: 128,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        m={0} 
                        p={2}
                    >
                        {
                            pokemon ?
                                <>
                                    <img id="pokemon-img" data-testid="pokemon-img" src={pokemon?.sprites?.front_default} alt={pokemon?.name} />
                                    <Typography variant="body1">#{pokemon?.order}</Typography>
                                </>
                            :   <Typography variant="body1">Please, submit a pokémon!</Typography>
                        }
                    </Box>
                    {
                        pokemon && renderPokemonData(pokemon)
                    }
                </Paper>
                <Typography variant="h6" style={{fontStyle: 'italic'}}>
                    { pokemonList && `There are ${pokemonList.length} pokémon! Wow!`}
                </Typography>
            </Box>
        </Container>
    );
}

export default Pokedex;