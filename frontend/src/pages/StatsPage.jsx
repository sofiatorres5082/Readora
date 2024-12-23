import React, { useEffect, useState } from "react";
import { getBookStatistics } from "../services/stats";
import { Book, Download } from "lucide-react";
import CustomSelect from "../components/CustomSelect";

const StatsPage = () => {
  const [statistics, setStatistics] = useState(null);
  const [language, setLanguage] = useState("es");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const languages = [
    { value: "es", label: "Español" },
    { value: "en", label: "Inglés" },
    { value: "fr", label: "Francés" },
    { value: "zh", label: "Chino" },
  ];

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const data = await getBookStatistics(language);
        setStatistics(data);
      } catch (err) {
        setError("No se pudo obtener las estadísticas.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [language]);

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <h1 className="border-2 border-[#6b5758] font-pedagogique text-white text-center text-base font-medium mb-5 bg-[#ee99b1] rounded-full px-4 py-1.5 inline-block">
          Estadísticas
        </h1>
      </div>

      <div className="flex items-center gap-3 my-6 max-w-xs">
        <CustomSelect
          options={languages}
          value={language}
          onChange={(value) => setLanguage(value)}
        />
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      {statistics && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tarjeta: Total de libros */}
          <div className="border-2 border-[#6b5758] bg-gradient-to-t from-[#ffcccc] to-[#ff99b1] p-6 rounded-lg flex items-center gap-4 relative">
            {/* Estrellas decorativas */}
            <img
              src="/images/star1.png"
              alt="Star 1"
              className="absolute top-[-10px] left-[-10px] w-7 h-7 transform rotate-[30deg] z-10"
            />
            <img
              src="/images/star1.png"
              alt="Star 2"
              className="absolute top-[55px] right-[-10px] w-6 h-6 transform rotate-[-30deg] z-10"
            />
            <div className="text-[#52413f]">
              <Book size={36} />
            </div>
            <div>
              <p className="text-sm text-[#52413f] font-pedagogique">
                Total de libros
              </p>
              <p className="text-2xl font-bold text-[#52413f]">
                {statistics.totalBooks.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Tarjeta: Total de descargas */}
          <div className="border-2 border-[#6b5758] bg-gradient-to-t from-[#ffcccc] to-[#ff99b1] p-6 rounded-lg flex items-center gap-4 relative">
            {/* Estrellas decorativas */}
            <img
              src="/images/star1.png"
              alt="Star 1"
              className="absolute top-[15px] left-[-10px] w-7 h-7 transform rotate-[45deg] z-10"
            />
            <img
              src="/images/star2.png"
              alt="Star 2"
              className="absolute top-[45px] right-[-10px] w-7 h-7 z-10"
            />
            <div className="text-[#52413f]">
              <Download size={36} />
            </div>
            <div>
              <p className="text-sm text-[#52413f] font-pedagogique">
                Total de descargas
              </p>
              <p className="text-2xl font-bold text-[#52413f]">
                {statistics.totalDownloads.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPage;
