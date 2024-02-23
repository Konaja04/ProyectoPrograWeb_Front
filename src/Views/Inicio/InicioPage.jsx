import './InicioPage.css';
import { Link } from 'react-router-dom';
import { TextField, Container, Box, Popover, Avatar } from '@mui/material';
import { useEffect, useState } from "react";
import CustomCarousel from './components/CustomCarousel';
import BotView from './components/bot/botView';
import Cartelera from './components/Cartelera';
import PeliculasRecomendadas from './components/PeliculasRecomendadas';
const InicioPage = () => {


    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const [peliculas, setPeliculas] = useState([]);

    const obtenerPeliculas = async () => {
        const response = await fetch("http://localhost:3000/data_json/peliculas_data.json");
        const data = await response.json();
        setPeliculas(data);

    }

    useEffect(() => {
        obtenerPeliculas();
    }, []);

    const peliculasActuales = peliculas.slice(0, 6);
    return (
        <Box>
            <CustomCarousel peliculas={peliculasActuales} />
            <Container style={{ marginTop: '100px' }}>
                <div className="mt-5">
                    <h6 className="text-start">Búsqueda</h6>
                    <div className="d-flex flex-column align-items-center">
                        <TextField
                            variant="standard"
                            margin="normal"
                            fullWidth
                            placeholder="Busca por título, actores, actrices, género, etc"
                            style={{ marginBottom: '60px' }}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-center w-100 flex-wrap mt-5">
                    <Link to="/peliculas/1" className="btn btn-primary my-1 fw-bold" id="btn-movie">
                        PELÍCULAS
                    </Link>
                    <Link to="/salas" className="btn btn-primary my-1 fw-bold" id="btn-hall">
                        SALAS
                    </Link>
                </div>
            </Container>
            <Container>
                <div className="fixed-button">

                    <Avatar
                        style={{ height: "70px", width: "70px" }}
                        onClick={handleClick}
                        className="avatar-container"
                        src='https://th.bing.com/th/id/R.3c231f5962d9921a2994ffee2b1d09bb?rik=ucqVj9EiHGohYw&riu=http%3a%2f%2fwww.ofuxico.com.br%2fimg%2fupload%2fnoticias%2f2012%2f08%2f09%2f146109_36.jpg&ehk=9LKFBLd1n1Lt6CG3Gn%2fwee9GJsCwfVaMlJtSyyKIbkY%3d&risl=&pid=ImgRaw&r=0'>

                    </Avatar>

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        PaperProps={{
                            sx: {
                                borderRadius: '15px',
                            }
                        }}
                    >
                        <BotView onClose={handleClose} />
                    </Popover>
                </div>
            </Container>

            <Cartelera />
            <PeliculasRecomendadas />
        </Box>
    );
}
export default InicioPage