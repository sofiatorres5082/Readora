import React, { useEffect, useState } from "react";
import { getBookStatistics } from "../services/stats";

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
      <h2>Estadísticas de Libros</h2>

      <div>
        <label htmlFor="language">Idioma: </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="es">Español</option>
          <option value="en">Inglés</option>
          <option value="fr">Francés</option>
          <option value="zh">Chino</option>
        </select>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      {statistics && (
        <div className="mt-4">
          <p><strong>Total de libros:</strong> {statistics.totalBooks}</p>
          <p><strong>Total de descargas:</strong> {statistics.totalDownloads}</p>
        </div>
      )}
    </div>
  );
};

export default StatsPage;
