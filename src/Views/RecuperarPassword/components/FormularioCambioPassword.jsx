import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { Grid } from '@mui/material';

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
        const response = await fetch("http://localhost:8000/salas_cine/cambiarPassword", {
            method: "post",
            body: JSON.stringify(dataUser)
        })
        const data = await response.json()

        navigate('/')
    };
    return (
        <div className='col-md-8 formulario'>
            <form onSubmit={handleSubmit}>
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
                        />
                    </Grid>
                </Grid>
                {/* Alerta si contraseñas no coinciden */}
                {!passwordsMatch && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        Las contraseñas no coinciden.
                    </Alert>
                )}
                <Button type="submit" variant="contained" style={{ width: '100%', backgroundColor: '#FA7525', color: 'white', marginTop: '15px' }}>
                    Cambiar Contraseña
                </Button>
                <div className="text-center" style={{ fontSize: '14px', marginTop: '10px' }}>
                    ¿Ya se encuentra registrado? <Link to={"/"}>Log in</Link>
                </div>
            </form>
        </div>
    )

}
export default FormularioCambioPassword