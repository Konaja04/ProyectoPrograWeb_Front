import FormularioCambioPassword from "./components/FormularioCambioPassword"
import InicioSolicitud from "./components/InicioSolicitud";

import React, { useState } from 'react';

const RecuperarPassword = () => {
    const [isConfirmedCode, setisConfirmedCode] = useState(false);
    return (
        < div className='container-fluid vertical-center-container register-page' style={{ backgroundColor: '#f8ccb4' }
        }>
            <div className='col-md-12 d-flex flex-column align-items-center justify-content-center vh-100'>
                <div className='row w-100'>
                    <h1 className='col text-center text-login'>SALAS DE CINE ULIMA</h1>
                </div>
                <div className='row w-50 justify-content-center'>
                    {isConfirmedCode ?
                        <FormularioCambioPassword />
                        :
                        <InicioSolicitud setisConfirmedCode={setisConfirmedCode} />
                    }
                </div>
            </div>
        </div >
    )
}
export default RecuperarPassword