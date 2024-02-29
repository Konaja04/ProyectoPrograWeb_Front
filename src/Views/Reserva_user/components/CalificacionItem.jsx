

import { Typography, Card, CardMedia, CardContent, CardActions, Chip } from '@mui/material';


const CalificacionItem = ({ pelicula, index }) => {
    return (

        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom id="title-peliculas" style={{ marginRight: "15px" }}>
                #{index}
            </Typography>

            <Card id='top-container-inicio' sx={{ display: 'flex', flexDirection: 'row', my: 1, p: 0.5, width: '100%', alignItems: 'center' }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{
                        height: "140px",
                        width: '95px',
                        borderRadius: "8px",
                        flexShrink: 0,
                    }}
                    image={pelicula.thumbnail || "https://source.unsplash.com/random?wallpapers"}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom style={{ marginLeft: "10px" }}>
                        {pelicula.title || 'Título'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ marginLeft: "10px" }}>
                        Año: {pelicula.year || "No disponible"}
                    </Typography>
                    <CardActions>
                        {pelicula.genres.map((genero, index) => (
                            <Chip
                                key={index}
                                label={genero || "No disponible"}
                                style={{
                                    color: "black",
                                    textTransform: 'none',
                                    borderRadius: "15px",
                                }}
                                size="small"
                            />
                        ))}
                    </CardActions>
                </CardContent>
                <CardContent>
                    <div className="top-circle">
                        <Typography variant="h6">
                            {pelicula.calificacion}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

};
export default CalificacionItem