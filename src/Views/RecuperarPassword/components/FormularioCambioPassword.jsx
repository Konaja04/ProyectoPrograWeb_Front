import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { Grid, InputAdornment } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const FormularioCambioPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmed_password, setConfirmedPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const navigate = useNavigate();
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleConfirmedPasswordChange = (event) => {
        setConfirmedPassword(event.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmed_password) {
            setPasswordsMatch(false);
            return;
        }
        cambiarContraseña();
    };
    const cambiarContraseña = async () => {
        const dataUser = {
            correo: sessionStorage.getItem("CORREO_RECUPERAR"),
            password: password
        }
        const response = await fetch("https://backend-salas-ulima-20211628.azurewebsites.net/salas_cine/cambiarPassword", {
            method: "post",
            body: JSON.stringify(dataUser)
        })
        const data = await response.json()

        navigate('/')
    };
    return (
        <div className='row w-100 justify-content-center'>
            <div className='col-md-8 formulario-registro'>
                <h4 className='titulo-login'>Cree su nueva contraseña</h4>
                <p className='descripcion-login'>Para recuperar el acceso por favor coloque una nueva contraseña.</p>
                <div className="form-group">
                    <div className="text-center" style={{ fontSize: '14px', marginTop: '10px' }}>
                        ¿Ya se encuentra registrado? <Link to={"/"}>Log in</Link>
                    </div>
                </div>

            </div>
            <div className='col-md-8 formulario-login'>
                <h4 className='titulo-register '>Restablecer la contraseña</h4>

                <form className='form-register' onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                required
                                id="password"
                                label="Nueva Contraseña"
                                name="password"
                                autoComplete="new-password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOpenIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                required
                                id="confirmed_password"
                                label="Confirmar Nueva Contraseña"
                                name="confirmed_password"
                                autoComplete="new-password"
                                type="password"
                                value={confirmed_password}
                                onChange={handleConfirmedPasswordChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOpenIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                    </Grid>

                    {!passwordsMatch && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            Las contraseñas no coinciden.
                        </Alert>
                    )}
                    <Button type="submit" variant="contained" style={{ backgroundColor: '#FA7525', color: 'white', marginTop: '15px', borderRadius: "18px" }}>
                        Cambiar Contraseña
                    </Button>

                </form>
            </div>
        </div>

    )

}
export default FormularioCambioPassword