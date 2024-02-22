import React, { useEffect, useState } from "react";
import {
    Container,
    Grid,
    TextField,
    Pagination,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../common/Navbar";
import CardView from "./Components/CardView";

const PeliculasIndexPage = () => {
    const { page } = useParams();
    const pagina = parseInt(page, 10) - 1;
    const num_pelis = 30;
    const [peliculas, setDataPeliculas] = useState([]);
    const [paginas, setPaginas] = useState();
    const [busqueda, setBusqueda] = useState("");
    const navigate = useNavigate();

    const handleChange = (event, value) => {
        navigate("/peliculas/" + value);
    };

    const handleSearchChange = (event) => {
        setBusqueda(event.target.value);
    };

    const obtenerPeliculas = async () => {
        const response = await fetch(
            "https://raw.githubusercontent.com/ulima-pw/data-20240/main/peliculas_limpio.json"
        );
        const data = await response.json();


        const filteredPeliculas = busqueda ? data.filter((pelicula) =>
        (
            pelicula.title.toLowerCase().includes(busqueda.toLowerCase()) ||
            pelicula.genres.map((genero) => (genero.toLowerCase())).includes(busqueda.toLowerCase()) ||
            pelicula.year.toString().toLowerCase().includes(busqueda.toLowerCase())
        )
        ) : data;
        setPaginas(Math.ceil(filteredPeliculas.length / num_pelis));
        setDataPeliculas(
            filteredPeliculas.slice(
                pagina * num_pelis,
                Math.min((pagina + 1) * num_pelis, filteredPeliculas.length)
            )
        );
    };

    useEffect(() => {
        obtenerPeliculas();
    }, [pagina, busqueda]);

    return (
        <div className="peliculas-page">
            <Navbar />
            <Container sx={{ py: 8 }} maxWidth="md">
                <h1>Películas</h1>
                <Grid>
                    <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        placeholder="Busca por título"
                        style={{ marginBottom: "60px" }}
                        value={busqueda}
                        onChange={handleSearchChange}
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
            </Container>
        </div>
    );
};

export default PeliculasIndexPage;
