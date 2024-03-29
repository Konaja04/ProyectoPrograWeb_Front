import React from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';

const CustomCarousel = ({ peliculas }) => {
    return (
        <Box>
            <Grid item xs={12}>
                <Carousel>
                    {peliculas.map((pelicula, index) => (
                        <Grid
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                height: '600px',
                            }}
                        >
                            <img
                                src={pelicula.thumb_baner}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                            <Typography
                                id="card-title"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    width: '100%',
                                    padding: '40px',
                                    textAlign: 'left',
                                    color: '#fff',

                                }}
                            >
                                {pelicula.title || 'Título'}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        paddingRight: '40px',
                                    }}
                                >



                                    <Link to={"/pelicula/" + pelicula.path} style={{ textDecoration: "none" }}>
                                        <button variant="contained" className='botones-overlay-detalles'
                                        >
                                            < ConfirmationNumberOutlinedIcon fontSize="large" /> Comprar
                                        </button>
                                    </Link>
                                </Box>
                                <Box id="extract-carrusel">
                                    {pelicula.extract != null ? pelicula.extract.slice(0, 100) + "..." : "No disponible"}

                                </Box>

                            </Typography>

                        </Grid>
                    ))}
                </Carousel>
            </Grid >
        </Box >
    );
};

export default CustomCarousel;