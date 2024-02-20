
import './RegisterPage.css';
import { Link } from 'react-router-dom';

import Button, { ButtonProps } from '@mui/material/Button';
import TextField from '@mui/material/TextField';
const RegisterPage = () => {
    return (
        <div className='container-fluid vertical-center-container register-page' style={{ backgroundColor: '#f8ccb4' }}>
            <div className='col-md-12 d-flex flex-column align-items-center justify-content-center vh-100'>
                <div className='row w-100'>
                    <h1 className='col text-center text-login'>SALAS DE CINE ULIMA</h1>
                </div>
                <div className='row w-50 justify-content-center'>
                    <div className='col-md-8 formulario'>
                        <form className=''>
                            <div className="form-group">
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="nombre"
                                    label="Nombre"
                                    name="nombre"
                                    autoComplete="nombre    "
                                    autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="apellidos"
                                    label="Apellidos"
                                    name="apellidos"
                                    autoComplete="apellidos"
                                    autoFocus
                                />
                            </div>
                            <div className="inputCorreo-group">
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="correo"
                                    label="Correo"
                                    name="correo"
                                    autoComplete="correo"
                                    autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Contraseña"
                                    name="password"
                                    autoComplete="password"
                                    autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="confirmed_password"
                                    label="Confirmar Contraseña"
                                    name="confirmed_password"
                                    autoComplete="confirmed_password"
                                    autoFocus
                                />
                            </div>
                            <Link
                                to={"/inicio"}
                            >
                                <Button variant="contained" style={{ width: '100%', backgroundColor: '#FA7525', color: 'white' }}>
                                    Ingresar
                                </Button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>


        </div>

    );
};

export default RegisterPage;
