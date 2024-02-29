import '../ReservaPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField, Button, Box } from '@mui/material';
import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
const EntradasStep = ({
    formData,
    handleInputChange,
    activeStep,
    steps,
    handleReset,
    handleBack,
    handleNext,
    areFieldsFilled }) => {

    return (

        <div className='col-md-12 d-flex flex-column align-items-center'>
            <div className='row w-100 justify-content-center'>

                <div className='col-md-12 formulario'>
                    <h5>
                        2. ENTRADAS
                    </h5>
                    <form className=''>

                        <h6 style={{ color: 'gray' }}>
                            Ingresa la cantidad de entradas.
                        </h6>
                        <hr />
                        <div className="row align-items-start">

                            <div className="col-lg-5">
                                <img src='https://enlima.pe/sites/default/files/venta-indiscreta-cine-universidad-lima.jpg' style={{
                                    width: '200px',
                                    float: 'left',
                                    borderRadius: '10px'
                                }} />
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group" style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                    <TextField
                                        error={Boolean(formData.cantidadError)}
                                        helperText={formData.cantidadError}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="cantidad"
                                        label="Cantidad"
                                        name="cantidad"
                                        autoComplete="cantidad"
                                        autoFocus
                                        value={formData.cantidad}
                                        onChange={handleInputChange}
                                        type="number"
                                        inputProps={{ min: "1", max: "10" }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <ConfirmationNumberIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                            </div>
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EntradasStep;