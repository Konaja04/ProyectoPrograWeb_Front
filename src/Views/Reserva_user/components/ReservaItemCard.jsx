

import { Box, Typography } from '@mui/material';


const ReservaItemCard = ({ reserva }) => {
    return <>

        <Box display="flex" alignItems="center">
            <Typography variant="h6"> <b>Película: </b> {`${reserva.funcion.pelicula.title}`}</Typography>
            <Box ml={1}>
                <Typography variant="h6">{`(${reserva.funcion.pelicula.year})`}</Typography>
            </Box>
        </Box>
        <hr />
        <Box display="flex" alignItems="center">
            <img src={`${reserva.funcion.pelicula.thumbnail}`}
                style={{ width: '80px', height: '120px', marginRight: '20px', borderRadius: '10px' }}
            />
            <Box>
                <Typography variant="h6"><b>Fecha: </b>{`${reserva.funcion.ventana.fecha}`}</Typography>
                <Typography variant="h6"><b>Horario: </b>{`${reserva.funcion.ventana.hora}`}</Typography>
                <Typography variant="h6"><b>Entrada(s): </b>{`${reserva.asientos}`}</Typography>

            </Box>
        </Box>
    </>

};
export default ReservaItemCard