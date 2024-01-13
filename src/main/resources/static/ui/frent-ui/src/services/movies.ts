import appAxios from "./appAxios";
import { Movie } from "../utils/types";

const getMovies = async (): Promise<Movie[]> => {
    return appAxios.get('/movies').then(
        (response) => {
            const data = response.data;
            console.log(data);
            return data;
        }
    );
}

export default { getMovies };