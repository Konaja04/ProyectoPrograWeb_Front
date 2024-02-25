import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import '../../Peliculas_Item/PeliculasItemPage.css'
import { Grid } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';

const obtenerPeliculasRandom = (lista, cantidad) => {
    const peliculasClon = lista.slice();
    cantidad = Math.min(cantidad, peliculasClon.length);
    const peliculasRandom = [];

    for (let i = 0; i < cantidad; i++) {
        const indiceRandom = Math.floor(Math.random() * peliculasClon.length);
        const peliculaSeleccionada = peliculasClon.splice(indiceRandom, 1)[0];
        peliculasRandom.push(peliculaSeleccionada);
    }

    return peliculasRandom;
}

const PeliculasRecomendadas = () => {
    const { path } = useParams();
    const [sala, setDataSala] = useState({})
    const [pelis, setDataPelis] = useState([])

    const obtenerSala = async () => {

        const response = await fetch("https://raw.githubusercontent.com/ulima-pw/data-20240/main/salasv2.json")
        const responsePelis = await fetch("https://raw.githubusercontent.com/ulima-pw/data-20240/main/peliculas_limpio.json")
        const data = await response.json()
        const dataPelis = await responsePelis.json()
        setDataSala(data.filter((sala) => {
            return sala.path == path
        })[0])
        setDataPelis(obtenerPeliculasRandom(dataPelis, 12))

    }
    useEffect(() => {
        obtenerSala()
    }, [])

    return <Container sx={{ py: 12 }} maxWidth="md">
        <h1 id="title-peliculas">Recomendados</h1>
        <Carousel
            autoPlay={false}
            animation="slide"
            indicators={false}
        >


            {pelis.reduce((rows, pelicula, index) => {
                if (index % 4 === 0) rows.push([]);
                rows[rows.length - 1].push(

                    <Grid item key={index} xs={12} sm={6} md={3}>
                        <div key={index} className="cartelera-card">
                            <img className="img-peliculas-dispo"
                                src={pelicula.thumbnail || "ProyectoPrograWeb_Front\src\Img\pelicula_placeholder.jpg"}
                            />
                            <div className="botones-overlay">
                                <Link to={"/pelicula/" + pelicula.path} style={{ textDecoration: 'none' }}>
                                    <button className='botones-overlay-comprar' >
                                        <ConfirmationNumberOutlinedIcon style={{ marginRight: '8px' }} />
                                        Comprar</button>
                                </Link>

                            </div>
                        </div>

                    </Grid>
                );
                return rows;

            }, []).map((row, index) => (
                <Grid key={index} container spacing={4}>
                    {row}
                </Grid>
            ))}
        </Carousel>

    </Container >



}

export default PeliculasRecomendadas