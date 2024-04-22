import React, { useState } from "react";
import { Row, Col, Pagination, Form } from "react-bootstrap";
import MovieCard from "../MovieCard";
import Spinner from "../Spinner";
import useMovies from "../../hooks/useMovies";
import Error from "../Error";

const MoviesGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: movies, error, isLoading } = useMovies(currentPage, pageSize);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const hasNextPage = movies?.length === pageSize;

  return (
    <>
      {isLoading && <Spinner />}
      {error && <Error />}
      {!isLoading && movies && (
        <>
          <Form.Group className="mt-3" style={{ padding: "16px" }}>
            <h4>Results per page: </h4>
            <Form.Select onChange={handleSizeChange} value={pageSize} style={{ width: "70px" }}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </Form.Select>
          </Form.Group>
          <Row
            xs={1}
            md={2}
            lg={3}
            xl={4}
            xxl={5}
            className="g-4"
            style={{ width: "100%", paddingLeft: "16px" }}
          >
            {movies.map((movie) => (
              <Col key={movie.id}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-center mt-3">
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
              />
              <Pagination.Item active>{currentPage}</Pagination.Item>
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasNextPage}
              />
            </Pagination>
          </div>
        </>
      )}
    </>
  );
};

export default MoviesGrid;
