import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import LoginPage from "./Views/Login/LoginPage"
import RegisterPage from "./Views/Register/RegisterPage";
import InicioPage from "./Views/Inicio/InicioPage";
import PeliculasIndexPage from "./Views/Peliculas_Index/PeliculasIndexPage"
import SalasIndexPage from "./Views/Salas_Index/SalasIndexPage"
import PeliculasItemPage from "./Views/Peliculas_Item/PeliculasItemPage"
import SalasItemPage from "./Views/Salas_Item/SalasItemPage"
import ReservaPage from "./Views/Reserva/ReservaPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/registro",
        element: <RegisterPage />
    },
    {
        path: "/inicio",
        element: <InicioPage />
    },
    {
        path: "/peliculas/:page",
        element: <PeliculasIndexPage />
    },
    {
        path: "/salas",
        element: <SalasIndexPage />
    },
    {
        path: "/pelicula/:path",
        element: <PeliculasItemPage />
    },
    {
        path: "/sala/:path",
        element: <SalasItemPage />
    },
    {
        path: "/reserva/:sala_ID/:peli_id/:horario",
        element: <ReservaPage />
    },

])
const App = () => {
    return (
        <RouterProvider router={router} />
    )
}
export default App