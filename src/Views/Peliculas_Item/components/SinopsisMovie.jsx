import { Container } from "react-bootstrap"
import * as React from 'react';
import Rating from '@mui/material/Rating';

const SinopsisMovie = (props) => {
    const pelicula = props.pelicula
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