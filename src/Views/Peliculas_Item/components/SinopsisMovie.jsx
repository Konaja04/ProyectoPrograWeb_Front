import { Container } from "react-bootstrap";
import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import placeholderImage from '../../../Img/pelicula_placeholder.jpg';

const SinopsisMovie = (props) => {
    const pelicula = props.pelicula

    const [userRating, setUserRating] = useState(null);

    const handleRatingChange = (event, newValue) => {
        setUserRating(newValue);
    };

    return <Container>
        <div id="sinopsis-imagen" className="row flex-column flex-lg-row">
            <div className="col d-flex justify-content-center align-items-center">
                <img className="image-principal" src={pelicula.thumbnail || placeholderImage} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
            <div className="col">
                <div className="info-container">
                    <h2 className="title-sub-peliculas" >Sinopsis</h2>
                    <p className="card-text" style={{ textAlign: 'justify' }}>{pelicula.extract}</p>
                    {
                        (pelicula.genres != null ? pelicula.genres : []).map((genero) => (

                            <label className="type-pelicula">{genero}</label>
                        ))
                    }

                    <Rating
                        style={{ paddingLeft: "120px" }}
                        name="simple-controlled"
                        value={userRating !== null ? userRating : pelicula.rating}
                        onChange={handleRatingChange}
                    />
                </div>
            </div>
        </div>

    </Container>
}

export default SinopsisMovie