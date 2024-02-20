
import React, { useState } from 'react';

import { Typography, Card, Button, CardMedia, CardActions, CardContent, Rating, Chip, Link } from '@mui/material/';
const CardViewSalas = ({ data }) => {

    return (

        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="div"
                sx={{
                    pt: '50%',
                }}
                image={data.img || "https://source.unsplash.com/random?wallpapers"}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        style={{ color: "#2196F3" }}
                        gutterBottom
                        variant="h7"
                        component="h7"
                    >
                        {data.secondAddress || ("No disponible")}
                    </Typography>
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    {data.name || 'No disponible"'}
                </Typography>
            </CardContent>
            <CardActions>
                {(data.available_times != null ? data.available_times : []).map((tiempo) => (
                    <Chip
                        label={tiempo || "No disponible"}
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

export default CardViewSalas;