import appAxios from "./appAxios";
import { Movie } from "../utils/types";

const getMovies = async (): Promise<Movie[]> => {
  return appAxios.get("/movies/").then((response) => {
    const data = response.data;
    return data;
  });
};

const getMovieById = async (id: string): Promise<Movie> => {
  return appAxios.get(`/movies/${id}`).then((response) => {
    const data = response.data;
    return data;
  });
};

const addMovie = async (movie: Movie): Promise<Movie> => {
  return appAxios.post("/movies/", movie).then((response) => {
    const data = response.data;
    return data;
  });
};

const deleteMovie = async (id: string): Promise<Movie> => {
  return appAxios.delete(`/movies/${id}`).then((response) => {
    const data = response.data;
    return data;
  });
};

const updateMovie = async (movie: Movie): Promise<Movie> => {
  return appAxios.put(`/movies/${movie.id}`, movie).then((response) => {
    const data = response.data;
    return data;
  });
};

const searchMovies = async (keyword: string) => {
  try {
    const response = await appAxios.get(`/movies/search/${keyword}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || "Error searching movies";
  }
};

export default {
  getMovies,
  getMovieById,
  addMovie,
  deleteMovie,
  updateMovie,
  searchMovies,
};
