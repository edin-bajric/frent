import MovieGrid from '../components/MovieGrid';
import { Movie } from '../utils/types.ts';

type Props = {
  movies: Movie[];
}

const Movies = ({ movies }: Props) => {
  return (
    <MovieGrid movies={movies}/>
  )
}

export default Movies
