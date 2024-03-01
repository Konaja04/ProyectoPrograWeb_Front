import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import '../../Peliculas_Item/PeliculasItemPage.css'
import { Grid, CircularProgress, Skeleton } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';



const PeliculasRecomendadas = () => {
    const [pelis, setDataPelis] = useState([])
    const [isLoading, setIsLoading] = useState(true);


    const obtenerSala = async () => {
        const user_id = localStorage.getItem('ID')
        console.log(user_id)
        const response = await fetch(`https://backend-salas-ulima-20211628.azurewebsites.net/salas_cine/getRecomendaciones/${user_id}`)
        const data = await response.json()
        setDataPelis(data)
        setIsLoading(false)
    }
    useEffect(() => {
        obtenerSala()
    }, [])

    return <Container sx={{ py: 12 }} maxWidth="md">

        <h1 id="title-peliculas">Recomendados</h1>

        {isLoading ?
            <>

                <div style={{ display: 'flex' }}>
                    <Skeleton variant="rectangular" width={232} height={350} style={{ marginLeft: "15px", marginRight: "45px", borderRadius: "12px" }} />
                    <Skeleton variant="rectangular" width={232} height={350} style={{ marginLeft: "15px", marginRight: "40px", borderRadius: "12px" }} />
                    <Skeleton variant="rectangular" width={232} height={350} style={{ marginLeft: "15px", marginRight: "35px", borderRadius: "12px" }} />
                    <Skeleton variant="rectangular" width={232} height={350} style={{ marginLeft: "20px", borderRadius: "12px" }} />
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
            </>
        }
    </Container >

}

export default PeliculasRecomendadas