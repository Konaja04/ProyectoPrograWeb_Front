import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const SinopsisMovie = () => {

    const { path } = useParams();
    const [pelicula, setDataPelicula] = useState({})
    const obtenerPelicula = async () => {

        const response = await fetch("http://localhost:3000/data_json/peliculas_data.json")
        const data = await response.json()
        setDataPelicula(data.filter((pelicula) => {
            return pelicula.path == path
        })[0])

    }
    useEffect(() => {
        obtenerPelicula()
    }, [])

    return <Container>
        <div id="sinopsis-imagen" className="row flex-column flex-lg-row">
            <div className="col d-flex justify-content-center align-items-center">
                <img className="image-principal" src={pelicula.thumbnail} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
            <div className="col">
                <div className="card-body">
                    <h2 className="card-title" >Sinopsis</h2>
                    <p className="card-text" style={{ textAlign: 'justify' }}>{pelicula.extract}</p>
                    {
                        (pelicula.genres != null ? pelicula.genres : []).map((genero) => (

                            <label className="type-pelicula">{genero}</label>
                        ))
                    }
                    <Rating name="read-only" value={pelicula.rating} readOnly />

                </div>
            </div>
        </div>

    </Container>
}

export default SinopsisMovie