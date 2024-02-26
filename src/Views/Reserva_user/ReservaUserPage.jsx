import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../common/Navbar'
import { Box, Container, Grid, Typography, Divider, Avatar, CircularProgress } from '@mui/material';

//Icons
import { useEffect, useState } from 'react';
import ReservaItemCard from './components/ReservaItemCard';


const ReservaUserPage = () => {

    const [reservas, setDataReservas] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const traerReservas = async () => {
        const datausuario = {
            email: sessionStorage.getItem("CORREO")
        }
        const response = await fetch('http://localhost:8000/salas_cine/verReservas', {
            method: "post",
            body: JSON.stringify(datausuario)
        })

        const data = await response.json()
        console.log()
        setDataReservas(data.reservas)
        setIsLoading(false)
    }
    useEffect(() => {
        traerReservas()
    }, [])
    return (
        <div>
            <NavBar />
            <Container>
                <Divider />
                <Grid container mt={2} spacing={2}>
                    <Grid item xs={12} lg={4.5}>
                        <Box className="col info-container" mt={2} p={2}>
                            <Typography variant="h4" align="center"><b>Usuario</b></Typography>
                            <Box display="flex" justifyContent="center" mt={2}>
                                <Avatar
                                    src={sessionStorage.getItem("IMG")}
                                    style={{ width: '120px', height: '120px' }}
                                />
                            </Box>
                            <Box mt={6} mb={60}>
                                <Typography mt={2} variant="h6"><b>Nombre: </b>{`${sessionStorage.getItem("NOMBRE")}`}</Typography>
                                <Typography mt={2} variant="h6"><b>Apellido: </b>{`${sessionStorage.getItem("APELLIDO")}`}</Typography>
                                <Typography mt={2} variant="h6"><b>Correo: </b>{`${sessionStorage.getItem("CORREO")}`}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={7.5}>
                        <Box className="col info-container" mt={2} p={2}>
                            <Typography variant="h4" align="center"><b>Mis reservas</b></Typography>
                        </Box>

                        {isLoading ?
                            <>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                                    <CircularProgress />
                                </div>
                            </>
                            :
                            <>
                                {
                                    reservas.map((reserva, index) => (
                                        < Box key={index} className="col info-container" mt={2} p={2} >
                                            <ReservaItemCard reserva={reserva} />
                                        </Box>
                                    ))
                                }

                            </>
                        }
                    </Grid>
                </Grid>
            </Container>
        </div >
    );
}

export default ReservaUserPage