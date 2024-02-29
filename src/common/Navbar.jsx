import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Popover, Button, AppBar, Box } from '@mui/material';
import { Toolbar, Typography, IconButton, Drawer, List } from '@mui/material';
import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../Img/logo.png'
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MovieIcon from '@mui/icons-material/Movie';
import ChairIcon from '@mui/icons-material/Chair';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
export default function ButtonAppBar() {

    const navigate = useNavigate()

    const [state, setState] = React.useState({
        left: false,
    });
    const name = sessionStorage.getItem("NOMBRE");
    const lastname = sessionStorage.getItem("APELLIDO");
    const img = sessionStorage.getItem("IMG");

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);

    };


    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ left: open });
    };

    const logoutOnClick = () => {
        sessionStorage.clear()
        navigate("/")
    }

    const list = () => (
        <Box
            sx={{ width: 300 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Link to="/inicio">
                <img
                    src={logo}
                    alt="LogoUlima"
                    style={{ width: '100%', marginBottom: '10px', marginTop: '50px' }}
                />
            </Link>
            <List>
                <Divider />

                <ListItemButton component={Link} to={'/peliculas/1'}>
                    <ListItemIcon>
                        <MovieIcon />
                    </ListItemIcon>
                    <ListItemText > Películas</ListItemText>

                </ListItemButton>
                <ListItemButton component={Link} to={'/salas'}>
                    <ListItemIcon>
                        <ChairIcon />
                    </ListItemIcon>
                    <ListItemText  > Salas</ListItemText>
                </ListItemButton>
                <Box sx={{ width: 300, position: 'fixed', bottom: 0, marginBottom: '15px' }}>

                    <ListItem disablePadding>
                        <ListItemButton onClick={handleClick}>
                            <Avatar alt={name} src={`${img}`} style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                            <ListItemText primary={`${name} ${lastname}`} />
                            <MoreVertIcon />

                        </ListItemButton>
                    </ListItem>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        PaperProps={{
                            sx: {
                                borderRadius: '12px',
                                boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #ebebeb',
                            },
                        }}
                    >
                        <Box sx={{ p: 1 }} >
                            <ListItemButton sx={{ pr: 13.5, pl: 2 }} component={Link} to={'/perfil/'}>
                                <ListItemIcon>
                                    <PersonIcon style={{ color: "black" }} />
                                </ListItemIcon>
                                <ListItemText > Mi cuenta</ListItemText>
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={logoutOnClick}>
                                <ListItemIcon>
                                    <ExitToAppIcon style={{ color: "black" }} />
                                </ListItemIcon>
                                <ListItemText > Cerrar sesión</ListItemText>
                            </ListItemButton>
                        </Box>
                    </Popover>
                </Box >
            </List >

        </Box >
    );


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: '#FA7525' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img style={{ width: "160px" }} src="https://admision.ulima.edu.pe/wp-content/uploads/2023/03/ulima-logo-blanco-1-1024x253.png?v=1.0" alt="" />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemText primary={`${name} ${lastname}`} />

                        <Avatar alt={name} src={`${img}`} style={{ width: '40px', height: '40px', marginLeft: '20px' }} />
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={state.left}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </Box>
    );
}
