import './SalasItemPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../common/Navbar'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import HistoriaSala from './components/HistoriaSala';
import ListaPeliculasDisponible from './components/ListaPeliculasDisponible';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { CircularProgress, Skeleton } from "@mui/material";


const SalasItemPage = () => {
    const navigate = useNavigate();

    const { path } = useParams();
    const [sala, setDataSala] = useState([])
    const [pelicula, setDataPelicula] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingFunciones, setIsLoadingFunciones] = useState(true);

    const obtenerData = async () => {


        const responseSala = await fetch(`https://backend-salas-ulima-20211628.azurewebsites.net/salas_cine/ver-sala/${path}`);
        const dataSala = await responseSala.json();
        setDataSala(dataSala);
        setIsLoading(false);
    };

    useEffect(() => {
        if (localStorage.getItem("USER_ID") == null) {
            navigate("/")
            return
        }
        obtenerData();
    }, []);

    useEffect(() => {

        const obtenerPelis = async () => {

            const responsePelis = await fetch(`https://backend-salas-ulima-20211628.azurewebsites.net/salas_cine/obtener_peliculas_disponibles/${sala.id}/`);
            const dataPelis = await responsePelis.json();
            setDataPelicula(dataPelis);
            setIsLoadingFunciones(false);

        };
        obtenerPelis();

    }, [sala]);


    return <div>
        <NavBar />
        <div id="main-content">
            <div className="container pt-3">
                <div id="second-content">
                    <h1 className="title-primer-peliculas">Salas</h1>
                    <hr />
                    <div className='second-content'>

                        <h1 className='title-pelicula-detalle'>
                            {sala.name ? sala.name : <Skeleton variant="text" width={300} height={80} />}
                        </h1>

                        <div id="first-part">
                            <FmdGoodIcon className="icon-time" />
                            <p className="image-logo-ubicacion">{sala.second_address}</p>
                        </div>


                        <HistoriaSala sala={sala} />
                        {isLoadingFunciones ?
                            <>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh', color: 'rgb(250, 117, 37)' }}>
                                    <CircularProgress />
                                </div>
                            </>
                            :
                            <>
                                <ListaPeliculasDisponible peliculas={pelicula} />

                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
    </div>
}

export default SalasItemPage