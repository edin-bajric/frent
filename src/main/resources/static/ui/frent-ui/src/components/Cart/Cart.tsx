import React from "react";
import { Offcanvas, ListGroup, CloseButton, Button } from "react-bootstrap";
import useCart from "../../hooks/useCart";
import Spinner from "../Spinner";
import Error from "../Error";
import useCartTotal from "../../hooks/useCartTotal";

type CartProps = {
  show: boolean;
  handleClose: () => void;
};

const Cart: React.FC<CartProps> = ({ show, handleClose }) => {
  const { data: movies, isLoading, isError } = useCart();
  const { data: total } = useCartTotal();

  return (
    <Offcanvas
      data-bs-theme="dark"
      show={show}
      onHide={handleClose}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
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
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{movie.title}</div>
                  {movie.rentalPrice}KM
                </div>
                <CloseButton />
              </ListGroup.Item>
            ))}
            <ListGroup.Item
              variant="light"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Total</div>
                {total}KM
              </div>
              <Button variant="primary">Rent</Button>
            </ListGroup.Item>
          </ListGroup>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
