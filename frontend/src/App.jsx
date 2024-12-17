import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import AuthorsPage from "./pages/AuthorsPage";
import SearchPage from "./pages/SearchPage";
import SideMenu from "./components/SideMenu";
import "./App.css";

function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();

  const handleStart = () => {
    navigate("/home");
  };

  const showSideMenu = location.pathname !== "/";

  return (
    <div className="min-h-screen flex">
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
            <Route path="/home" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;