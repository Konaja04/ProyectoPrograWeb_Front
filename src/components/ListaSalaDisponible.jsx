import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import '../Views/Peliculas_Item/PeliculasItemPage.css'
import { Grid } from "@mui/material";
import Carousel from 'react-material-ui-carousel';


const obtenerSalasRandom = (lista, cantidad) => {
    const salasClon = lista.slice();
    cantidad = Math.min(cantidad, salasClon.length);
    const salasRandom = [];

    for (let i = 0; i < cantidad; i++) {
        const indiceRandom = Math.floor(Math.random() * salasClon.length);
        const salaseleccionada = salasClon.splice(indiceRandom, 1)[0];
        salasRandom.push(salaseleccionada);
    }

    return salasRandom;
}

const ListaSalaDisponible = () => {
    const { path } = useParams();
    const [pelicula, setDataPelicula] = useState({})
    const [salas, setDataSalas] = useState([])
    const navigate = useNavigate();

    const realizarReserva = (sala, horario) => {
        navigate("/reserva/" + sala.ID + "/" + pelicula.id + "/" + horario)
    }

    const obtenerData = async () => {

        const responseSalas = await fetch("http://localhost:3000/data_json/salas_data.json")
        const responsePelis = await fetch("https://raw.githubusercontent.com/ulima-pw/data-20240/main/peliculas_limpio.json")
        const dataSalas = await responseSalas.json()
        const dataPelis = await responsePelis.json()
        setDataSalas(obtenerSalasRandom(dataSalas, 8))
        setDataPelicula(dataPelis.filter((pelicula) => {
            return pelicula.path == path
        })[0])
    }
    useEffect(() => {
        obtenerData()
    }, [])

    return (
        <Container sx={{ py: 12 }} maxWidth="md">
            <h1 id="title-salas">Salas Disponibles</h1>
            <hr />
            <Carousel
                autoPlay={false}
                animation="slide"
                indicators={false}
            >
                {salas.reduce((rows, sala, index) => {
                    if (index % 3 === 0) rows.push([]);
                    rows[rows.length - 1].push(

                        <Grid key={index} item xs={12} sm={6} md={4}>
                            <div className="sala-container">
                                <img className="img-salas-dispo" src={sala.img} alt={sala.name} />
                                <div className="sala-info">
                                    <label className="sala-A-1">{sala.name}</label>
                                    <p className="sala-A-2" style={{ textAlign: 'justify' }}>
                                        {sala.description != null ? sala.description.slice(0, 150) : "No disponible"}
                                    </p>
                                </div>
                                <div className="sala-times">
                                    {sala.available_times.map((available_time, index) => (
                                        <button
                                            key={index}
                                            className="btn-sala-A"
                                            onClick={() => realizarReserva(sala, available_time)}
                                        >
                                            {available_time}
                                        </button>
                                    ))}
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
    );
}

export default ListaSalaDisponible