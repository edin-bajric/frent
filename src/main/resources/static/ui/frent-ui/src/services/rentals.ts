import appAxios from "./appAxios";
import { RentalMovie } from "../utils/types";
import { MovieService } from ".";

const getMovieById = MovieService.getMovieById;

const getRentalsForUser = async (): Promise<RentalMovie[]> => {
  const token = localStorage.getItem("userToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return appAxios
    .get("/rentals/getForUser", { headers })
    .then(async (response) => {
      const rentalsMovies: RentalMovie[] = response.data;

      const rentalsWithMovieDetails = await Promise.all(
        rentalsMovies.map(async (rentalMovie) => {
          const movieId = rentalMovie.movieId;
          const movieDetails = await getMovieById(movieId);
          const combinedDetails = { ...rentalMovie, ...movieDetails };
          return combinedDetails;
        })
      );

      return rentalsWithMovieDetails;
    });
};

export default { getRentalsForUser };
