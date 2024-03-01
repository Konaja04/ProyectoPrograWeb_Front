import './InicioPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Container, Box, Popover, Avatar, Typography, Grid, Divider } from '@mui/material';
import { useEffect, useState } from "react";
import CustomCarousel from './components/CustomCarousel';
import BotView from './components/bot/botView';
import Cartelera from './../../common/Cartelera';
import PeliculasRecomendadas from './components/PeliculasRecomendadas';
import { Button, Modal } from 'react-bootstrap';
import SearchModal from './components/SearchModal';
import SearchIcon from '@mui/icons-material/Search';
import TopPeliculasView from './components/TopPeliculasView';

const InicioPage = () => {
    const navigate = useNavigate();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

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
        const response = await fetch("https://konaja04.github.io/ProyectoPrograWeb_Front/data_json/peliculas_data.json");
        const data = await response.json();
        setPeliculas(data);
    }

    useEffect(() => {
        if (localStorage.getItem("USER_ID") == null) {
            navigate("/")
            return
        }
        obtenerPeliculas();
    }, []);

    const peliculasActuales = peliculas.slice(0, 6);

    return (
        <Box>
            <CustomCarousel peliculas={peliculasActuales} />
            <Container style={{ marginTop: '100px' }}>
                <div>
                    <Box className="col inicio-container" style={{ marginBottom: "90px" }}>
                        <Grid container>

                            <Grid item xs={4} lg={5} className="grid-item" display="flex" justifyContent="center" alignItems="center">
                                <Link to="/peliculas/1" className="buttonInicio">
                                    PELÍCULAS
                                </Link>
                            </Grid>
                            <Divider orientation="vertical" flexItem className="dividerInicio" />

                            <Grid item xs={4} lg={5} className="grid-item" display="flex" justifyContent="center" alignItems="center">
                                <Link to="/salas" className="buttonInicio">
                                    SALAS
                                </Link>
                            </Grid>
                            <Divider orientation="vertical" flexItem className="dividerInicio" />

                            <Grid item xs={1} lg={1.5} display="flex" justifyContent="right" alignItems="center">
                                <Button variant="outlined" onClick={handleOpenModal} className="buttonInicio">
                                    <SearchIcon fontSize="large" />
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>

                    <div className="d-flex flex-column align-items-center">
                        <Modal
                            show={openModal}
                            onHide={handleCloseModal}
                            centered
                            dialogClassName="custom-modal custom-modal-dialog"

                        >
                            <Modal.Body >

                                <SearchModal />
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </Container>
            <Container>
                <div className="fixed-button">

                    <Avatar
                        style={{ height: "70px", width: "70px" }}
                        onClick={handleClick}
                        className="avatar-container"
                        src='https://th.bing.com/th/id/R.3c231f5962d9921a2994ffee2b1d09bb?rik=ucqVj9EiHGohYw&riu=http%3a%2f%2fwww.ofuxico.com.br%2fimg%2fupload%2fnoticias%2f2012%2f08%2f09%2f146109_36.jpg&ehk=9LKFBLd1n1Lt6CG3Gn%2fwee9GJsCwfVaMlJtSyyKIbkY%3d&risl=&pid=ImgRaw&r=0'
                    />

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

            <TopPeliculasView />
        </Box >
    );
}
export default InicioPage;
