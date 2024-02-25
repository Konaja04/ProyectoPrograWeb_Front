import './PeliculasItemPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../common/Navbar'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import SinopsisMovie from './components/SinopsisMovie';
import ListaSalaDisponible from './components/ListaSalaDisponible';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { CircularProgress } from "@mui/material";

const PeliculasItemPage = () => {
    const { path } = useParams();
    const [pelicula, setDataPelicula] = useState({})
    const [salas, setDataSalas] = useState([])
    const [isLoading, setIsLoading] = useState(true);


    const obtenerData = async () => {

        const responsePelis = await fetch(`http://127.0.0.1:8000/salas_cine/ver-pelicula/${path}`);
        const dataPelis = await responsePelis.json();
        setDataPelicula(dataPelis);

    };

    useEffect(() => {
        obtenerData();
    }, [path]);

    useEffect(() => {

        const obtenerSalas = async () => {

            const responseSalas = await fetch(`http://127.0.0.1:8000/salas_cine/obtener-salas-disponibles/${pelicula.id}/`);
            const dataSalas = await responseSalas.json();
            setDataSalas(dataSalas);
            setIsLoading(false)

        };
        obtenerSalas();

    }, [pelicula]);


    useEffect(() => {
        const loadDisqus = () => {
            if (window.DISQUS) {
                window.DISQUS.reset({
                    reload: true,
                    config: function () {
                        this.page.identifier = pelicula.id;
                        this.page.url = window.location.href;
                    },
                });
            } else {
                const script = document.createElement("script");
                script.src = "https://cine-g4.disqus.com/embed.js";
                script.setAttribute("data-timestamp", +new Date());
                document.body.appendChild(script);
            }
        };

        loadDisqus();
        return () => {
            const disqusThread = document.getElementById("disqus_thread");
            if (disqusThread) {
                while (disqusThread.firstChild) {
                    disqusThread.removeChild(disqusThread.firstChild);
                }
            }
        };
    }, []);


    return (
        <div>
            <NavBar />
            <div id="main-content">
                <div className="container">
                    <h1 className="title-primer-peliculas">Películas</h1>
                    <hr />
                    <div className='second-content'>
                        <h1 className='title-pelicula-detalle'>{pelicula.title}</h1>
                        <div id="first-part">
                            <AccessTimeFilledIcon className="icon-time" />
                            <p class="image-logo-ubicacion">{pelicula.year}</p>

                        </div>

                        <SinopsisMovie pelicula={pelicula} />

                        {isLoading ?
                            <>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh', color: 'rgb(250, 117, 37)' }}>
                                    <CircularProgress />
                                </div>
                            </>
                            :
                            <>
                                <ListaSalaDisponible salas={salas} pelicula={pelicula} />
                            </>
                        }
                        < div id="disqus_thread" ></div >


                    </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
        </div>
    );
}

export default PeliculasItemPage