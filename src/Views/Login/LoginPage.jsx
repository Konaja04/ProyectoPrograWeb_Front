import './LoginPage.css';
import { Button, Alert, TextField, InputAdornment, CircularProgress } from '@mui/material';
import CheckIcon from "@mui/icons-material/Check"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const LoginPage = () => {
    const [codigo, setCodigo] = useState("")
    const [password, setPw] = useState("")
    const [loginError, setLoginError] = useState(false)
    const [loginLoading, setLoginLoading] = useState(false)

    const navigate = useNavigate()

    const userOnChangeHandler = (event) => {
        setCodigo(event.target.value)
    }

    const pwOnChangeHandler = (event) => {
        setPw(event.target.value)
    }
    const navigateOlvidarContraseña = () => {
        navigate('/recuperar-password')
    }
    const loginOnClick = async () => {
        const dataUsername = {
            codigo: codigo,
            password: password
        }
        setLoginLoading(true)
        const response = await fetch("https://backend-salas-ulima-20211628.azurewebsites.net/salas_cine/login-json", {
            method: "post",
            body: JSON.stringify(dataUsername)
        })
        const data = await response.json()
        setLoginLoading(false)
        if (data.msg === "") {
            localStorage.setItem("USER_ID", data.id)
            localStorage.setItem("CODIGO", codigo)
            localStorage.setItem("ID", data.id,)
            localStorage.setItem("NOMBRE", data.names)
            localStorage.setItem("APELLIDO", data.last_names)
            localStorage.setItem("IMG", data.img)
            localStorage.setItem("CORREO", data.mail)

            navigate("/inicio", {
                state: {
                    codigo: codigo
                }
            })
        } else {
            setLoginError(true)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("USER_ID") !== null) {
            navigate("/inicio")
            return
        }
    }, [])

    return (
        <>
            <div className='container-fluid vertical-center-container login-page' style={{ backgroundColor: '#f8ccb4' }}>
                <div className='col-md-12 d-flex flex-column align-items-center justify-content-center vh-100'>

                    <div className='row justify-content-center'  >
                        <div className='col-md-8 formulario-registro' >
                            <h4 className='titulo-register'>Bienvenido nuevamente a salas de cine ULIMA</h4>
                            <p className='descripcion-login'>Si aún no tienes una cuenta por favor registrese aquí.</p>
                            <div className="form-group">
                                <Link to={"registro"} id="sb">
                                    <div className="row">
                                        <Button variant="contained"
                                            style={{ width: '100%', backgroundColor: 'white', color: '#FA7525', border: '1px solid #FA7525', borderRadius: "18px" }}>
                                            Registrarse
                                        </Button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='col-md-8 formulario-login'>
                            <h4 className='titulo-login '>Iniciar Sesión</h4>

                            <form className='form-login'>
                                <div className="row ">
                                    <TextField required
                                        id="codigo"
                                        label="Código"
                                        margin="normal"
                                        fullWidth
                                        autoFocus
                                        value={codigo}
                                        onChange={userOnChangeHandler}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <ContactMailIcon />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                                <div className="row form-group">
                                    <TextField required
                                        type="password"
                                        id="password"
                                        label="Contraseña"
                                        margin="normal"
                                        fullWidth
                                        autoFocus
                                        value={password}
                                        onChange={pwOnChangeHandler}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOpenIcon />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>

                            </form>
                            {loginLoading ?
                                <CircularProgress />
                                :
                                <>
                                    <div className="row form-group">
                                        <Button variant="contained"
                                            style={{ width: '100%', backgroundColor: '#FA7525', color: 'white', borderRadius: "18px" }}
                                            onClick={loginOnClick}>
                                            Iniciar Sesión
                                        </Button>
                                    </div>
                                    <div className="text-center" style={{ fontSize: '14px', marginTop: '10px' }}>
                                        <Button variant="text" onClick={navigateOlvidarContraseña}>¿Olvidó su contraseña?</Button>
                                    </div>
                                </>
                            }
                            {
                                (() => {
                                    if (loginError) {
                                        return <Alert
                                            icon={<CheckIcon fontSize="inherit" />}
                                            severity="error"
                                            sx={{ mt: 2 }}>
                                            Error en el login.
                                        </Alert>
                                    }
                                })()
                            }

                        </div>


                    </div>

                </div >

            </div >
        </>
    );

};

export default LoginPage;
