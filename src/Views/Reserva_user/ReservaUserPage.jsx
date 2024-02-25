import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../common/Navbar'
import { Box, Container, Grid, Typography, Divider, Avatar } from '@mui/material';

//Icons
import TaskAltIcon from '@mui/icons-material/TaskAlt';


const ReservaUserPage = () => {

    return (
        <div>
            <NavBar />
            <Container>
                <Divider />
                <Grid container mt={2} spacing={2}>
                    <Grid item xs={12} lg={4.5}>
                        <Box className="col info-container" mt={2} p={2}>
                            <Typography variant="h4" align="center">Usuario</Typography>
                            <Box display="flex" justifyContent="center" mt={2}>
                                <Avatar src="https://th.bing.com/th/id/R.3c231f5962d9921a2994ffee2b1d09bb?rik=ucqVj9EiHGohYw&riu=http%3a%2f%2fwww.ofuxico.com.br%2fimg%2fupload%2fnoticias%2f2012%2f08%2f09%2f146109_36.jpg&ehk=9LKFBLd1n1Lt6CG3Gn%2fwee9GJsCwfVaMlJtSyyKIbkY%3d&risl=&pid=ImgRaw&r=0"
                                    style={{ width: '120px', height: '120px' }} />
                            </Box>
                            <Box mt={6} mb={60}>
                                <Typography mt={2} variant="h5">Nombre:</Typography>
                                <Typography mt={2} variant="h5">Apellido:</Typography>
                                <Typography mt={2} variant="h5">Correo:</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={7.5}>
                        <Box className="col info-container" mt={2} p={2}>
                            <Typography variant="h4" align="center">Mis reservas</Typography>
                        </Box>

                        <Box className="col info-container" mt={2} p={2}>
                            <Box display="flex" alignItems="center" mt={2}>
                                <Typography variant="h6">Nombre pelicula:</Typography>
                                <Box ml={2}>
                                    <Typography variant="h6">Si hay mas datos:</Typography>
                                </Box>
                            </Box>
                            <hr />
                            <Box display="flex" alignItems="center">
                                <img src="https://th.bing.com/th/id/R.3c231f5962d9921a2994ffee2b1d09bb?rik=ucqVj9EiHGohYw&riu=http%3a%2f%2fwww.ofuxico.com.br%2fimg%2fupload%2fnoticias%2f2012%2f08%2f09%2f146109_36.jpg&ehk=9LKFBLd1n1Lt6CG3Gn%2fwee9GJsCwfVaMlJtSyyKIbkY%3d&risl=&pid=ImgRaw&r=0"
                                    style={{ width: '140px', height: '120px', marginRight: '20px', borderRadius: '10px' }} />
                                <Box>
                                    <Typography variant="h6">Fecha:</Typography>
                                    <Typography variant="h6">Horario:</Typography>
                                    <Typography variant="h6">Entradas:</Typography>

                                </Box>
                            </Box>
                        </Box>

                        <Box className="col info-container" mt={2} p={2}>
                            <Box display="flex" alignItems="center" mt={2}>
                                <Typography variant="h6">Nombre pelicula:</Typography>
                                <Box ml={2}>
                                    <Typography variant="h6">Si hay mas datos:</Typography>
                                </Box>
                            </Box>
                            <hr />
                            <Box display="flex" alignItems="center">
                                <img src="https://th.bing.com/th/id/R.3c231f5962d9921a2994ffee2b1d09bb?rik=ucqVj9EiHGohYw&riu=http%3a%2f%2fwww.ofuxico.com.br%2fimg%2fupload%2fnoticias%2f2012%2f08%2f09%2f146109_36.jpg&ehk=9LKFBLd1n1Lt6CG3Gn%2fwee9GJsCwfVaMlJtSyyKIbkY%3d&risl=&pid=ImgRaw&r=0"
                                    style={{ width: '140px', height: '120px', marginRight: '20px', borderRadius: '10px' }} />
                                <Box>
                                    <Typography variant="h6">Fecha:</Typography>
                                    <Typography variant="h6">Horario:</Typography>
                                    <Typography variant="h6">Entradas:</Typography>

                                </Box>
                            </Box>
                        </Box>

                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default ReservaUserPage