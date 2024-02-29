import { useNavigate } from "react-router-dom";
import FormularioCambioPassword from "./components/FormularioCambioPassword"
import InicioSolicitud from "./components/InicioSolicitud";

import React, { useEffect, useState } from 'react';

const RecuperarPassword = () => {
    const [isConfirmedCode, setisConfirmedCode] = useState(false);

    const navigate = useNavigate()

    // useEffect(() => {
    //     if (sessionStorage.getItem("USERNAME") == null) {
    //         navigate("/")
    //         return
    //     }
    // }, []);

    return (
        < div className='container-fluid vertical-center-container register-page' style={{ backgroundColor: '#f8ccb4' }
        }>
            <div className='col-md-12 d-flex flex-column align-items-center justify-content-center vh-100'>
                <div className='row justify-content-center'>
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