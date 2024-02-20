
import React, { useState } from 'react';

import { Typography, Card, CardMedia, CardActions, CardContent, Chip, Link } from '@mui/material/';
const CardView = ({ data }) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="div"
                sx={{
                    pt: '150%',
                }}
                image={data.thumbnail || "https://source.unsplash.com/random?wallpapers"}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        style={{ color: "#2196F3" }}
                        gutterBottom
                        variant="h7"
                        component="h7"
                    >
                        {data.year || "No disponible"}
                    </Typography>
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    {data.title || 'Título'}
                </Typography>
                <Typography style={{ textAlign: 'justify' }}>
                    {data.extract != null ? data.extract.slice(0, 100) + "..." : "No disponible"}
                </Typography>
            </CardContent>
            <CardActions>
                {data.genres.map((genero, index) => (
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

        </Card>
    );
};

export default CardView;