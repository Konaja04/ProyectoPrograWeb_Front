// Importaciones necesarias de React y react-router-dom
import React from 'react';
import { createHashRouter, Route, RouterProvider } from 'react-router-dom';

// Importaciones de tus vistas o componentes
import LoginPage from "./Views/Login/LoginPage";
import RegisterPage from "./Views/Register/RegisterPage";
import InicioPage from "./Views/Inicio/InicioPage";
import PeliculasIndexPage from "./Views/Peliculas_Index/PeliculasIndexPage";
import SalasIndexPage from "./Views/Salas_Index/SalasIndexPage";
import PeliculasItemPage from "./Views/Peliculas_Item/PeliculasItemPage";
import SalasItemPage from "./Views/Salas_Item/SalasItemPage";
import ReservaPage from "./Views/Reserva/ReservaPage";
import ReservaUserPage from "./Views/Reserva_user/ReservaUserPage";
import RecuperarPassword from './Views/RecuperarPassword/RecuperarPassword';
import ErrorPage from './Views/Error/ErrorPage';

// Creación del enrutador utilizando createHashRouter
const router = createHashRouter([
    { path: "/", element: <LoginPage /> },
    { path: "/registro", element: <RegisterPage /> },
    { path: "/inicio", element: <InicioPage /> },
    { path: "/peliculas/:page", element: <PeliculasIndexPage /> },
    { path: "/salas", element: <SalasIndexPage /> },
    { path: "/pelicula/:path", element: <PeliculasItemPage /> },
    { path: "/sala/:path", element: <SalasItemPage /> },
    { path: "/reserva/:funcion_id", element: <ReservaPage /> },
    { path: "/perfil", element: <ReservaUserPage /> },
    { path: "/recuperar-password", element: <RecuperarPassword /> },
    { path: "*", element: <ErrorPage /> },
]);

// Componente principal de la aplicación
const App = () => {
    return <RouterProvider router={router} />;
};

// Exportación del componente App
export default App;
