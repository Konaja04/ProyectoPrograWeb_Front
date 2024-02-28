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
            <div className='col-md-12'>
                <h4 style={{ marginLeft: "15px", marginTop: "10px" }}>Cambiar contraseña</h4>
                <hr />

                <form className='form-register'>
                    <Grid spacing={2}>
                        <h5 style={{ marginTop: "30px", marginBottom: "25px" }}>Contraseña actual</h5>
                        <Grid item xs={6} pb={3}>
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
                        <h5 style={{ marginTop: "5px", marginBottom: "25px" }}>Nueva contraseña</h5>

                        <Grid item xs={6} pb={3}>
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
                        <Grid item xs={6} pb={3}>
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
                    <Grid container justifyContent="flex-end">
                        <Button type="submit" variant="contained" style={{ backgroundColor: '#FA7525', color: 'white', marginTop: '15px', borderRadius: "12px", width: "226px" }}>
                            Cambiar Contraseña
                        </Button>
                    </Grid>

                </form>
            </div>
        </Box>
    </>

};
export default CambiarContrasena