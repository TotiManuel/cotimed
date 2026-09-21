import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// AUTENTICACIÓN
import Login from "./pages/auth/login";
import ProtectedRoute from "./routes/ProtectedRoute";

// SALA DE JUEGOS
import JuegosLayout from "./layouts/JuegosLayout";
import SalaJuegos from "./pages/juegos/SalaJuegos";
import RaspaYGana from "./pages/juegos/RaspaYGana";
import Juego21 from "./pages/juegos/Juego21";
import Arcade from "./pages/juegos/Arcade";
import Ruleta from "./pages/juegos/Ruleta";
import Trivia from "./pages/juegos/Trivia";
import Bola8 from "./pages/juegos/Bola8";
import Carrera from "./pages/juegos/Carrera";
import CarreraAutos from "./pages/juegos/CarreraAutos";
import Lucky7 from "./pages/juegos/Lucky7";
import MayorMenor from "./pages/juegos/MayorMenor";
import Poker from "./pages/juegos/Poker";
import Truco from "./pages/juegos/Truco";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* =========================
                    LOGIN
                ========================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* =========================
                    SALA DE JUEGOS
                    PROTEGIDA
                ========================= */}

                <Route
                    path="/juegos"
                    element={
                        <ProtectedRoute>
                            <JuegosLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={<SalaJuegos />}
                    />

                    <Route
                        path="raspa-y-gana"
                        element={<RaspaYGana />}
                    />

                    <Route 
                        path="ruleta" 
                        element={<Ruleta />} 
                    />

                    <Route
                        path="21"
                        element={<Juego21 />}
                    />

                    <Route
                        path="trivia"
                        element={<Trivia/>}
                    />

                    <Route
                        path="arcade"
                        element={<Arcade />}
                    />

                    <Route
                        path="bola8"
                        element={<Bola8 />}
                    />
                    <Route
                        path="truco"
                        element={<Truco />}
                    />
                    <Route
                        path="carrera"
                        element={<Carrera />}
                    />
                    <Route
                        path="carreraautos"
                        element={<CarreraAutos />}
                    />
                    <Route
                        path="lucky7"
                        element={<Lucky7 />}
                    />
                    <Route
                        path="poker"
                        element={<Poker />}
                    />
                    <Route
                        path="mayormenor"
                        element={<MayorMenor />}
                    />

                </Route>


                {/* =========================
                    RUTA PRINCIPAL
                ========================= */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/juegos"
                            replace
                        />
                    }
                />


                {/* =========================
                    RUTAS INEXISTENTES
                ========================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/juegos"
                            replace
                        />
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;