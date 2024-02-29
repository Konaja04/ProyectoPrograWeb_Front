import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../common/Navbar'
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Divider, Avatar, CircularProgress, Button } from '@mui/material';

//Icons
import { useEffect, useState } from 'react';
import ReservaItemCard from './components/ReservaItemCard';
import CambiarContrasena from './components/CambiarContrasena';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import PasswordIcon from '@mui/icons-material/Password';
import StarIcon from '@mui/icons-material/Star';
const ReservaUserPage = () => {

    const [reservas, setDataReservas] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [showReservas, setShowReservas] = useState(true);
    const [showCalificaciones, setShowCalificaciones] = useState(false);
    const [showCambiarContrasena, setShowCambiarContrasena] = useState(false);

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

    const handleClickReservas = () => {
        setShowReservas(true);
        setShowCalificaciones(false);
        setShowCambiarContrasena(false);
    }

    const handleClickCalificaciones = () => {
        setShowReservas(false);
        setShowCalificaciones(true);
        setShowCambiarContrasena(false);
    }

    const handleClickCambiarContrasena = () => {
        setShowReservas(false);
        setShowCalificaciones(false);
        setShowCambiarContrasena(true);
    }


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
                            <Box mt={6} mb={30}>
                                <Typography mt={2} variant="h6"><b>Nombre: </b>{`${sessionStorage.getItem("NOMBRE")}`}</Typography>
                                <Typography mt={2} variant="h6"><b>Apellido: </b>{`${sessionStorage.getItem("APELLIDO")}`}</Typography>
                                <Typography mt={2} variant="h6"><b>Correo: </b>{`${sessionStorage.getItem("CORREO")}`}</Typography>
                            </Box>
                            <Box mt={6}>
                                <Box sx={{ p: 2 }} >
                                    <BookmarkAddedIcon />
                                    <Button
                                        sx={{ width: '300px', height: '40px', color: 'black' }}
                                        onClick={handleClickReservas}
                                    >
                                        Mis reservas
                                    </Button>
                                </Box>

                                <Box sx={{ p: 2 }}>
                                    <StarIcon />
                                    <Button
                                        sx={{ width: '300px', height: '40px', color: 'black' }}
                                        onClick={handleClickCalificaciones}
                                    >
                                        Mis calificaciones
                                    </Button>
                                </Box>

                                <Box sx={{ p: 2 }} >
                                    <PasswordIcon />
                                    <Button
                                        sx={{ width: '300px', height: '40px', color: 'black' }}
                                        onClick={handleClickCambiarContrasena}
                                    >
                                        Cambiar Contraseña
                                    </Button>
                                </Box>

                                <Box sx={{ p: 2 }} >
                                    <ExitToAppIcon />
                                    <Link to="/inicio/">
                                        <Button
                                            sx={{ width: '300px', height: '40px', color: 'black' }}
                                        >
                                            Cerrar Sesión
                                        </Button>
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} lg={7.5}>
                        <Box className="col info-container" mt={2} p={2}>
                            <Typography variant="h4" align="center"><b>Mi cuenta</b></Typography>
                        </Box>

                        {showReservas ? (
                            isLoading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                                    <CircularProgress />
                                </div>
                            ) : (
                                <div>
                                    <Box height="750px" className="col info-container" mt={2} p={1}>
                                        <h4 style={{ marginLeft: "15px", marginTop: "10px" }}>Mis reservas</h4>
                                        <hr />
                                        <Box height="660px" overflow="auto">
                                            {reservas && reservas.map((reserva, index) => (
                                                <Box key={index} className="col info-container-card" mt={2} p={2}>
                                                    <ReservaItemCard reserva={reserva} />
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </div>
                            )
                        ) : null}

                        {showCalificaciones ? (
                            <div>
                                <Box height="750px" className="col info-container" mt={2} p={1}>
                                    <h4 style={{ marginLeft: "15px", marginTop: "10px" }}>Mis calificaciones</h4>
                                    <hr />
                                    <Box height="660px" overflow="auto">
                                        {/* Aquí deberías renderizar el componente para mostrar las calificaciones del usuario */}
                                        {/* <CalificacionesItemCard /> */}
                                    </Box>
                                </Box>
                            </div>
                        ) : null}

                        {showCambiarContrasena ? <CambiarContrasena /> : null}

                    </Grid>
                </Grid>
            </Container>
        </div >
    );
}

export default ReservaUserPage