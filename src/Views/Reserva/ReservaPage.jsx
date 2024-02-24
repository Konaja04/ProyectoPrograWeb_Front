import './ReservaPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../common/Navbar'
import { Modal, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//Linea Paso-Paso
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
//Icons
import TaskAltIcon from '@mui/icons-material/TaskAlt';


//Pasos
import UsuarioStep from './components/UsuarioStep';
import EntradasStep from './components/EntradasStep';
import AsientosStep from './components/AsientosStep';
import PagoStep from './components/PagoStep';


const product = {
    price: 29,
};
const clientId = "AWDCMzDPFw-IKStz4P6NM9DKSvQUoFaXScky6_gLaA7DLdrf7nUP0iCGJistG-NuqVPYMpx_MibilLZ4";

const steps = ['USUARIO', 'ENTRADAS', 'ASIENTOS', 'PAGO'];


const ReservaPage = () => {

    const obtenerData = async () => {

        const responseSalas = await fetch("https://raw.githubusercontent.com/ulima-pw/data-20240/main/salasv2.json")
        const responsePelis = await fetch("https://raw.githubusercontent.com/ulima-pw/data-20240/main/peliculas_limpio.json")
        const dataSalas = await responseSalas.json()
        const dataPelis = await responsePelis.json()
        setDataSala(dataSalas.filter((sala) => {
            return sala.ID == sala_ID
        })[0])
        setDataPeli(dataPelis.filter((peli) => {
            return peli.id == peli_id
        })[0])

    }
    const name = sessionStorage.getItem("NOMBRE");
    const lastname = sessionStorage.getItem("APELLIDO");
    const username = sessionStorage.getItem("CORREO");


    const { sala_ID, peli_id, horario } = useParams();
    const [openModal, setOpenModal] = useState(false);

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nombre: name || '',
        apellido: lastname || '',
        codigo: username || '',
        cantidad: '',
    });
    const areFieldsFilled = () => {
        if (activeStep === 0) {
            return formData.nombre && formData.apellido && formData.codigo && !formData.nombreError && !formData.apellidoError;
        } else if (activeStep === 1) {
            return formData.cantidad && !formData.cantidadError;
        }
    };
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
        navigate("/inicio")
    };

    useEffect(() => {
        obtenerData()
    }, [])

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
                                <UsuarioStep
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    activeStep={activeStep}
                                    steps={steps}
                                    handleReset={handleReset}
                                    handleBack={handleBack}
                                    handleNext={handleNext}
                                    areFieldsFilled={areFieldsFilled}
                                />
                            )}

                            {activeStep === 1 && (

                                <EntradasStep
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    activeStep={activeStep}
                                    steps={steps}
                                    handleReset={handleReset}
                                    handleBack={handleBack}
                                    handleNext={handleNext}
                                    areFieldsFilled={areFieldsFilled}
                                />

                            )}
                            {activeStep === 2 && (

                                <AsientosStep
                                    activeStep={activeStep}
                                    steps={steps}
                                    handleReset={handleReset}
                                    handleBack={handleBack}
                                    handleNext={handleNext}
                                    asientos={asientos}
                                    esAsientoReservado={esAsientoReservado}
                                    cambiarEstadoAsiento={cambiarEstadoAsiento}
                                    todosAsientosSelec={todosAsientosSelec}
                                />

                            )}
                            {activeStep === 3 && (
                                <PagoStep
                                    formData={formData}
                                    product={product}
                                    clientId={clientId}
                                    handleReservar={handleReservar}
                                    handleCloseModal={handleCloseModal}
                                    Modal={Modal}
                                    asientosSeleccionados={asientosSeleccionados}
                                    showModal={showModal}
                                />

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
                                                            <strong>Correo:</strong> {formData.codigo} <br />
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