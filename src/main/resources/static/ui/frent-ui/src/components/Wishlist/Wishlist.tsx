import React, { useEffect } from "react";
import { Offcanvas, ListGroup, Button, CloseButton } from "react-bootstrap";
import useWishlist from "../../hooks/useWishlist";
import Spinner from "../Spinner";
import Error from "../Error";

type WishlistProps = {
  show: boolean;
  handleClose: () => void;
};

const Wishlist: React.FC<WishlistProps> = ({ show, handleClose }) => {
  const { data: movies, isLoading, isError, refetch } = useWishlist();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Offcanvas
      data-bs-theme="dark"
      show={show}
      onHide={handleClose}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Wishlist</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {isLoading && <Spinner />}
        {isError && <Error />}
        {!isLoading && !isError && (
          <ListGroup as="ol">
            {movies?.map((movie) => (
              <ListGroup.Item
                key={movie.id}
                as="li"
                className="d-flex justify-content-between align-items-start"
                variant="light"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{movie.title}</div>
                  {movie.rentalPrice}KM
                </div>
                <Button variant="primary" style={{ marginRight: "16px" }}>
                  Rent
                </Button>
                <CloseButton />
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Wishlist;
