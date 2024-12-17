import React from "react";
import { Home, BookOpen, Users, Search, X } from "lucide-react"; 

const colors = {
  background: "#F5F5F5",
  primary: "#4A90E2",
  text: "#333333",
  light: "#F9F9F9",
};

const SideMenu = ({ isOpen, onClose, onNavigate, activeTab }) => {
  const menuItems = [
    { icon: Home, label: "Inicio", tab: "home" },
    { icon: BookOpen, label: "Libros", tab: "books" },
    { icon: Users, label: "Autores", tab: "authors" },
    { icon: Search, label: "Buscar", tab: "search" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 shadow-lg transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ backgroundColor: colors.light, zIndex: 50 }}
    >
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
          Readora
        </h2>
        <button onClick={onClose}>
          <X size={24} />
        </button>
      </div>
      <nav className="mt-8">
        {menuItems.map(({ icon: Icon, label, tab }) => (
          <button
            key={tab}
            onClick={() => onNavigate(tab)}
            className={`flex items-center w-full p-4 hover:bg-gray-100 ${
              activeTab === tab ? "bg-gray-100" : ""
            }`}
          >
            <Icon size={20} className="mr-4" style={{ color: colors.primary }} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SideMenu;
