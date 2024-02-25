import { Grid, Button, TextField, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const InicioSolicitud = (props) => {
    const [correo, setCorreo] = useState("");
    const [recievedCode, setRecievedCode] = useState("");
    const [inputCodes, setInputCodes] = useState(Array(5).fill(""));
    const [code, setCode] = useState("");
    const [codeMatch, setMatch] = useState(true);
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleInputChange = (e, index) => {
        const newInputCodes = [...inputCodes];
        newInputCodes[index] = e.target.value;
        setInputCodes(newInputCodes);
        setCode(newInputCodes.join(""));
    };
    const decodificarCodigo = (codigoCodificado) => {
        const codigoDecodificado = atob(codigoCodificado);
        return codigoDecodificado;
    }
    const EnviarCodigo = async () => {
        if (!correo || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo)) {
            setEmailError(true);
            return;
        }
        setEmailError(false);
        const dataUser = {
            correo: correo
        }
        const response = await fetch("http://localhost:8000/salas_cine/enviarCorreoRecuperacion", {
            method: "post",
            body: JSON.stringify(dataUser)
        })
        const data = await response.json()
        sessionStorage.setItem("CORREO_RECUPERAR", correo)
        setRecievedCode(decodificarCodigo(data.codigo));
        setShowCodeInput(true);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (recievedCode !== code) {
            setMatch(false);
            return;
        }
        props.setisConfirmedCode(true);
    };

    useEffect(() => {

    }, []);

    return (
        <div className='col-md-8 formulario'>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {!showCodeInput ? (
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    label="Correo Electrónico"
                                    variant="outlined"
                                    fullWidth
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={EnviarCodigo}
                                    style={{ width: '100%', backgroundColor: '#FA7525', color: 'white', marginTop: '15px' }}
                                >
                                    Enviar Código
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                {emailError && (
                                    <Alert severity="error" sx={{ mb: 2 }}>
                                        Por favor, introduce un correo electrónico válido.
                                    </Alert>
                                )}
                            </Grid>

                        </>
                    ) : (
                        <>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Grid item xs={2} key={index}>
                                    <TextField
                                        variant="outlined"
                                        inputProps={{ maxLength: 1 }}
                                        value={inputCodes[index]}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                </Grid>
                            ))}
                        </>
                    )}
                </Grid>
                {!codeMatch && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        El codigo introducido es incorrecto
                    </Alert>
                )}
                {showCodeInput && (
                    <Button type="submit" variant="contained" style={{ width: '100%', backgroundColor: '#FA7525', color: 'white', marginTop: '15px' }}>
                        Verificar Código
                    </Button>
                )}
                <div className="text-center" style={{ fontSize: '14px', marginTop: '10px' }}>
                    ¿Ya se encuentra registrado? <Link to={"/"}>Log in</Link>
                </div>
            </form>
        </div >
    );
};

export default InicioSolicitud;
