import React from "react";
import { Home, BookOpen, Users, Search, X } from "lucide-react";

const SideMenu = ({ isOpen, onClose, onNavigate, activeTab }) => {
  const menuItems = [
    { icon: Home, label: "Estadísticas", tab: "stats" },
    { icon: BookOpen, label: "Libros", tab: "books" },
    { icon: Users, label: "Autores", tab: "authors" },
  ];

  return (
    <div
      className={`bg-white fixed top-0 left-0 h-full w-64 shadow-sm transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4">
        <div className="w-96">
          <img src="/images/ReadoraLogo.png" alt="logo" />
        </div>
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
            <Icon
              size={20}
              className="mr-4 text-[#927570]"
            />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SideMenu;
