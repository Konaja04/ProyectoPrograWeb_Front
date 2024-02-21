import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import '../Views/Peliculas_Item/PeliculasItemPage.css'
import { Grid } from "@mui/material";
import Carousel from 'react-material-ui-carousel';

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

const ListaPeliculaDisponible = () => {
    const { path } = useParams();
    const [sala, setDataSala] = useState({})
    const [pelis, setDataPelis] = useState([])

    const navigate = useNavigate();

    const realizarReserva = (pelicula, horario) => {
        navigate("/reserva/" + sala.ID + "/" + pelicula.id + "/" + horario.toString())
    }

    const obtenerSala = async () => {

        const response = await fetch("https://raw.githubusercontent.com/ulima-pw/data-20240/main/salasv2.json")
        const responsePelis = await fetch("https://raw.githubusercontent.com/ulima-pw/data-20240/main/peliculas_limpio.json")
        const data = await response.json()
        const dataPelis = await responsePelis.json()
        setDataSala(data.filter((sala) => {
            return sala.path == path
        })[0])
        setDataPelis(obtenerPeliculasRandom(dataPelis, 8))

    }
    useEffect(() => {
        obtenerSala()
    }, [])

    return <Container sx={{ py: 12 }} maxWidth="md">
        <h1 id="title-pelicuas">Funciones Disponibles</h1>
        <hr />
        <Carousel
            autoPlay={false}
            animation="slide"
            indicators={false}
        >
            {pelis.reduce((rows, pelicula, index) => {
                if (index % 3 === 0) rows.push([]);
                rows[rows.length - 1].push(


                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <div key={index} className="peliculas-container">
                            <img className="img-peliculas-dispo"
                                src={pelicula.thumbnail}
                            />
                            <div className="sala-info">
                                <p className="sala-A-1">{`${pelicula.title}  (${pelicula.year})`}</p>
                                <p className="sala-A-2" style={{ textAlign: 'justify' }}> {pelicula.extract != null ? pelicula.extract.slice(0, 30) + "..." : "No disponible"}</p>
                            </div>
                            <div className="sala-times">
                                <button className="btn-sala-A" onClick={() => realizarReserva(pelicula, "15:00")}>15:00</button>
                                <button className="btn-sala-A" onClick={() => realizarReserva(pelicula, "17:00")}>17:00</button>
                                <button className="btn-sala-A" onClick={() => realizarReserva(pelicula, "20:00")}>20:00</button>
                                <br />
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

export default ListaPeliculaDisponible