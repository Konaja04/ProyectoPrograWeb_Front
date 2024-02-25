

import { Box, Typography } from '@mui/material';


const ReservaItemCard = ({ reserva }) => {
    return <>
        <Box display="flex" alignItems="center" mt={2}>
            <Typography variant="h6">{`Pelicula: ${reserva.funcion.pelicula.title}`}</Typography>
            <Box ml={2}>
                <Typography variant="h6">{`(${reserva.funcion.pelicula.year})`}</Typography>
            </Box>
        </Box>
        <hr />
        <Box display="flex" alignItems="center">
            <img src={`${reserva.funcion.pelicula.thumbnail}`}
                style={{ width: '140px', height: '120px', marginRight: '20px', borderRadius: '10px' }} />
            <Box>
                <Typography variant="h6">{`Fecha: ${reserva.funcion.ventana.fecha}`}</Typography>
                <Typography variant="h6">{`Horario: ${reserva.funcion.ventana.hora}`}</Typography>
                <Typography variant="h6">{`Entradas: ${reserva.asientos}`}</Typography>

            </Box>
        </Box>
    </>

};
export default ReservaItemCard