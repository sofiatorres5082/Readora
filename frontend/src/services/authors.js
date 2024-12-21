import axios from "./api";

const AUTHORS_URL = "/authors";

export const getAllAuthors = async () => {
  const response = await axios.get(AUTHORS_URL);
  return response.data;
};

export const getLivingAuthorsInYear = async (year) => {
  const response = await axios.get(`${AUTHORS_URL}/living`, {
    params: { year },
  });
  return response.data;
};
