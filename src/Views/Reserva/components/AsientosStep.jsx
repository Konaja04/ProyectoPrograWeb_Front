import '../ReservaPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Box, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React, { useState, useEffect } from 'react';

const AsientosStep = ({
    activeStep,
    steps,
    handleReset,
    handleBack,
    handleNext,
    asientos,
    cambiarEstadoAsiento,
    todosAsientosSelec,
    FUNCION_ID
}) => {

    const [asientosReservados, setAsientosReservados] = useState([]);


    useEffect(() => {
        const fetchAsientosReservados = async () => {
            try {
                const response = await fetch(`http://localhost:8000/salas_cine/obtener-reservas/${FUNCION_ID}`);
                const data = await response.json();
                setAsientosReservados(data);
            } catch (error) {
                console.error('Error al obtener los asientos reservados:', error);
            }
        };

        fetchAsientosReservados();
    }, []);

    const esAsientoReservado = (fila, columna) => {
        const nombreAsiento = `${String.fromCharCode(65 + fila)}${columna + 1}`;
        const asientosReservadosIndividuales = asientosReservados.flatMap(reserva => reserva.asientos.split(','));
        return asientosReservadosIndividuales.includes(nombreAsiento);
    };
    return (

        <div className='col-md-12 d-flex flex-column align-items-center'>
            <div className='row w-100 justify-content-center'>

                <div className='col-md-12 formulario'>
                    <h5>
                        3. ASIENTOS
                    </h5>
                    <form className=''>

                        <h6 style={{ color: 'gray' }}>
                            Selecciona tus asientos.
                        </h6>
                        <hr />

                        <img src="https://cinemarkla.modyocdn.com/uploads/59905513-95b1-4e8a-8f7c-1b2547c285f9/original/screen.png"
                            style={{
                                width: '90%',
                                display: 'block',
                                margin: 'auto',
                                paddingBottom: '25px',
                            }}
                        />
                        <div className="d-flex align-items-center" >
                            <TableContainer>
                                <Table className="tabla-asientos" aria-label="simple table">
                                    <TableBody>
                                        {[...Array(14)].map((_, rowIndex) => (
                                            <TableRow key={rowIndex}>
                                                {[...Array(6)].map((_, colIndex) => (
                                                    <TableCell key={colIndex}>
                                                        <Button
                                                            variant="outlined"
                                                            id="asiento-disponible"
                                                            style={{
                                                                backgroundColor: esAsientoReservado(rowIndex, colIndex) ? '#D04848' : (asientos[rowIndex][colIndex] === 'disponible' ? 'gray' : '#5C8374'),
                                                                border: 'none',
                                                                borderTopLeftRadius: '10px',
                                                                borderTopRightRadius: '10px',
                                                            }}
                                                            onClick={() => cambiarEstadoAsiento(rowIndex, colIndex)}
                                                            disabled={esAsientoReservado(rowIndex, colIndex)}
                                                        >
                                                            {String.fromCharCode(65 + rowIndex) + (colIndex + 1)}
                                                        </Button>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <div style={{ width: '60px' }}></div>

                            <TableContainer>
                                <Table className="tabla-asientos" aria-label="simple table">
                                    <TableBody>
                                        {[...Array(14)].map((_, rowIndex) => (
                                            <TableRow key={rowIndex}>
                                                {[...Array(6)].map((_, colIndex) => (
                                                    <TableCell key={colIndex}>
                                                        <Button
                                                            variant="outlined"
                                                            id="asiento-disponible"
                                                            style={{
                                                                backgroundColor: esAsientoReservado(rowIndex, colIndex + 6) ? 'red' : (asientos[rowIndex][colIndex + 6] === 'disponible' ? 'gray' : '#5C8374'),
                                                                border: 'none',
                                                                borderTopLeftRadius: '10px',
                                                                borderTopRightRadius: '10px',
                                                            }}
                                                            onClick={() => cambiarEstadoAsiento(rowIndex, colIndex + 6)}
                                                        >
                                                            {String.fromCharCode(65 + rowIndex) + (colIndex + 7)}
                                                        </Button>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
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
                                        disabled={!todosAsientosSelec}
                                    >
                                        {activeStep === steps.length - 1 ? null : 'Siguiente'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}

                    </form>
                </div>
            </div>

        </div>
    );
};

export default AsientosStep;