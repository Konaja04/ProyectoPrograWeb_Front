import './SalasItemPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../common/Navbar'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import HistoriaSala from './components/HistoriaSala';
import ListaPeliculasDisponible from './components/ListaPeliculasDisponible';
import FmdGoodIcon from '@mui/icons-material/FmdGood';


const SalasItemPage = () => {
    const { path } = useParams();
    const [sala, setDataSala] = useState([])
    const [pelicula, setDataPelicula] = useState([])

    const obtenerData = async () => {


        const responseSala = await fetch(`http://127.0.0.1:8000/salas_cine/ver-sala/${path}`);
        const dataSala = await responseSala.json();
        setDataSala(dataSala);
    };

    useEffect(() => {
        obtenerData();
    }, [path]);

    useEffect(() => {

        const obtenerPelis = async () => {

            const responsePelis = await fetch(`http://127.0.0.1:8000/salas_cine/obtener_peliculas_disponibles/${sala.id}/`);
            const dataPelis = await responsePelis.json();
            setDataPelicula(dataPelis);
            console.log(dataPelis)

        };
        obtenerPelis();

    }, [sala]);


    return <div>
        <NavBar />
        <div id="main-content">
            <div className="container pt-3">
                <div id="second-content">
                    <h1>{`Cine ${sala.name}`}</h1>
                    <hr />
                    <div id="first-part">
                        <FmdGoodIcon className="icon-time" />
                        <p className="image-logo-ubicacion">{`${sala.second_address}`}</p>
                    </div>
                    <HistoriaSala sala={sala} />
                    <ListaPeliculasDisponible peliculas={pelicula} />
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
    </div>
}

export default SalasItemPage