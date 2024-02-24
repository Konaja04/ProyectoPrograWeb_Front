import '../ReservaPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField, Button, Box } from '@mui/material';
import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
const UsuarioStep = ({
    formData,
    handleInputChange,
    activeStep,
    steps,
    handleReset,
    handleBack,
    handleNext,
    areFieldsFilled, }) => {
    return (

        <div className='col-md-12 d-flex flex-column align-items-center'>
            <div className='row w-100 justify-content-center'>

                <div className='col-md-12 formulario'>
                    <h5>
                        1. USUARIO
                    </h5>
                    <h6 style={{ color: 'gray' }}>
                        Si no has ingresado haslo ahora.
                    </h6>
                    <hr />
                    <form className='form-group'>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div className="form-group">

                                <TextField
                                    error={Boolean(formData.nombreError)}
                                    helperText={formData.nombreError}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="nombre"
                                    label="Nombre"
                                    name="nombre"
                                    autoComplete="nombre"
                                    autoFocus
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    type="text"
                                    inputProps={{ pattern: "[A-Za-z]+", title: "Solo se permiten caracteres de texto" }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <TextField
                                    error={Boolean(formData.apellidoError)}
                                    helperText={formData.apellidoError}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="apellido"
                                    label="Apellido"
                                    name="apellido"
                                    autoComplete="apellido"
                                    autoFocus
                                    value={formData.apellido}
                                    onChange={handleInputChange}
                                    type="text"
                                    inputProps={{ pattern: "[A-Za-z]+", title: "Solo se permiten caracteres de texto" }} // Permitir solo caracteres de texto
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="codigo"
                                    label="Correo"
                                    name="codigo"
                                    autoComplete="codigo"
                                    autoFocus
                                    type="text"
                                    value={formData.codigo}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                            </div>
                        </Box>
                    </form>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Volver</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Volver
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button
                                    onClick={handleNext}
                                    disabled={!areFieldsFilled()}
                                >
                                    {activeStep === steps.length - 1 ? null : 'Siguiente'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </div>
            </div>

        </div>
    );
};

export default UsuarioStep;