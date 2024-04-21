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

const setMovieAvailable = async (movieId: string): Promise<void> => {
  try {
    await appAxios.put(`movies/setAvailable/${movieId}`, null, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } });
    console.log('Movie set as available successfully');
  } catch (error: any) {
    throw new Error('Failed to set movie available: ' + error.message);
  }
};

const setMovieUnavailable = async (movieId: string): Promise<void> => {
  try {
    await appAxios.put(`movies/setUnavailable/${movieId}`, null, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } });
    console.log('Movie set as unavailable successfully');
  } catch (error: any) {
    throw new Error('Failed to set movie unavailable: ' + error.message);
  }
};

export default {
  getMovies,
  getMovieById,
  addMovie,
  deleteMovie,
  updateMovie,
  searchMovies,
  setMovieAvailable,
  setMovieUnavailable,
};
