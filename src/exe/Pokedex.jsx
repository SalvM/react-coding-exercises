import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Autocomplete, Box, Container, CircularProgress, Paper, Stack, TextField, Typography } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
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
    const [isFetching, setIsFetching] = useState(false);

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
        if (!(query && query.length)) return;
        if (isFetching) return;
        setIsFetching(true)
        try {
            const rawResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            if (!rawResponse?.ok) throw rawResponse;
            const responseBody = await rawResponse.json();
            setPokemon(responseBody)
            return responseBody;
        } catch(e) {
            console.error('[Pokédex] loadPokémon', e);
            return null;
        } finally {
            setIsFetching(false)
        }
    }

    const pokemonAutocompleteOptions = useMemo(() => {
        return pokemonList?.map(p => p.name);
    }, [pokemonList]);

    // The useful data used to render
    const pokemonData = useMemo(() => {
        const types = pokemon?.types?.map(t => t.type.name);
        const stats = pokemon?.stats?.map(s => ({ name: s.stat.name, value: s.base_stat }));
      
        return { types, stats };
      }, [pokemon]);
      
    const renderPokemonTypes = useMemo(() => {
        return pokemonData?.types?.map(type => (<Item>{type}</Item>));
    }, [pokemonData?.types]);

    const renderPokemonStats = useMemo(() => {
        return (
            pokemonData?.stats?.map(stat => (
                <Item>
                    <Typography variant="body1" style={{textAlign: 'left'}}>{stat?.name} : {stat?.value}</Typography>
                    <BorderLinearProgress variant="determinate" value={stat?.value / 2}/>
                </Item>
            ))
        )
    }, [pokemonData?.stats])

    const renderPokedexDisplay = (_pokemon) => {
        if (isFetching) {
            return (<CircularProgress />)
        }
        if (_pokemon) {
            return (
                <>
                    <img id="pokemon-img" data-testid="pokemon-img" src={_pokemon?.sprites?.front_default} alt={_pokemon?.name} />
                    <Typography variant="body1">#{_pokemon?.id}</Typography>
                </>
            )
        }
        return (<Typography variant="body1">Please, submit a pokémon!</Typography>)
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
                           renderPokemonTypes
                        }
                    </Stack>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={1}
                    >
                        {
                            renderPokemonStats
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
            <Box
                sx={{ bgcolor: '#cfe8fc', height: '100vh' }}
                style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
            >
                <Typography variant="h1">
                    Pokédex
                </Typography>
                <Paper
                    component="form"
                    sx={{width: 300, minHeight: 600, backgroundColor: '#c50e0e', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    m={12} py={8} px={4}
                >
                    <Box sx={{backgroundColor: 'white', borderRadius: 2, display: 'flex', alignItems: 'center', width: 250}} px={2} m={2}>
                        <Autocomplete
                            disablePortal
                            id="pokedex-combo"
                            data-testid="pokedex-combo"
                            options={pokemonAutocompleteOptions || []}
                            renderInput={(params) => <TextField {...params}>{params.name}</TextField>}
                            onChange={(e, v) => loadPokémon(v)}
                            noOptionsText={"No Pokèmon found"}
                            sx={{width: '100%'}}
                        />
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
                        {renderPokedexDisplay(pokemon)}
                    </Box>
                    {
                        pokemon && renderPokemonData(pokemon)
                    }
                </Paper>
                <Typography variant="h6" style={{fontStyle: 'italic'}} m={2} data-testid="pokedex-numbers">
                    { pokemonAutocompleteOptions && `There are ${pokemonAutocompleteOptions.length} pokémon! Wow!`}
                </Typography>
            </Box>
        </Container>
    );
}

export default Pokedex;