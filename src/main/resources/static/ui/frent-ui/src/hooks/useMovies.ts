import { useQuery } from "react-query";
import { MovieService } from "../services";

const useMovies = () => {
  return useQuery("movies", () => MovieService.getMovies());
};

export default useMovies;
