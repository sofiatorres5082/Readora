import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import SideMenu from "./components/SideMenu";
import LoadingScreen from "./components/LoadingScreen";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const BooksPage = lazy(() => import("./pages/BooksPage"));
const AuthorsPage = lazy(() => import("./pages/AuthorsPage"));
const StatsPage = lazy(() => import("./pages/StatsPage"));

import "./App.css";

function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("books");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/books");
    }, 1500);
  }, [navigate]);

  const showSideMenu = location.pathname !== "/";

  return (
    <div className="min-h-screen flex overflow-hidden">
      {isLoading && <LoadingScreen />}
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
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<LandingPage onStart={handleStart} />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/authors" element={<AuthorsPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;
