import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import { Menu, ArrowLeft } from "lucide-react";

const DashboardLayout = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (tab) => {
    navigate(`/${tab}`);
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      <SideMenu
        isOpen={isSideMenuOpen}
        onToggle={() => setIsSideMenuOpen(!isSideMenuOpen)}
        onNavigate={handleNavigate}
        activeTab={window.location.pathname.split("/")[1]} 
      />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSideMenuOpen ? "ml-64" : "ml-0"
        }`}
      >
        <header className="p-4 flex items-center">
          <button
            onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
            className="mr-4 p-2 bg-[#e08da6] hover:bg-[#c5738b] text-white rounded-full transition duration-200"
          >
            {isSideMenuOpen ? <ArrowLeft size={24} /> : <Menu size={24} />}
          </button>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
