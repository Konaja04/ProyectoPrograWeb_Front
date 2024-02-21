import './ReservaPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../common/Navbar'
import { TextField, Button, Modal, Box, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//Linea Paso-Paso
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
//Icons
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
//paypal
import PaymentForm from './components/PaymentForm';


const product = {
    price: 29,
};
const clientId = "AWDCMzDPFw-IKStz4P6NM9DKSvQUoFaXScky6_gLaA7DLdrf7nUP0iCGJistG-NuqVPYMpx_MibilLZ4";

const steps = ['USUARIO', 'ENTRADAS', 'ASIENTOS', 'PAGO'];

const ReservaPage = () => {

    const name = sessionStorage.getItem("name");
    const lastname = sessionStorage.getItem("lastname");
    const username = sessionStorage.getItem("username");


    const { sala_ID, peli_id, horario } = useParams();
    const [openModal, setOpenModal] = useState(false);

    const [formData, setFormData] = useState({
        nombre: name || '',
        apellido: lastname || '',
        codigo: username || '',
        cantidad: '',
    });
    const [sala, setDataSala] = useState({})
    const [peli, setDataPeli] = useState({})
    const [cantidadAsientosSeleccionados, setCantidadAsientosSeleccionados] = useState(0);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'cantidad') {
            if (parseInt(value) > 10) {
                setFormData({ ...formData, [name]: value, [`${name}Error`]: 'La cantidad máxima permitida es 10' });
            } else {
                setFormData({ ...formData, [name]: value, [`${name}Error`]: '' });
                setCantidadAsientosSeleccionados(0);
            }
        } else if ((name === 'nombre' || name === 'apellido') && /\d/.test(value)) {
            setFormData({ ...formData, [name]: value, [`${name}Error`]: 'El campo no puede contener números' });
        } else {
            setFormData({ ...formData, [name]: value, [`${name}Error`]: '' });
        }
    };

    const handleFormSubmit = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false); //cierra el resultado
    };

    const obtenerData = async () => {

        const responseSalas = await fetch("https://raw.githubusercontent.com/ulima-pw/data-20240/main/salasv2.json")
        const responsePelis = await fetch("https://raw.githubusercontent.com/ulima-pw/data-20240/main/peliculas_limpio.json")
        const dataSalas = await responseSalas.json()
        const dataPelis = await responsePelis.json()
        setDataSala(dataSalas.filter((sala) => {
            return sala.ID === sala_ID
        })[0])
        setDataPeli(dataPelis.filter((peli) => {
            return peli.id === peli_id
        })[0])

    }
    useEffect(() => {
        obtenerData()
    },)

    //Line
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [showModal, setShowModal] = useState(false);

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const areFieldsFilled = () => {
        if (activeStep === 0) {
            return formData.nombre && formData.apellido && formData.codigo && !formData.nombreError && !formData.apellidoError;
        } else if (activeStep === 1) {
            return formData.cantidad && !formData.cantidadError;
        }
    };

    const handleReservar = () => {
        reservarAsientos();
        handleNext();
        handleFormSubmit(true);
    };


    //ASIENTOS
    const [asientos, setAsientos] = useState(Array(14).fill(Array(12).fill('disponible')));
    const [sillasReservadas, setSillasReservadas] = useState([]);

    // Función para cambiar el estado de un asiento
    const cambiarEstadoAsiento = (fila, columna) => {
        const nuevosAsientos = asientos.map((filaAsientos) => [...filaAsientos]);
        if (nuevosAsientos[fila][columna] === 'seleccionado') {
            nuevosAsientos[fila][columna] = 'disponible';
            setCantidadAsientosSeleccionados(cantidadAsientosSeleccionados - 1);
        } else {
            if (cantidadAsientosSeleccionados < parseInt(formData.cantidad)) {
                nuevosAsientos[fila][columna] = 'seleccionado';
                setCantidadAsientosSeleccionados(cantidadAsientosSeleccionados + 1);
            }
        }
        setAsientos(nuevosAsientos);
    };

    const asientosSeleccionados = [];
    asientos.forEach((fila, rowIndex) => {
        fila.forEach((estado, colIndex) => {
            if (estado === 'seleccionado') {
                asientosSeleccionados.push(`${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`);
            }
        });
    });

    const esAsientoReservado = (fila, columna) => {
        return sillasReservadas.some(silla => silla.fila === fila && silla.columna === columna);
    };
    const reservarAsientos = () => {
        asientos.forEach((fila, rowIndex) => {
            fila.forEach((estado, colIndex) => {
                if (estado === 'seleccionado') {
                    sillasReservadas.push({ fila: String.fromCharCode(65 + rowIndex), columna: colIndex + 1 });
                }
            });
        });
        setSillasReservadas(sillasReservadas);


        // ENVIA sillasReservadas al backend como JSON
        //const jsonSillasReservadas = JSON.stringify(sillasReservadas);
        console.log('Sillas reservadas:', sillasReservadas);

    };
    const todosAsientosSelec = cantidadAsientosSeleccionados === parseInt(formData.cantidad);




    return <div>
        <NavBar />
        <div>
            <div className="container">
                <h1 className="mt-4">Reserva</h1>
                <hr />
                <div>
                    <div className="row flex-column flex-lg-row">

                        <div className="col info-container" style={{ flex: '30%' }}>
                            <h4 style={{ display: 'flex', justifyContent: 'center' }}>
                                {`${peli.title}`}
                            </h4>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {
                                    (peli.genres != null ? peli.genres : []).map((genero) => (

                                        <label className="type-pelicula" style={{ marginleft: '0px', marginTop: '15px' }}>
                                            {genero}
                                        </label>
                                    ))
                                }
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img className="image-principal-reserva " src={peli.thumbnail} />

                            </div>
                            <div>
                                <div>
                                    <h5>Sala</h5>
                                    <p>
                                        {`${sala.description} `}
                                    </p>
                                    <p>
                                        {`${sala.address} `}
                                    </p>
                                </div>
                                <hr />
                                <div>
                                    <h5>Horario</h5>
                                    <p>
                                        {`${horario.toString()} ` + 'pm'}
                                    </p>
                                </div>
                            </div>
                        </div>



                        <div className="col" style={{ flex: '70%' }}>
                            <div className="col info-container" style={{ marginBottom: '20px' }}>
                                <h5>
                                    Información de reserva
                                </h5>
                                <Box sx={{ width: '100%' }}>
                                    <Stepper activeStep={activeStep}>
                                        {steps.map((label, index) => {
                                            const stepProps = {};
                                            const labelProps = {};
                                            if (isStepOptional(index)) {
                                                labelProps.optional = (
                                                    <Typography variant="caption"></Typography>
                                                );
                                            }
                                            if (isStepSkipped(index)) {
                                                stepProps.completed = false;
                                            }
                                            return (
                                                <Step key={label} {...stepProps}>
                                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                                </Step>
                                            );
                                        })}
                                    </Stepper>
                                </Box>

                            </div>

                            {activeStep === 0 && (

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
                                                            inputProps={{ pattern: "[A-Za-z\s]+", title: "Solo se permiten caracteres de texto" }}
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
                                                            inputProps={{ pattern: "[A-Za-z\s]+", title: "Solo se permiten caracteres de texto" }} // Permitir solo caracteres de texto
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
                                                            label="Código"
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
                            )}

                            {activeStep === 1 && (

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

                            )}
                            {activeStep === 2 && (

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
                                                                                        backgroundColor: esAsientoReservado(rowIndex, colIndex) ? 'red' : (asientos[rowIndex][colIndex] === 'disponible' ? 'gray' : '#5C8374'),
                                                                                        border: 'none',
                                                                                        borderTopLeftRadius: '10px',
                                                                                        borderTopRightRadius: '10px',
                                                                                    }}
                                                                                    onClick={() => cambiarEstadoAsiento(rowIndex, colIndex)}
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

                            )}
                            {activeStep === 3 && (

                                <div className='col-md-12 d-flex flex-column align-items-center'>
                                    <div className='row w-100 justify-content-center'>

                                        <div className='col-md-12 formulario'>
                                            <h5>
                                                2. PAGO
                                            </h5>
                                            <h6 style={{ color: 'gray' }}>
                                                Realiza el pago.
                                            </h6>
                                            <hr />
                                            <div className='botones-paypal'>
                                                <PaymentForm product={product} clientId={clientId} />
                                            </div>

                                            <div className="form-group">
                                                <button type="button" className="boton boton-reserva" onClick={() => { handleReservar() }}>
                                                    Reservar
                                                </button>
                                            </div>
                                            {showModal && (
                                                <Modal
                                                    open={true}
                                                    onClose={handleCloseModal}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, backgroundColor: 'white', p: 2, borderRadius: '5px', padding: '30px' }}>
                                                        <h2 id="modal-modal-title">Reserva confirmada</h2>
                                                        <p id="modal-modal-description" style={{ paddingLeft: '30px', backgroundColor: '#fffaf6', border: '2px dotted #fcba92', borderRadius: '5px', color: ' #fb8e4c' }}>
                                                            Nombre: {formData.nombre} <br />
                                                            Apellido: {formData.apellido} <br />
                                                            Código: {formData.codigo} <br />
                                                            Cantidad: {formData.cantidad} pases<br />
                                                            Asientos seleccionados: {asientosSeleccionados.join(', ')}
                                                        </p>
                                                        <Button
                                                            onClick={handleCloseModal}
                                                            sx={{ position: 'absolute', bottom: '16px', left: '375px' }}
                                                        >
                                                            Entendido
                                                        </Button>
                                                    </Box>
                                                </Modal>
                                            )}
                                        </div>

                                    </div>

                                </div>

                            )}
                            {activeStep === 4 && (
                                <div className='col-md-12 d-flex flex-column align-items-center'>
                                    <div className='row w-100 justify-content-center'>

                                        <div className='col-md-12'>

                                            {openModal && (
                                                <Modal
                                                    open={openModal}
                                                    onClose={handleCloseModal}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                        width: 400,
                                                        bgcolor: 'white',
                                                        borderRadius: '10px',
                                                        boxShadow: 24,
                                                        p: 4,
                                                        textAlign: 'center'
                                                    }}>
                                                        <TaskAltIcon sx={{ color: 'green', fontSize: 40, mb: 2 }} />
                                                        <Typography variant="h5" component="h2" gutterBottom>
                                                            Reserva confirmada
                                                        </Typography>
                                                        <Typography variant="body1" id="modal-modal-description" gutterBottom>
                                                            <strong>Nombre:</strong> {formData.nombre} <br />
                                                            <strong>Apellido:</strong> {formData.apellido} <br />
                                                            <strong>Código:</strong> {formData.codigo} <br />
                                                            <strong>Cantidad:</strong> {formData.cantidad} pases<br />
                                                            <strong>Asientos seleccionados:</strong> {asientosSeleccionados.join(', ')}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                                            La información de la reserva fue enviada a su correo electrónico.
                                                        </Typography>
                                                    </Box>
                                                </Modal>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                    <hr />
                </div>
            </div>
        </div >
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
    </div >
}

export default ReservaPage