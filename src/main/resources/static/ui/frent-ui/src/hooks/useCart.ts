import { useQuery } from "react-query";
import { UserService } from "../services";

const useCart = () => {
  return useQuery("movieIds", async () => {
    const movies = await UserService.getCartForUser();

    return movies;
  });
};

export default useCart;
