import appAxios from "./appAxios";
import { RentalMovie, Rental } from "../utils/types";
import { MovieService } from ".";

const getMovieById = MovieService.getMovieById;

const getRentalsForUser = async (): Promise<RentalMovie[]> => {
  const token = localStorage.getItem("userToken");
  if(!token) return[];
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

          const combinedDetails = {
            ...rentalMovie,
            ...movieDetails,
            id: rentalMovie.id,
          };

          return combinedDetails;
        })
      );

      return rentalsWithMovieDetails;
    });
};

const addRentalForUser = async (movieId: string): Promise<Rental> => {
  const token = localStorage.getItem("userToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const movieResponse = await getMovieById(movieId);

    const rentalPrice = movieResponse.rentalPrice;

    const payload = {
      username: "",
      movieId: movieId,
      rentalPrice: rentalPrice,
    };

    const addRentalResponse = await appAxios.post(
      `/rentals/addForUser/${movieId}`,
      payload,
      { headers }
    );

    return addRentalResponse.data;
  } catch (error) {
    console.error("Error adding rental:", error);
    throw error;
  }
};

const returnRentalForUser = async (rentalId: string): Promise<Rental> => {
  const token = localStorage.getItem("userToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return appAxios
    .put(`/rentals/return/${rentalId}`, null, { headers })
    .then((response) => response.data);
};

export default { getRentalsForUser, addRentalForUser, returnRentalForUser };
