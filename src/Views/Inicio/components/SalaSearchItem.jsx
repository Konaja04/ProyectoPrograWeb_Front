import { Typography, Card, CardMedia, CardActions, CardContent, Chip } from '@mui/material/';

const SalaSearchItem = ({ data }) => {
    return (
        <Card sx={{ display: 'flex', flexDirection: 'row', maxWidth: '100%', my: 1 }}>
            <CardMedia
                component="img"
                sx={{
                    width: '150px',
                    minWidth: '150px',
                    flexShrink: 0,
                }}
                image={data.img || "https://source.unsplash.com/random?wallpapers"}
            />
            <CardContent sx={{ flex: '1 1 auto' }}>
                <Typography sx={{ color: "#2196F3" }} gutterBottom variant="subtitle1">
                    {data.second_address || "No disponible"}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                    {data.name || 'No disponible'}
                </Typography>
                <CardActions>
                    {(data.available_times != null ? data.available_times : []).map((tiempo, index) => (
                        <Chip
                            key={index}
                            label={tiempo || "No disponible"}
                            style={{
                                color: "black",
                                textTransform: 'none',
                                borderRadius: "15px",
                                marginRight: '4px',
                            }}
                            size="small"
                        />
                    ))}
                </CardActions>
            </CardContent>
        </Card>
    );
};

export default SalaSearchItem;
