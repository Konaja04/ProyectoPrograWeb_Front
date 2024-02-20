import './SalasItemPage.css';
import ubicacion from '../../Img/ubicacion.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../components/Navbar'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import HistoriaSala from '../../components/HistoriaSala';
import ListaPeliculasDisponible from '../../components/ListaPeliculasDisponible';
import FmdGoodIcon from '@mui/icons-material/FmdGood';


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
const SalasItemPage = () => {
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

    return <div>
        <NavBar />
        <div id="main-content">
            <div className="container pt-3">
                <div id="second-content">
                    <h1>{`Cine ${sala.name}`}</h1>
                    <hr />
                    <div id="first-part">
                        <FmdGoodIcon className="icon-time" />
                        <p className="image-logo-ubicacion">{`${sala.secondAddress}`}</p>
                    </div>
                    <HistoriaSala />
                    <ListaPeliculasDisponible />
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
    </div>
}

export default SalasItemPage