import './../InicioPage.css';
import { Link } from 'react-router-dom';
import { TextField, Container, Box, Popover, Avatar, Typography, Grid, Divider } from '@mui/material';
import { useEffect, useState } from "react";
import TopPeliculaItem from './TopPeliItem';



const TopPeliculasView = () => {
    const [pelis, setDataPelis] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const obtenerTop = async () => {

        const response = await fetch("http://127.0.0.1:8000/salas_cine/monstrarTop")
        const dataPelis = await response.json()
        setDataPelis(dataPelis)
        setIsLoading(false)

    }
    useEffect(() => {
        obtenerTop()
    }, [])
    return (
        <Container sx={{ py: 5 }} >
            <h1 id="title-peliculas" style={{ marginBottom: "40px" }}>Top Películas</h1>
            <Grid container spacing={2}>
                {pelis.map((pelicula, index) => (
                    <Grid item key={index} xs={12} sm={12} md={12}>
                        <Link
                            to={"/pelicula/" + pelicula.path}
                            style={{ textDecoration: "none" }}
                        >
                            <TopPeliculaItem pelicula={pelicula} index={index + 1} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container >
    )
}
export default TopPeliculasView