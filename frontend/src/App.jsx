import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import SideMenu from "./components/SideMenu";
import LoadingScreen from "./components/LoadingScreen";
import { Menu, ArrowLeft } from "lucide-react";

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
          onToggle={() => setIsSideMenuOpen(!isSideMenuOpen)}
          onNavigate={handleNavigate}
          activeTab={activeTab}
        />
      )}

      <div
        className={`flex-1 transition-all duration-300 ${
          showSideMenu && isSideMenuOpen ? "ml-64" : "ml-0"
        }`}
      >
        <header className="p-4 flex items-center">
          {showSideMenu && (
            <button
              onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
              className="mr-4 p-2 bg-[#e08da6] hover:bg-[#c5738b] text-white rounded-full transition duration-200"
            >
              {isSideMenuOpen ? <ArrowLeft size={24} /> : <Menu size={24} />}
            </button>
          )}
        </header>

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
