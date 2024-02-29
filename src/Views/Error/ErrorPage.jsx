import { Navbar } from "react-bootstrap"

const ErrorPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>¡Ups!</h1>
            <p style={styles.message}>No se ha encontrado el url indicado. Intentelo más tarde.</p>
            <img style={styles.gif} src="https://i.pinimg.com/originals/ef/8b/bd/ef8bbd4554dedcc2fd1fd15ab0ebd7a1.gif" alt="Error" />
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