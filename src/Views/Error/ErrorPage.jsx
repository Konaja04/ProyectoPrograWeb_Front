import { Button, Navbar } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
const ErrorPage = () => {
    const navigate = useNavigate()
    const volverInicioOnClick = () => {
        navigate('/')
    }
    const volverAtrasOnClick = () => {
        navigate(-1)
    }
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>¡Ups!</h1>
            <p style={styles.message}>No se ha encontrado el url indicado. Intentelo más tarde.</p>
            <img style={styles.gif} src="https://i.pinimg.com/originals/ef/8b/bd/ef8bbd4554dedcc2fd1fd15ab0ebd7a1.gif" alt="Error" />
            <Button variant="contained"
                style={{ width: '30%', backgroundColor: '#FA7525', color: 'white', borderRadius: "18px", marginTop: "20px" }}
                onClick={volverInicioOnClick}>
                Volver a Inicio
            </Button>
            <Button variant="contained"
                style={{ width: '30%', backgroundColor: '#FA7525', color: 'white', borderRadius: "18px", marginTop: "20px" }}
                onClick={volverAtrasOnClick}>
                Volver Atrás
            </Button>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '3rem',
        color: '#dc3545',
        marginBottom: '20px',
    },
    message: {
        fontSize: '1.2rem',
        textAlign: 'center',
        marginBottom: '20px',
    },
    gif: {
        maxWidth: '100%',
        height: 'auto',
    },
};

export default ErrorPage