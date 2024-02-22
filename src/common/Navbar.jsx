import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Popover, Button, AppBar, Box } from '@mui/material';
import { Toolbar, Typography, IconButton, Drawer, List } from '@mui/material';
import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';
import logo from '../Img/logo.png'
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function ButtonAppBar() {

    const navigate = useNavigate()

    const [state, setState] = React.useState({
        left: false,
    });
    const name = sessionStorage.getItem("name");
    const lastname = sessionStorage.getItem("lastname");
    const img = sessionStorage.getItem("img");

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
                {['Películas', 'Salas'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton component={Link} to={text === 'Películas' ? '/peliculas/1' : `/${text.toLowerCase()}`}>
                            <ListItemIcon>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Box sx={{ width: 300, position: 'fixed', bottom: 0, marginBottom: '15px' }}>

                    <ListItem disablePadding>
                        <ListItemButton onClick={handleClick}>
                            <Avatar alt={name} src={`${img}`} style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                            <ListItemText primary={`${name} ${lastname}`} />
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
                    >
                        <Box sx={{ p: 2 }} >
                            <ExitToAppIcon />
                            <Button sx={{
                                width: '210px',
                                height: '20px',
                                color: 'black',
                                textTransform: 'none'
                            }} onClick={logoutOnClick}>Cerrar sesión</Button>
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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Salas de cine ULima
                    </Typography>
                    <StarIcon sx={{ mr: 2 }} />
                    <StarIcon sx={{ mr: 2 }} />
                    <StarIcon sx={{ mr: 2 }} />
                    <StarIcon sx={{ mr: 2 }} />
                    <StarIcon sx={{ mr: 2 }} />

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
