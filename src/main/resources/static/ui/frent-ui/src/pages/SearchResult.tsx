import React from "react";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import useSearchMovies from "../hooks/useSearchMovies";
import { useParams } from "react-router-dom";
import Error from "../components/Error";

const SearchResults: React.FC = () => {
  const { keyword } = useParams<{ keyword?: string }>();
  const { data: movies, error, isLoading } = useSearchMovies(keyword || "");

  return (
    <>
      {isLoading && <Spinner />}
      {error && <Error />}
      {!isLoading && movies && (
        <Row
          xs={1}
          md={2}
          lg={3}
          xl={4}
          xxl={5}
          className="g-4"
          style={{ width: "100%", padding: "16px" }}
        >
          {movies.map((movie: any) => (
            <Col key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default SearchResults;
