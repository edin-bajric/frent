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

const getWishlistForUser = async (): Promise<Movie[]> => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return appAxios.get("/users/wishlist", { headers }).then((response) => {
    const movieIds: string[] = response.data;
    const movieDetailsPromises = movieIds.map((movieId: string) =>
      getMovieById(movieId)
    );
    const movies = Promise.all(movieDetailsPromises);
    return movies;
  });
};

const addToCartForUser = async (movieId: string): Promise<void> => {
  const token = localStorage.getItem("userToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  await appAxios.put(`/users/addToCart/${movieId}`, {}, { headers });
};

const removeFromCart = async (movieId: string): Promise<void> => {
  const token = localStorage.getItem("userToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  await appAxios.put(`/users/removeFromCart/${movieId}`, {}, { headers });
};

const addToWishlistForUser = async (movieId: string): Promise<void> => {
  const token = localStorage.getItem("userToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  await appAxios.put(`/users/addToWishlist/${movieId}`, {}, { headers });
};

const removeFromWishlistForUser = async (movieId: string): Promise<void> => {
  const token = localStorage.getItem("userToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  await appAxios.put(`/users/removeFromWishlist/${movieId}`, {}, { headers });
};

const isMovieInWishlist = async (movieId: string): Promise<boolean> => {
  const wishlist = await getWishlistForUser();
  return wishlist.some((movie) => movie.id === movieId);
};

const isMovieInCart = async (movieId: string): Promise<boolean> => {
  const cart = await getCartForUser();
  return cart.some((movie) => movie.id === movieId);
};

export default {
  getCartForUser,
  getCartTotalForUser,
  getWishlistForUser,
  addToCartForUser,
  removeFromCart,
  addToWishlistForUser,
  removeFromWishlistForUser,
  isMovieInWishlist,
  isMovieInCart,
};
