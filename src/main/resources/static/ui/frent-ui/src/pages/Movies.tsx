import { Row, Col } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import { Movie } from "../utils/types";

type MoviesPageProps = {
  movies: Movie[];
};

const MoviesPage = ({ movies }: MoviesPageProps) => {
  return (
    <>
      <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MoviesPage;
