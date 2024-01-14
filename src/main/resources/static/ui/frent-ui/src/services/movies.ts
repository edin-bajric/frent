import appAxios from "./appAxios";
import { Movie } from "../utils/types";

const getMovies = async (): Promise<Movie[]> => {
  return appAxios.get("/movies/").then((response) => {
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

const deleteMovie = async (id: number): Promise<Movie> => {
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

export default { getMovies, addMovie, deleteMovie, updateMovie };
