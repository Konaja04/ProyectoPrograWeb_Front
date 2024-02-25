import './SalasItemPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../common/Navbar'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import HistoriaSala from '../../common/HistoriaSala';
import ListaPeliculasDisponible from '../../common/ListaPeliculasDisponible';
import FmdGoodIcon from '@mui/icons-material/FmdGood';


const SalasItemPage = () => {
    const { path } = useParams();
    const [pelicula, setDataPelicula] = useState({})
    const [salas, setDataSalas] = useState([])

    const obtenerData = async () => {

        const responseSalas = await fetch(`http://127.0.0.1:8000/salas_cine/ver-sala/${path}`);
        const dataSalas = await responseSalas.json();
        setDataSalas(dataSalas);

    };

    useEffect(() => {
        obtenerData();
    }, [path]);

    useEffect(() => {

        const obtenerPelis = async () => {

            const responsePelis = await fetch(`http://127.0.0.1:8000/salas_cine/obtener-peliculas-disponibles/${salas.id}/`);
            const dataPelis = await responsePelis.json();
            setDataPelicula(dataPelis);

        };
        obtenerPelis();

    }, [pelicula]);


    return <div>
        <NavBar />
        <div id="main-content">
            <div className="container pt-3">
                <div id="second-content">
                    <h1>{`Cine ${salas.name}`}</h1>
                    <hr />
                    <div id="first-part">
                        <FmdGoodIcon className="icon-time" />
                        <p className="image-logo-ubicacion">{`${salas.second_address}`}</p>
                    </div>
                    <HistoriaSala sala={salas} />
                    <ListaPeliculasDisponible />
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
    </div>
}

export default SalasItemPage