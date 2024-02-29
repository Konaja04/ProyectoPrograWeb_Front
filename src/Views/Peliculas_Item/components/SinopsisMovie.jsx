import { Container } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import placeholderImage from '../../../Img/pelicula_placeholder.jpg';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Skeleton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
const SinopsisMovie = (props) => {
    const pelicula = props.pelicula
    const user_id = sessionStorage.getItem("USER_ID");

    const [calificacion, setCalificacion] = useState(null);
    const [userRating, setUserRating] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const guardarCalificacion = async (newValue) => {
        setIsLoading(true);
        const dataCalificacion = {
            pelicula_id: pelicula.id,
            usuario_id: user_id,
            calificacion: newValue * 2
        };

        try {
            const response = await fetch("http://localhost:8000/salas_cine/guardarCalificacion", {
                method: "post",
                body: JSON.stringify(dataCalificacion)
            });

            if (response.ok) {
                console.log('Calificación guardada correctamente');
                setUserRating(newValue);
            } else {
                console.error('Error al guardar la calificación');
            }
        } catch (error) {
            console.error('Error al guardar la calificación:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchCalificacion = async () => {
            try {
                const response = await fetch(`http://localhost:8000/salas_cine/getCalificacion/${pelicula.id}/${user_id}`);
                const data = await response.json();
                if (data && data.length > 0) {
                    setCalificacion(data[0].calificacion);
                    setUserRating(data[0].calificacion / 2);
                }
            } catch (error) {
                console.error('Error al obtener la calificación:', error);
            }
        };

        fetchCalificacion();
    }, [pelicula, user_id]);

    const handleRatingChange = (event, newValue) => {
        guardarCalificacion(newValue);

    };

    return <Container>
        <div id="sinopsis-imagen" className="row flex-column flex-lg-row">
            <div className="col d-flex justify-content-center align-items-center">
                <img className="image-principal" src={pelicula.thumbnail || placeholderImage} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
            <div className="col">
                <div className="info-container">

                    <h2 className="title-sub-peliculas">Sinopsis</h2>


                    <p className="card-text" style={{ textAlign: 'justify' }}>
                        {pelicula.extract ? pelicula.extract :
                            <>
                                <Skeleton variant="text" width={500} />
                                <Skeleton variant="text" width={500} />
                                <Skeleton variant="text" width={500} />
                                <Skeleton variant="text" width={500} />
                            </>
                        }
                    </p>

                    <h2 className="title-sub-elenco">Elenco <PersonIcon /></h2>

                    <p className="card-text" style={{ textAlign: 'justify' }}>
                        {pelicula.cast ? pelicula.cast.join(', ') : (
                            <Skeleton variant="text" width={500} />
                        )}
                    </p>
                    {(pelicula.genres != null ? pelicula.genres : []).map((genero, index) => (
                        <label key={index} className="type-pelicula">{genero}</label>
                    ))}

                    <Box pl={2} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        {isLoading ? (
                            <div className="stars-loading-container">
                                <StarIcon className="star"></StarIcon>
                                <StarIcon className="star"></StarIcon>
                                <StarIcon className="star"></StarIcon>
                                <StarIcon className="star"></StarIcon>
                                <StarIcon className="star"></StarIcon>
                            </div>
                        ) : (
                            <>
                                {calificacion !== null ? (
                                    <Rating
                                        precision={0.5}
                                        name="simple-controlled"
                                        value={calificacion}
                                        readOnly
                                    />
                                ) : (
                                    <div className="stars-loading-container">
                                        <StarIcon className="star"></StarIcon>
                                        <StarIcon className="star"></StarIcon>
                                        <StarIcon className="star"></StarIcon>
                                        <StarIcon className="star"></StarIcon>
                                        <StarIcon className="star"></StarIcon>
                                    </div>
                                )}
                            </>
                        )}
                    </Box>
                </div>
            </div>
        </div>
    </Container>
}

export default SinopsisMovie