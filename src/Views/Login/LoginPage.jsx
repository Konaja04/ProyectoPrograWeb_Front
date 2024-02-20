import './LoginPage.css';
import { Button, Alert, TextField } from '@mui/material';
import CheckIcon from "@mui/icons-material/Check"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUser] = useState("")
    const [password, setPw] = useState("")


    const [loginError, setLoginError] = useState(false)
    const [dataUsers, setDataUsers] = useState([])

    const getUsersHTTP = async () => {
        const response = await fetch("http://localhost:3000/data_json/users.json")
        const data = await response.json()
        setDataUsers(data)
    }

    const navigate = useNavigate()

    const userOnChangeHandler = (event) => {
        setUser(event.target.value)
    }

    const pwOnChangeHandler = (event) => {
        setPw(event.target.value)
    }

    const loginOnClick = () => {
        const user = dataUsers.find((usuario) => {
            return usuario.username === username && usuario.password === password;
        });

        if (user) {
            // Hay por lo menos un usuario
            const { username, name, lastname, img, codigo } = user;
            console.log("bien");
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("lastname", lastname);
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("codigo", codigo);
            sessionStorage.setItem("img", img);

            navigate("/inicio", {
                state: {
                    username: username
                }
            });
        } else {
            console.log("pocho");
            setLoginError(true);
        }
    }

    useEffect(() => {
        getUsersHTTP()
    }, [])

    return (
        <>
            <div className='container-fluid vertical-center-container login-page' style={{ backgroundColor: '#f8ccb4' }}>
                <div className='col-md-12 d-flex flex-column align-items-center justify-content-center vh-100'>
                    <div className='row w-100'>
                        <h1 className='col text-center text-login'>SALAS DE CINE ULIMA</h1>
                    </div>
                    <div className='row w-50 justify-content-center'>
                        <div className='col-md-8 formulario'>
                            <form className=''>
                                <div className="row form-group">
                                    <TextField required
                                        id="codigo"
                                        label="Código"
                                        margin="normal"
                                        fullWidth
                                        autoFocus
                                        value={username}
                                        onChange={userOnChangeHandler} />
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
                                        onChange={pwOnChangeHandler} />
                                </div>
                                <div className="row form-group">
                                    <Button variant="contained"
                                        style={{ width: '100%', backgroundColor: '#FA7525', color: 'white' }}
                                        onClick={loginOnClick}>
                                        Ingresar
                                    </Button>
                                </div>
                                <div className="form-group">
                                    <Link to={"registro"} id="sb">
                                        <div className="row">
                                            <Button variant="contained"
                                                style={{ width: '100%', backgroundColor: 'white', color: '#FA7525', border: '1px solid #FA7525' }}>
                                                Registrarse
                                            </Button>
                                        </div>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
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
                </div >

            </div >
        </>
    );

};

export default LoginPage;
