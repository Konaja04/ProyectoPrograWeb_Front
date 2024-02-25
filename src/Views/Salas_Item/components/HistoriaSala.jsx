import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ListaPeliculaDisponible from "./ListaPeliculasDisponible";
import * as React from 'react';
import '../../Salas_Item/SalasItemPage.css'


const HistoriaSala = (props) => {
    const sala = props.sala
    return <Container>
        <div id="salas-historia" className="row flex-column flex-lg-row">
            <div className="col">
                <img className="image-principal-salas" src={sala.img} />
            </div>
            <div className="col">
                <div className="card-body-salas">
                    <h2 className="card-title">Historia</h2>
                    <p className="card-text" style={{ textAlign: 'justify' }}>{sala.description}</p>
                    {
                        (sala.formats != null ? sala.formats : []).map((formatos) => (

                            <label className="type-sala">{formatos}</label>
                        ))
                    }
                </div>
            </div>
        </div>
    </Container>
}

export default HistoriaSala