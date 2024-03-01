import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../common/Navbar'
import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Typography, Divider, TextField, Avatar, CircularProgress, Button, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

//Icons
import { useEffect, useState } from 'react';
import ReservaItemCard from './components/ReservaItemCard';
import CambiarContrasena from './components/CambiarContrasena';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import PasswordIcon from '@mui/icons-material/Password';
import StarIcon from '@mui/icons-material/Star';
import CalificacionItem from './components/CalificacionItem';
import PersonIcon from '@mui/icons-material/Person';

const ReservaUserPage = () => {

    const navigate = useNavigate();

    const [reservas, setDataReservas] = useState([])
    const [calificaciones, setDataCalificaciones] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [showReservas, setShowReservas] = useState(true);
    const [showCalificaciones, setShowCalificaciones] = useState(false);
    const [showCambiarContrasena, setShowCambiarContrasena] = useState(false);
    const [showPerfil, setshowPerfil] = useState(false);

    const traerReservas = async () => {
        const datausuario = {
            email: localStorage.getItem("CORREO")
        }
        const response = await fetch('https://backend-salas-ulima-20211628.azurewebsites.net/salas_cine/verReservas', {
            method: "post",
            body: JSON.stringify(datausuario)
        })

        const data = await response.json()
        console.log()
        setDataReservas(data.reservas)
        setIsLoading(false)
    }
    const traerCalificaciones = async () => {
        setIsLoading(true)
        const datausuario = {
            user_id: localStorage.getItem("USER_ID")
        }
        const response = await fetch('https://backend-salas-ulima-20211628.azurewebsites.net/salas_cine/calificacionesUsuario', {
            method: "post",
            body: JSON.stringify(datausuario)
        })

        const data = await response.json()

        setDataCalificaciones(data)
        setIsLoading(false)
    }

    useEffect(() => {
        if (localStorage.getItem("USER_ID") == null) {
            navigate("/")
            return
        }
        traerReservas()
        traerCalificaciones()
    }, [])


    const handleClickPerfil = () => {
        setshowPerfil(true);
        setShowReservas(false);
        setShowCalificaciones(false);
        setShowCambiarContrasena(false);
    }


    const handleClickReservas = () => {
        setshowPerfil(false);
        setShowReservas(true);
        setShowCalificaciones(false);
        setShowCambiarContrasena(false);
    }

    const handleClickCalificaciones = () => {
        setshowPerfil(false);
        setShowReservas(false);
        setShowCalificaciones(true);
        setShowCambiarContrasena(false);
    }

    const handleClickCambiarContrasena = () => {
        setshowPerfil(false);
        setShowReservas(false);
        setShowCalificaciones(false);
        setShowCambiarContrasena(true);
    }

    const logoutOnClick = () => {
        localStorage.clear()
        navigate("/")
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
                                    src={localStorage.getItem("IMG")}
                                    style={{ width: '120px', height: '120px' }}
                                />
                            </Box>

                            <Box mt={6} marginBottom={34.5}>
                                <ListItem sx={{ p: 2 }} button onClick={handleClickPerfil}>
                                    <ListItemIcon>
                                        <PersonIcon sx={{ color: "black" }} />
                                    </ListItemIcon>
                                    <ListItemText sx={{ textAlign: 'left', marginLeft: '10px' }}>Mi Perfil</ListItemText>
                                </ListItem>
                                <ListItem sx={{ p: 2 }} button onClick={handleClickReservas}>
                                    <ListItemIcon>
                                        <BookmarkAddedIcon sx={{ color: "black" }} />
                                    </ListItemIcon>
                                    <ListItemText sx={{ textAlign: 'left', marginLeft: '10px' }}>Mis Reservas</ListItemText>
                                </ListItem>

                                <ListItem sx={{ p: 2 }} button onClick={handleClickCalificaciones}>
                                    <ListItemIcon>
                                        <StarIcon sx={{ color: "black" }} />
                                    </ListItemIcon>
                                    <ListItemText sx={{ textAlign: 'left', marginLeft: '10px' }}>Mis Calificaciones</ListItemText>
                                </ListItem>

                                <ListItem sx={{ p: 2 }} button onClick={handleClickCambiarContrasena}>
                                    <ListItemIcon>
                                        <PasswordIcon sx={{ color: "black" }} />
                                    </ListItemIcon>
                                    <ListItemText sx={{ textAlign: 'left', marginLeft: '10px' }}>Cambiar Contraseña</ListItemText>
                                </ListItem>

                                <ListItem sx={{ p: 2 }} button onClick={logoutOnClick}>
                                    <ListItemIcon>
                                        <ExitToAppIcon sx={{ color: "black" }} />
                                    </ListItemIcon>
                                    <ListItemText sx={{ textAlign: 'left', marginLeft: '10px' }}>Cerrar Sesión</ListItemText>
                                </ListItem>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} lg={7.5}>
                        <Box className="col info-container" mt={2} p={2}>
                            <Typography variant="h4" align="center"><b>Mi cuenta</b></Typography>
                        </Box>
                        {showPerfil ? (
                            isLoading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                                    <CircularProgress />
                                </div>
                            ) : (
                                <div className="col info-container" style={{ marginTop: "20px", padding: "10px" }}>
                                    <h4 style={{ marginLeft: "15px", marginTop: "10px" }}>Mis datos personales</h4>
                                    <hr />
                                    <Box mt={6} mb={6} className="form-userdata">
                                        <Grid container spacing={3}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="Nombre"
                                                    value={localStorage.getItem("NOMBRE")}
                                                    variant="outlined"
                                                    fullWidth
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    sx={{ mb: 2 }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="Apellido"
                                                    value={localStorage.getItem("APELLIDO")}
                                                    variant="outlined"
                                                    fullWidth
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    sx={{ mb: 2 }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="Código"
                                                    value={localStorage.getItem("CODIGO")}
                                                    variant="outlined"
                                                    fullWidth
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    sx={{ mb: 2 }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="Correo"
                                                    value={localStorage.getItem("CORREO")}
                                                    variant="outlined"
                                                    fullWidth
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    sx={{ mb: 2 }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </div>
                            )
                        ) : null}

                        {showReservas ? (
                            isLoading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                                    <CircularProgress />
                                </div>
                            ) : (
                                <div className="col info-container" style={{ marginTop: "20px", padding: "10px" }}>
                                    <h4 style={{ marginLeft: "15px", marginTop: "10px" }}>Mis reservas</h4>
                                    <hr />
                                    <div style={{ height: "660px", overflow: "auto" }}>
                                        {reservas && reservas.length > 0 ? (
                                            reservas.map((reserva, index) => (
                                                <div key={index} className="col info-container-card" style={{ marginTop: "20px", padding: "10px" }}>
                                                    <ReservaItemCard reserva={reserva} />
                                                </div>
                                            ))
                                        ) : (
                                            <p style={{ marginLeft: "15px", marginTop: "10px" }}>No tienes reservas.</p>
                                        )}
                                    </div>
                                </div>
                            )
                        ) : null}

                        {showCalificaciones ? (
                            isLoading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                                    <CircularProgress />
                                </div>
                            ) : (
                                <div className="col info-container" style={{ marginTop: "20px", padding: "10px" }}>
                                    <h4 style={{ marginLeft: "15px", marginTop: "10px" }}>Mis calificaciones</h4>
                                    <hr />
                                    <div style={{ height: "660px", overflow: "auto" }}>
                                        {calificaciones.length > 0 ? (
                                            calificaciones.map((calificacion, index) => (
                                                <div key={index} className="col" style={{ marginTop: "20px", padding: "10px" }}>
                                                    <CalificacionItem pelicula={calificacion} index={index + 1} />
                                                </div>
                                            ))
                                        ) : (
                                            <p style={{ marginLeft: "15px", marginTop: "10px" }}>No tienes calificaciones.</p>
                                        )}
                                    </div>
                                </div>
                            )
                        ) : null}


                        {showCambiarContrasena ? <CambiarContrasena /> : null}

                    </Grid>
                </Grid>
            </Container>
        </div >
    );
}

export default ReservaUserPage