import React, { useEffect, useState } from "react";
import {
    Container,
    Grid,
    TextField,
    Pagination,
    Box,
    CircularProgress, InputAdornment
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../common/Navbar";
import CardView from "./Components/CardView";
import SearchIcon from '@mui/icons-material/Search';

const PeliculasIndexPage = () => {
    const { page } = useParams();
    const pagina = parseInt(page, 10) - 1;
    const num_pelis = 30;
    const [peliculas, setDataPeliculas] = useState([]);
    const [peliculasTotal, setDataPeliculasTotal] = useState([]);
    const [paginas, setPaginas] = useState();
    const [busqueda, setBusqueda] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const handleChange = (event, value) => {
        navigate("/peliculas/" + value);
    };

    const handleSearchChange = (event) => {
        setBusqueda(event.target.value);
    };

    const obtenerPeliculas = async () => {
        setIsLoading(true);
        const response = await fetch(
            "http://127.0.0.1:8000/salas_cine/ver-peliculas"
        );
        const data = await response.json();
        setDataPeliculasTotal(data)
        paginar(data)
        setIsLoading(false);
    }
    const filtraPelis = () => {
        const filteredPeliculas = busqueda ? peliculasTotal.filter((pelicula) =>
        (
            pelicula.title.toLowerCase().includes(busqueda.toLowerCase()) ||
            pelicula.genres.map((genero) => (genero.toLowerCase())).includes(busqueda.toLowerCase()) ||
            pelicula.year.toString().toLowerCase().includes(busqueda.toLowerCase())
        )
        ) : peliculasTotal;
        paginar(filteredPeliculas)
    }
    const paginar = (data) => {
        setPaginas(Math.ceil(data.length / num_pelis));

        setDataPeliculas(
            data.slice(
                pagina * num_pelis,
                Math.min((pagina + 1) * num_pelis, data.length)
            )
        );
    }

    useEffect(() => {
        obtenerPeliculas();
    }, []);
    useEffect(() => {
        filtraPelis();
    }, [pagina, busqueda]);

    return (
        <div className="peliculas-page">
            <Navbar />
            <Container sx={{ py: 8 }} maxWidth="md">
                <h1 id="title-peliculas">Películas</h1>
                {isLoading ?
                    <>
                        <Grid id="buscar-container">
                            <TextField
                                variant="standard"
                                margin="normal"
                                fullWidth
                                placeholder="Buscar..."
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
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                            <CircularProgress />
                        </div>
                    </>
                    :
                    <>
                        <Grid id="buscar-container">
                            <TextField
                                variant="standard"
                                margin="normal"
                                fullWidth
                                placeholder="Buscar..."
                                value={busqueda}
                                onChange={handleSearchChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    disableUnderline: true
                                }}
                                style={{ marginLeft: "15px" }}

                            />
                        </Grid>
                        <Grid container spacing={4}>
                            {peliculas.map((pelicula) => (
                                <Grid item key={pelicula.id} xs={12} sm={6} md={4}>
                                    <Link
                                        to={"/pelicula/" + pelicula.path}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <CardView
                                            data={pelicula}
                                            type="pelicula"
                                            imageHeight="150%"
                                        />
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid justifyContent="center" display="flex" margin="30px">
                            <Pagination
                                count={paginas}
                                page={pagina + 1}
                                onChange={handleChange}
                                showFirstButton
                                showLastButton
                            />
                        </Grid>
                    </>
                }
            </Container>
        </div>
    );
};

export default PeliculasIndexPage;
