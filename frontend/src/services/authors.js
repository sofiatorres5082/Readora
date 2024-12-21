import axios from "./api";

const AUTHORS_URL = "/authors";

// Obtener todos los autores
export const getAllAuthors = async () => {
  const response = await axios.get(AUTHORS_URL);
  return response.data;
};

// Obtener autores vivos en un año específico
export const getLivingAuthorsInYear = async (year) => {
  const response = await axios.get(`${AUTHORS_URL}/living`, {
    params: { year },
  });
  return response.data;
};
