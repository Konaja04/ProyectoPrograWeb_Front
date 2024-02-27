import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { Grid, InputAdornment } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen'

const CambiarContrasena = () => {
    return <>
        < Box className="col info-container" mt={2} p={2} >
            <div className='col-md-8'>
                <h4>Cambiar contraseña</h4>

                <form className='form-register'>
                    <Grid spacing={2}>
                        <p style={{ marginTop: "30px" }}>Contraseña actual</p>
                        <Grid item xs={6} pb={2}>
                            <TextField
                                fullWidth
                                required
                                id="password"
                                label="Contraseña actual"
                                name="password"
                                autoComplete="new-password"
                                type="password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOpenIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <p style={{ marginTop: "5px" }}>Nueva contraseña</p>

                        <Grid item xs={6} pb={2}>
                            <TextField
                                fullWidth
                                required
                                id="password"
                                label="Nueva Contraseña"
                                name="password"
                                autoComplete="new-password"
                                type="password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOpenIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} pb={2}>
                            <TextField
                                fullWidth
                                required
                                id="confirmed_password"
                                label="Confirmar Nueva Contraseña"
                                name="confirmed_password"
                                autoComplete="new-password"
                                type="password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOpenIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Button type="submit" variant="contained" style={{ backgroundColor: '#FA7525', color: 'white', marginTop: '15px', borderRadius: "10px", width: "226px" }}>
                        Cambiar Contraseña
                    </Button>

                </form>
            </div>
        </Box>
    </>

};
export default CambiarContrasena