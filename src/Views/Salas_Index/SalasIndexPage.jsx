
import './SalasIndexPage.css';
import Navbar from '../../components/Navbar';
import CardViewSalas from '../../components/CardViewSalas';
import Grid from '@mui/material/Grid';
import { Container, TextField } from '@mui/material/';
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';

const SalasIndexPage = () => {

    const [salas, setDataSalas] = useState([])
    const [busqueda, setBusqueda] = useState("");
    const handleSearchChange = (event) => {
        setBusqueda(event.target.value);
    };

    const obtenerSalas = async () => {

        const response = await fetch("http://localhost:3000/data_json/salas_data.json")
        const data = await response.json()
        const filteredSalas = busqueda ? data.filter((sala) =>
            (sala.name.toLowerCase().includes(busqueda.toLowerCase()) || sala.secondAddress.toLowerCase().includes(busqueda.toLowerCase()))
        ) : data;

        setDataSalas(
            filteredSalas
        )
    }

    useEffect(() => {
        obtenerSalas()
    }, [busqueda])


    return (
        <div className='salas-page'>
            <Navbar />
            <Container sx={{ py: 8 }} maxWidth="md">
                <h1>Salas disponibles</h1>
                <Grid>
                    <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        placeholder="Busca por sala"
                        style={{ marginBottom: "60px" }}
                        value={busqueda}
                        onChange={handleSearchChange}
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
            </Container>
        </div>
    );
}

export default SalasIndexPage