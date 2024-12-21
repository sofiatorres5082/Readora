import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import LandingPage from "./pages/LandingPage";
import BooksPage from "./pages/BooksPage";
import AuthorsPage from "./pages/AuthorsPage";
import StatsPage from "./pages/StatsPage";
import SideMenu from "./components/SideMenu";
import LoadingScreen from "./components/LoadingScreen"; // Importa el componente de carga
import "./App.css";

function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("books");
  const [isLoading, setIsLoading] = useState(false); // Establecer inicialmente a false

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/")[1] || "books";
    setActiveTab(path);
  }, [location.pathname]);

  const handleNavigate = useCallback(
    (tab) => {
      setActiveTab(tab);
      navigate(`/${tab}`);
    },
    [navigate]
  );

  const handleStart = useCallback(() => {
    setIsLoading(true); // Activa la pantalla de carga cuando se presiona el botón "Empezar"
    setTimeout(() => {
      setIsLoading(false); // Desactiva la pantalla de carga después de un corto tiempo
      navigate("/books");
    }, 1500); // Simula la carga de la página por 1.5 segundos
  }, [navigate]);

  const showSideMenu = location.pathname !== "/";

  return (
    <div className="min-h-screen flex overflow-hidden">
      {isLoading && <LoadingScreen />} {/* Pantalla de carga solo cuando está en "isLoading" */}
      {showSideMenu && (
        <SideMenu
          isOpen={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
          onNavigate={handleNavigate}
          activeTab={activeTab}
        />
      )}

      <div
        className={`flex-1 transition-all duration-300 ${
          showSideMenu && isSideMenuOpen ? "ml-64" : "ml-0"
        }`}
      >
        {showSideMenu && (
          <header className="p-4 flex items-center">
            <button onClick={() => setIsSideMenuOpen(true)} className="mr-4">
              ☰
            </button>
            <h1 className="text-xl font-bold">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
          </header>
        )}

        <main className={showSideMenu ? "p-4" : ""}>
          <Routes>
            <Route path="/" element={<LandingPage onStart={handleStart} />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/books" element={<BooksPage setIsLoading={setIsLoading} />} />
            <Route path="/authors" element={<AuthorsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
