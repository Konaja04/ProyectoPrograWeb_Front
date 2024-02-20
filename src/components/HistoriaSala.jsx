import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ListaPeliculaDisponible from "./ListaPeliculasDisponible";
import '../Views/Salas_Item/SalasItemPage.css'

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

const HistoriaSala = () => {
    const { path } = useParams();
    const [sala, setDataSala] = useState({})
    const [pelis, setDataPelis] = useState([])

    const navigate = useNavigate();

    const realizarReserva = (pelicula, horario) => {
        navigate("/reserva/" + sala.ID + "/" + pelicula.id + "/" + horario)
    }

    const obtenerSala = async () => {

        const response = await fetch("https://raw.githubusercontent.com/ulima-pw/data-20240/main/salasv2.json")
        const responsePelis = await fetch("https://raw.githubusercontent.com/ulima-pw/data-20240/main/peliculas_limpio.json")
        const data = await response.json()
        const dataPelis = await responsePelis.json()
        setDataSala(data.filter((sala) => {
            return sala.path == path
        })[0])
        setDataPelis(obtenerPeliculasRandom(dataPelis, 5))

    }
    useEffect(() => {
        obtenerSala()
    }, [])

    return <Container>
        <div id="salas-historia" className="row flex-column flex-lg-row">
            <div className="col">
                <img className="image-principal-salas" src={sala.img} />
            </div>
            <div className="col">
                <div className="card-body-salas">
                    <h2 className="card-title">Historia</h2>
                    <p className="card-text" style={{ textAlign: 'justify' }}>{sala.description}</p>
                    {
                        (sala.formats != null ? sala.formats : []).map((formatos) => (

                            <label className="type-sala">{formatos}</label>
                        ))
                    }
                </div>
            </div>
        </div>
    </Container>
}

export default HistoriaSala