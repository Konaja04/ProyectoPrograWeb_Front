import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ListaPeliculaDisponible from "./ListaPeliculasDisponible";
import * as React from 'react';
import '../../Salas_Item/SalasItemPage.css'
import { Skeleton } from '@mui/material';


const HistoriaSala = (props) => {
    const sala = props.sala
    return <Container>
        <div id="salas-historia" className="row flex-column flex-lg-row">
            <div className="col">

                {sala.img ? (
                    <img className="image-principal-salas" src={sala.img} alt="Sala" />
                ) : (
                    <Skeleton variant="rectangular" width={730} height={300} style={{ borderRadius: "8px" }} />
                )}
            </div>
            <div className="col">
                <div className="info-container-sala">
                    <h2 className="title-sub-peliculas">Historia</h2>
                    <p className="card-text" style={{ textAlign: 'justify' }}> {sala.description ? sala.description : <Skeleton variant="text" width={145} />}</p>
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