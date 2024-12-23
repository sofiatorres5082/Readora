import React, { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

const CustomSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[250px]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between border-2 border-[#52413f] 
                   bg-white rounded-xl px-4 py-2.5 cursor-pointer"
      >
        <div className="flex items-center gap-2 text-[#52413f]">
          <Globe size={18} />
          <span>
            {options.find((opt) => opt.value === value)?.label || "Seleccionar"}
          </span>
        </div>
        <ChevronDown size={18} className="text-[#52413f]" />
      </div>

      {isOpen && (
        <div
          className="absolute top-full left-0 w-full border-2 border-[#52413f] 
                  bg-white rounded-xl mt-1 shadow-md z-50"
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`px-11 py-2 cursor-pointer rounded-xl hover:bg-[#ee99b1] hover:text-white ${
                value === option.value
                  ? "bg-[#ee99b1] text-white"
                  : "text-[#52413f]"
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
