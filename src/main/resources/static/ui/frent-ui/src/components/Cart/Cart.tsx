import { Offcanvas, ListGroup, CloseButton, Button } from 'react-bootstrap';
import { Movie } from '../../utils/types';

type CartProps = {
  movies: Movie[];
  handleClose: () => void;
};

const Cart: React.FC<CartProps> = ({ movies, handleClose }) => {
  const calculateTotalPrice = (movies: any[]) => {
    return movies.reduce((total, movie) => total + movie.price, 0);
  };

  return (
    <Offcanvas
      data-bs-theme="dark"
      show={true}
      onHide={handleClose}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup as="ol">
          {movies.map((movie, index) => (
            <ListGroup.Item
              key={index}
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{movie.title}</div>
                {movie.price}KM
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
              {calculateTotalPrice(movies)}KM
            </div>
            <Button variant="primary">Rent</Button>
          </ListGroup.Item>
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;