import './PeliculasItemPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../common/Navbar'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import SinopsisMovie from './components/SinopsisMovie';
import ListaSalaDisponible from './components/ListaSalaDisponible';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

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
const PeliculasItemPage = () => {
    const { path } = useParams();
    const [pelicula, setDataPelicula] = useState({})
    const [salas, setDataSalas] = useState([])

    // const obtenerData = async () => {

    //     const responseSalas = await fetch("http://localhost:3000/data_json/salas_data.json")
    //     const responsePelis = await fetch("https://raw.githubusercontent.com/ulima-pw/data-20240/main/peliculas_limpio.json")
    //     const dataSalas = await responseSalas.json()
    //     const dataPelis = await responsePelis.json()
    //     setDataPelicula(dataPelis.filter((pelicula) => {
    //         return pelicula.path == path
    //     })[0])
    //     setDataSalas(obtenerSalasRandom(dataSalas, 8))

    // }
    const obtenerData = async () => {

        const responsePelis = await fetch(`http://127.0.0.1:8000/salas_cine/ver-pelicula/${path}`);
        const dataPelis = await responsePelis.json();
        setDataPelicula(dataPelis);

        const responseSalas = await fetch(`http://127.0.0.1:8000/salas_cine/obtener_salas_disponibles/${pelicula.id}`);
        const dataSalas = await responseSalas.json();
        setDataSalas(dataSalas.salas_disponibles);
    };

    useEffect(() => {
        obtenerData();
    }, []);

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
                    <h1 className="mt-4">Películas</h1>
                    <hr />
                    <div className='second-content'>
                        <h1>{pelicula.title}</h1>
                        <div id="first-part">
                            <AccessTimeFilledIcon className="icon-time" />
                            <p class="image-logo-ubicacion">{pelicula.year}</p>

                        </div>
                        <SinopsisMovie pelicula={pelicula} />
                        <ListaSalaDisponible salas={salas} pelicula={pelicula} />
                        < div id="disqus_thread" ></div >


                    </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
        </div>
    );
}

export default PeliculasItemPage