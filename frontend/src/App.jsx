import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen";
import DashboardLayout from "./components/DashboardLayout";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const BooksPage = lazy(() => import("./pages/BooksPage"));
const AuthorsPage = lazy(() => import("./pages/AuthorsPage"));
const StatsPage = lazy(() => import("./pages/StatsPage"));

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/books");
    }, 1500);
  };

  return (
    <div>
      {isLoading && <LoadingScreen />}
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<LandingPage onStart={handleStart} />} />

          <Route element={<DashboardLayout />}>
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
