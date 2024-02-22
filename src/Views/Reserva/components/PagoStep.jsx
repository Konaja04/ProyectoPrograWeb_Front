import '../ReservaPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Box } from '@mui/material';
import React from 'react';
//paypal
import PaymentForm from './PaymentForm';

const PagoStep = ({
    formData,
    product,
    clientId,
    handleReservar,
    handleCloseModal,
    Modal,
    asientosSeleccionados,
    showModal
}) => {
    return (


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
    );
};

export default PagoStep;