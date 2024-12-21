import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import BooksPage from "./pages/BooksPage";
import AuthorsPage from "./pages/AuthorsPage";
import StatsPage from "./pages/StatsPage";
import SideMenu from "./components/SideMenu";
import "./App.css";

function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/")[1] || "home"; 
    setActiveTab(path);
  }, [location.pathname]); 

  const handleStart = () => {
    navigate("/home");
  };

  const showSideMenu = location.pathname !== "/";

  return (
    <div className="min-h-screen flex overflow-hidden">
      {showSideMenu && (
        <SideMenu
          isOpen={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
          onNavigate={(tab) => {
            setActiveTab(tab);
            navigate(`/${tab === 'home' ? 'home' : tab}`);
          }}
          activeTab={activeTab}
        />
      )}

      <div
        className={`flex-1 transition-all duration-300 ${
          (showSideMenu && isSideMenuOpen) ? "ml-64" : "ml-0"
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
            <Route path="/books" element={<BooksPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;