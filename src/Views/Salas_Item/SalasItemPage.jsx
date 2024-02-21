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
    const [sala, setDataSala] = useState({})

    const obtenerSala = async () => {

        const response = await fetch("https://raw.githubusercontent.com/ulima-pw/data-20240/main/salasv2.json")
        const data = await response.json()
        setDataSala(data.filter((sala) => {
            return sala.path === path
        })[0])
    }
    useEffect(() => {
        obtenerSala()
    },)

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