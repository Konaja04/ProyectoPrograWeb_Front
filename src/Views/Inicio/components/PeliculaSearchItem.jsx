import { Typography, Card, CardMedia, CardContent } from '@mui/material';

const PeliculasSearchItem = ({ data }) => {
    return (
        <Card sx={{ display: 'flex', flexDirection: 'row', my: 1, p: 0.5 }}>
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
                image={data.thumbnail || "https://source.unsplash.com/random?wallpapers"}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                    {data.title || 'Título'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Año: {data.year || "No disponible"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.extract != null ? data.extract.slice(0, 100) + "..." : "No disponible"}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PeliculasSearchItem;
