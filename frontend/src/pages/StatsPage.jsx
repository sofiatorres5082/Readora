import React, { useEffect, useState } from "react";
import { getBookStatistics } from "../services/stats";
import { Globe, ChevronDown, Book, Download } from "lucide-react";

const StatsPage = () => {
  const [statistics, setStatistics] = useState(null);
  const [language, setLanguage] = useState("es");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52413f]">
            <Globe size={18} />
          </div>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 appearance-none bg-white border-2 border-[#52413f] 
                     rounded-xl focus:outline-none
                     transition-all duration-200 text-[#52413f] font-nunito font-semibold cursor-pointer"
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="fr">Francés</option>
            <option value="zh">Chino</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52413f] pointer-events-none">
            <ChevronDown size={18} />
          </div>
        </div>
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
