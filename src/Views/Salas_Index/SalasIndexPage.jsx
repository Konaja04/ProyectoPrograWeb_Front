
import './SalasIndexPage.css';
import Navbar from '../../common/Navbar';
import CardViewSalas from './components/CardViewSalas';
import {
    Container,
    Grid,
    TextField,
    Pagination,
    Box,
    CircularProgress, InputAdornment
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const SalasIndexPage = () => {

    const [salas, setDataSalas] = useState([])
    const [salasTotal, setDataSalasTotal] = useState([])
    const [busqueda, setBusqueda] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const handleSearchChange = (event) => {
        setBusqueda(event.target.value);
    };

    const obtenerSalas = async () => {
        setIsLoading(true)
        const response = await fetch("http://127.0.0.1:8000/salas_cine/ver-salas")
        const data = await response.json()
        setDataSalasTotal(data)
        setDataSalas(
            data
        )
        setIsLoading(false)
    }
    const filtrarSalas = () => {
        const filteredSalas = busqueda ? salasTotal.filter((sala) =>
        (sala.name.toLowerCase().includes(busqueda.toLowerCase()) ||
            sala.second_address.toLowerCase().includes(busqueda.toLowerCase()))
        ) : salasTotal;
        setDataSalas(
            filteredSalas
        )
    }
    useEffect(() => {
        obtenerSalas()
    }, [])

    useEffect(() => {
        filtrarSalas()
    }, [busqueda])


    return (
        <div className='salas-page'>
            <Navbar />
            <Container sx={{ py: 8 }} maxWidth="md">
                <h1 id="title-peliculas">Salas disponibles</h1>
                {isLoading ?
                    <>
                        <Grid id="buscar-container">
                            <TextField
                                variant="standard"
                                margin="normal"
                                fullWidth
                                placeholder="Busca por título"
                                value={busqueda}
                                onChange={handleSearchChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    disableUnderline: true
                                }} style={{ marginLeft: "15px" }}

                            />
                        </Grid>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                            <CircularProgress />
                        </div>
                    </>
                    :
                    <>
                        <Grid id="buscar-container">
                            <TextField
                                variant="standard"
                                margin="normal"
                                fullWidth
                                placeholder="Busca por título"
                                value={busqueda}
                                onChange={handleSearchChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    disableUnderline: true
                                }} style={{ marginLeft: "15px" }}

                            />
                        </Grid>
                        <Grid container spacing={4}>
                            {salas.map((sala, index) => (
                                <Grid item key={index} xs={12} sm={6} md={6}>
                                    <Link to={'/sala/' + sala.path} style={{ textDecoration: 'none' }}>
                                        <CardViewSalas data={sala} type="sala" imageHeight="100%" />
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                }
            </Container>
        </div>
    );
}

export default SalasIndexPage