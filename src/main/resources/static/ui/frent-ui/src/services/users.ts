import appAxios from "./appAxios";
import { Movie } from "../utils/types";
import { MovieService } from ".";

const getMovieById = MovieService.getMovieById;
const token = localStorage.getItem("userToken");

const getCartForUser = async (): Promise<Movie[]> => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return appAxios.get("/users/cart", { headers }).then(async (response) => {
    const movieIds: string[] = response.data;
    const movieDetailsPromises = movieIds.map((movieId: string) =>
      getMovieById(movieId)
    );
    const movies = await Promise.all(movieDetailsPromises);
    movies.forEach((movie) => {
      console.log(`Title: ${movie.title}, Rental Price: ${movie.rentalPrice}`);
    });

    return movies;
  });
};

const getCartTotalForUser = async (): Promise<number> => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return appAxios.get("/users/cartTotal", { headers }).then((response) => {
    const cartTotal: number = response.data;
    return cartTotal;
  });
};

export default { getCartForUser, getCartTotalForUser };
