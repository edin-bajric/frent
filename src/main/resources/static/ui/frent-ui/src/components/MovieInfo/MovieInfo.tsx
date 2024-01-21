import Offcanvas from "react-bootstrap/Offcanvas";
import Badge from "react-bootstrap/Badge";
import { Movie } from "../../utils/types";

type MovieInfoProps = {
  show: boolean;
  handleClose: () => void;
  movie: Movie;
};

const MovieInfo: React.FC<MovieInfoProps> = ({ show, handleClose, movie }) => {
  return (
    <>
      <Offcanvas
        data-bs-theme="dark"
        show={show}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{movie.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <img src={movie.smallImage} alt={movie.title} style={{ width: "100%" }} />
        <Badge
            bg={movie.available ? "success" : "danger"}
            style={{ marginBottom: "8px" }}
          >
            {movie.available ? "Available" : "Unavailable"}
          </Badge>
          <p>{movie.description}</p>
          <p>Year: {movie.year}</p>
          <p>Director: {movie.director}</p>
          <p>Genre: {movie.genre}</p>
        <p>Price: {movie.rentalPrice}KM</p>
        
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MovieInfo;
