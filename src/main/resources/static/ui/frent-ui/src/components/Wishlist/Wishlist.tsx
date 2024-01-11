import { Offcanvas, ListGroup, Button, CloseButton } from 'react-bootstrap';
import { Movie } from '../../utils/types';

type WishlistProps = {
  movies: Movie[];
  handleClose: () => void;
};

const Wishlist: React.FC<WishlistProps> = ({ movies, handleClose }) => {
  return (
    <Offcanvas
      data-bs-theme="dark"
      show={true}
      onHide={handleClose}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Wishlist</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup as="ol">
          {movies.map((movie, index) => (
            <ListGroup.Item
              key={index}
              as="li"
              className="d-flex justify-content-between align-items-start"
              variant="light"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{movie.title}</div>
                {movie.price}KM
              </div>
              <Button variant="primary" style={{ marginRight: '16px' }}>
                Rent
              </Button>
              <CloseButton />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Wishlist;