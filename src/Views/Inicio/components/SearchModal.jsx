import { Box, CircularProgress, Grid, TextField, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PeliculaSearchItem from "./PeliculaSearchItem";
import SalaSearchItem from "./SalaSearchItem";
import SearchIcon from '@mui/icons-material/Search';

const SearchModal = () => {
    const [peliculasTotal, setPeliculasTotal] = useState([]);
    const [peliculas, setPeliculas] = useState([]);
    const [salas, setDataSalas] = useState([])
    const [salasTotal, setDataSalasTotal] = useState([])
    const [busqueda, setBusqueda] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const handleSearchChange = (event) => {
        setBusqueda(event.target.value);
    };

    const obtenerPeliculas = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("https://backend-salas-ulima-20211628.azurewebsites.net/salas_cine/ver-peliculas");
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            const data = await response.json();
            setPeliculasTotal(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            setIsLoading(false);
        }
    }

    const obtenerSalas = async () => {
        setIsLoading(true)
        const response = await fetch("https://backend-salas-ulima-20211628.azurewebsites.net/salas_cine/ver-salas")
        const data = await response.json()
        setDataSalasTotal(data)
        setDataSalas(
            data
        )
        setIsLoading(false)
    }

    const filtraPelis = () => {
        const filteredPeliculas = busqueda ? peliculasTotal.filter((pelicula) =>
        (
            pelicula.title.toLowerCase().includes(busqueda.toLowerCase()) ||
            pelicula.genres.some((genero) => (genero.toLowerCase().includes(busqueda.toLowerCase()))) ||
            pelicula.year.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
            pelicula.cast.some((actor) => (actor.toLowerCase().includes(busqueda.toLowerCase())))
        )
        ) : [];
        setPeliculas(filteredPeliculas);
    }

    const filtrarSalas = () => {
        const filteredSalas = busqueda ? salasTotal.filter((sala) =>
        (sala.name.toLowerCase().includes(busqueda.toLowerCase()) ||
            sala.second_address.toLowerCase().includes(busqueda.toLowerCase()))
        ) : [];
        setDataSalas(filteredSalas);
    }

    useEffect(() => {
        obtenerPeliculas();
        obtenerSalas();
    }, []);

    useEffect(() => {
        filtraPelis();
        filtrarSalas();
    }, [busqueda, peliculasTotal, salasTotal]);

    return (
        <>
            <Grid id="buscar-container-inicio">
                <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    placeholder="Busca peliculas por titulo, genero, año y salas de cine"
                    value={busqueda}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        disableUnderline: true
                    }} style={{ marginLeft: "15px" }}

                />
            </Grid>
            <Box id="resultado-container" style={{ display: (peliculas.length > 0 || salas.length > 0) ? 'block' : 'none' }}>
                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <Box
                        paddingTop={2}
                        height="400px"
                        width="920px"
                        overflow="auto"
                    >
                        {peliculas.map((pelicula) => (
                            <Grid item key={pelicula.id} xs={12} sm={6} md={4}>
                                <Link
                                    to={"/pelicula/" + pelicula.path}
                                    style={{ textDecoration: "none" }}
                                >
                                    <PeliculaSearchItem
                                        data={pelicula}
                                    />
                                </Link>
                            </Grid>
                        ))}
                        {salas.map((sala, index) => (
                            <Grid item key={index} xs={12} sm={6} md={6}>
                                <Link to={'/sala/' + sala.path} style={{ textDecoration: 'none' }}>
                                    <SalaSearchItem data={sala} type="sala" imageHeight="100%" />
                                </Link>
                            </Grid>
                        ))}
                    </Box>
                )}
            </Box>
        </>
    );
}

export default SearchModal;
