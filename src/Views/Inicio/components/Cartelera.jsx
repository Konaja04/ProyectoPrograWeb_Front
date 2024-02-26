import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import '../../Peliculas_Item/PeliculasItemPage.css'
import { Grid } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { CircularProgress } from '@mui/material';



const Cartelera = () => {
    const [pelis, setDataPelis] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const obtenerCartelera = async () => {

        const response = await fetch("http://127.0.0.1:8000/salas_cine/cartelera")
        const dataPelis = await response.json()
        setDataPelis(dataPelis)
        setIsLoading(false)

    }
    useEffect(() => {
        obtenerCartelera()
    }, [])

    return <Container sx={{ py: 12 }} style={{ marginTop: '160px' }} maxWidth="md">
        <h1 id="title-peliculas">En cartelera</h1>
        {isLoading ?
            <>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                    <CircularProgress />
                </div>
            </>
            :
            <>
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
                                        src={pelicula.thumbnail}
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
            </>
        }
    </Container >


}

export default Cartelera