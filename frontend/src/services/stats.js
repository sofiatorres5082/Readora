import axios from "./api";

const STATS_URL = "/books/statistics";

export const getBookStatistics = async (language) => {
  try {
    const response = await axios.get(`${STATS_URL}?language=${language}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener estadísticas", error);
    throw error;
  }
};
