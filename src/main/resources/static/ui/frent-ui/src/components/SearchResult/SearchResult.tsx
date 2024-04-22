import React, { useState, useEffect } from "react";
import { Row, Col, Pagination, Form } from "react-bootstrap";
import MovieCard from "../MovieCard";
import Spinner from "../Spinner";
import useSearchMovies from "../../hooks/useSearchMovies";
import { useParams } from "react-router-dom";
import Error from "../Error";

const SearchResults: React.FC = () => {
  const { keyword, page, size } = useParams<{ keyword?: string; page?: string; size?: string }>();
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [pageSize, setPageSize] = useState(Number(size) || 5);
  const { data: movies, error, isLoading } = useSearchMovies(keyword || "", currentPage, pageSize);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const hasNextPage = movies?.length === pageSize;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      {isLoading && <Spinner />}
      {error && <Error />}
      {!isLoading && movies && (
        <>
          <Form.Group className="mt-3" style={{padding: "16px"}}>
           <h4>Results per page: </h4>
            <Form.Select onChange={handleSizeChange} value={pageSize} style={{width: "70px"}}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </Form.Select>
          </Form.Group>
          <h3 style={{ padding: "16px" }}>Search results for "{keyword}"</h3>
          <Row
            xs={1}
            md={2}
            lg={3}
            xl={4}
            xxl={5}
            className="g-4"
            style={{ width: "100%", paddingLeft: "16px" }}
          >
            {movies.map((movie: any) => (
              <Col key={movie.id}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-center mt-3">
            <Pagination >
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

export default SearchResults;
