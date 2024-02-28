import { Typography, Card, CardMedia, CardContent, CardActions, Chip } from '@mui/material';

const TopPeliculaItem = ({ pelicula, index }) => {
    return (
        <Card sx={{ display: 'flex', flexDirection: 'row', my: 1, p: 0.5 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {index}
                </Typography>
            </CardContent>
            <CardMedia
                component="img"
                sx={{
                    height: "20%",
                    minHeight: "20%",
                    width: '20%',
                    minWidth: '20%',
                    flexShrink: 0,
                    mr: 1, // Añade un margen a la derecha de la imagen
                }}
                image={pelicula.thumbnail || "https://source.unsplash.com/random?wallpapers"}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                    {pelicula.title || 'Título'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Año: {pelicula.year || "No disponible"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {pelicula.extract != null ? pelicula.extract.slice(0, 100) + "..." : "No disponible"}
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
                <Typography variant="h6" gutterBottom>
                    {pelicula.calificacion}
                </Typography>
            </CardContent>

        </Card>
    );
};

export default TopPeliculaItem;
