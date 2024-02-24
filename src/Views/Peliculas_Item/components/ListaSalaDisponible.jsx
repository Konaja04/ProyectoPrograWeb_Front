import { Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import '../../Peliculas_Item/PeliculasItemPage.css'
import { Grid } from "@mui/material";
import Carousel from 'react-material-ui-carousel';

const ListaSalaDisponible = ({ salas, pelicula }) => {
    const navigate = useNavigate();


    const realizarReserva = (funcion_id) => {
        navigate(`/reserva/${funcion_id}`);
    }

    const salasAgrupadas = salas.reduce((rows, sala, index) => {
        if (index % 3 === 0) rows.push([]);
        rows[rows.length - 1].push(sala);
        return rows;
    }, []);

    return (
        <Container sx={{ py: 12 }} maxWidth="md">
            <h1 id="title-salas">Salas Disponibles</h1>
            <hr />
            <Carousel
                autoPlay={false}
                animation="slide"
                indicators={false}
            >
                {salasAgrupadas.map((row, rowIndex) => (
                    <Grid key={rowIndex} container spacing={4}>
                        {row.map((sala, salaIndex) => (
                            <Grid key={salaIndex} item xs={12} sm={6} md={4}>
                                <div className="sala-container">
                                    <img className="img-salas-dispo" src={sala.img} alt={sala.name} />
                                    <div className="sala-info">
                                        <label className="sala-A-1">{sala.name}</label>
                                        <p className="sala-A-2" style={{ textAlign: 'justify' }}>
                                            {sala.description != null ? sala.description.slice(0, 150) : "No disponible"}
                                        </p>
                                    </div>
                                    <div className="sala-times">

                                        {sala.available_times.map((available_times, index) => (
                                            <button
                                                key={index}
                                                className="btn-sala-A"
                                                onClick={() => realizarReserva(available_times.funcion_id)}
                                            >
                                                {available_times.hora}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Carousel>
        </Container>
    );
}
export default ListaSalaDisponible