import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../MovieCard";
import { Movie } from "../../utils/types";
import { MovieService } from "../../services";
import Spinner from "../Spinner";

const MoviesGrid = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>();

  useEffect(() => {
    setIsLoading(true);
    MovieService.getMovies()
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      {loading && <Spinner />}
      {error && (
        <div className="row">
          <div className="col-12 col-md-2 m-3">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Unable to render data!</h4>
              <p>{error?.response?.data?.message || error?.message}</p>
              <hr />
              <p className="mb-0">Something went wrong, please try again.</p>
            </div>
          </div>
        </div>
      )}
      {!loading && (
        <Row
          xs={1}
          md={2}
          lg={3}
          xl={4}
          xxl={5}
          className="g-4"
          style={{ width: "100%", padding: "16px"}}
        >
          {movies.map((movie, i) => (
            <Col key={i}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default MoviesGrid;
