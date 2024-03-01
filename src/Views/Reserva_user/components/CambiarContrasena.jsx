import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { Grid, InputAdornment } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const CambiarContrasena = () => {
    const [password, setPassword] = useState('');
    const [nuevaPassword, setNuevaPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');
    const [mostrarPassword, setMostrarPassword] = useState({
        current: false,
        new: false,
        confirmed: false,
    });

    const handleTogglePasswordVisibility = (field) => {
        setMostrarPassword(prevState => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        setError(null);
        setSuccessMsg('');

        if (nuevaPassword !== confirmarPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('https://backend-salas-ulima-20211628.azurewebsites.net/salas_cine/cambiar-contrasena-perfil', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: localStorage.getItem("USER_ID"),
                    password,
                    nueva_password: nuevaPassword,
                }),
            });
            const data = await response.json();

            if (response.ok) {
                setSuccessMsg(data.msg);
            } else {
                setError(data.error || 'Hubo un error al cambiar la contraseña');
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            setError('Hubo un error al cambiar la contraseña');
        }
    };

    return (
        <>
            <Box className="col info-container" mt={2} p={2}>
                <div className="col-md-12">
                    <h4 style={{ marginLeft: '15px', marginTop: '10px' }}>Cambiar contraseña</h4>
                    <hr />

                    <form className="form-register" onSubmit={handleChangePassword}>
                        <Grid spacing={2}>
                            <h5 style={{ marginTop: '30px', marginBottom: '25px' }}>Contraseña actual</h5>
                            <Grid item xs={6} pb={3}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Contraseña actual"
                                    type={mostrarPassword.current ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOpenIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => handleTogglePasswordVisibility('current')} edge="end">
                                                    {mostrarPassword.current ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <h5 style={{ marginTop: '5px', marginBottom: '25px' }}>Nueva contraseña</h5>

                            <Grid item xs={6} pb={3}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Nueva Contraseña"
                                    type={mostrarPassword.new ? 'text' : 'password'}
                                    value={nuevaPassword}
                                    onChange={(e) => setNuevaPassword(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOpenIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => handleTogglePasswordVisibility('new')} edge="end">
                                                    {mostrarPassword.new ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} pb={3}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Confirmar Nueva Contraseña"
                                    type={mostrarPassword.confirmed ? 'text' : 'password'}
                                    value={confirmarPassword}
                                    onChange={(e) => setConfirmarPassword(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOpenIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => handleTogglePasswordVisibility('confirmed')} edge="end">
                                                    {mostrarPassword.confirmed ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                        {error && <Alert severity="error">{error}</Alert>}
                        {successMsg && <Alert severity="success">{successMsg}</Alert>}
                        <Grid container justifyContent="flex-end">
                            <Button
                                type="submit"
                                variant="contained"
                                style={{ backgroundColor: '#FA7525', color: 'white', marginTop: '15px', borderRadius: '12px', width: '226px' }}
                                onClick={() => { setError(null); setSuccessMsg(''); }}
                            >
                                Cambiar Contraseña
                            </Button>
                        </Grid>
                    </form>
                </div>
            </Box>
        </>
    );
};

export default CambiarContrasena;
