import axios from "./api";

const BOOKS_URL = "/books";

export const getAllBooks = async () => {
  const response = await axios.get(BOOKS_URL);
  return response.data;
};

export const searchBooksByTitle = async (title) => {
  const response = await axios.get(`${BOOKS_URL}/search`, {
    params: { title },
  });
  return response.data;
};

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

export const getBooksByAuthor = async (authorId) => {
  const response = await axios.get(`${BOOKS_URL}/author/${authorId}`);
  return response.data;
};


