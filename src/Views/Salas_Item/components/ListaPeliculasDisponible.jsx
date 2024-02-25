import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import "../../Peliculas_Item/PeliculasItemPage.css"
import { Grid } from "@mui/material";
import Carousel from 'react-material-ui-carousel';


const ListaPeliculaDisponible = ({ peliculas }) => {

    const navigate = useNavigate();


    const realizarReserva = (funcion_id) => {
        navigate(`/reserva/${funcion_id}`);
    }


    const peliculasAgrupadas = peliculas.reduce((rows, pelicula, index) => {
        if (index % 3 === 0) rows.push([]);
        rows[rows.length - 1].push(pelicula);
        return rows;
    }, []);

    return (
        <Container sx={{ py: 12 }} maxWidth="md">
            <h1 id="title-pelicuas">Funciones Disponibles</h1>
            <hr />
            <Carousel
                autoPlay={false}
                animation="slide"
                indicators={false}
            >

                {peliculasAgrupadas.map((row, rowIndex) => (
                    <Grid key={rowIndex} container spacing={4}>
                        {row.map((pelicula, peliIndex) => (

                            <Grid item key={peliIndex} xs={12} sm={6} md={4}>
                                <div className="peliculas-container">
                                    <img className="img-peliculas-dispo"
                                        src={pelicula.thumbnail}
                                    />
                                    <div className="sala-info">
                                        <p className="sala-A-1">{`${pelicula.title} (${pelicula.year})`}</p>
                                        <p className="sala-A-2" style={{ textAlign: 'justify' }}> {pelicula.extract != null ? pelicula.extract.slice(0, 30) + "..." : "No disponible"}</p>
                                    </div>
                                    <div className="sala-times">

                                        {pelicula.available_times.map((available_times, index) => (
                                            <button
                                                key={index}
                                                className="btn-sala-A"
                                                onClick={() => realizarReserva(available_times.funcion_id)}
                                            >
                                                {available_times.hora}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Carousel>

        </Container >
    );

}

export default ListaPeliculaDisponible