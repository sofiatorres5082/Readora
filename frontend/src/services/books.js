import axios from "./api";

const BOOKS_URL = "/books";

// Obtener todos los libros almacenados en base de datos.
export const getAllBooks = async () => {
  const response = await axios.get(BOOKS_URL);
  console.log(response.data)
  return response.data;
};

// Buscar libros desde la API Gutendex.
export const searchBooksByTitle = async (title) => {
  const response = await axios.get(`${BOOKS_URL}/search`, {
    params: { title },
  });
  return response.data;
};

// Guardar el libro seleccionado en la búsqueda.
export const saveSelectedBook = async (book) => {
  const response = await axios.post(`${BOOKS_URL}/save`, book);
  return response.data;
};


export const getBooksByLanguage = async (language) => {
  const response = await axios.get(`${BOOKS_URL}/language`, {
    params: { language },
  });
  return response.data;
};


