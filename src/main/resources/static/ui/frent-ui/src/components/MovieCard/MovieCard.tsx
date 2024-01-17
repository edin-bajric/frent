import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { Movie } from "../../utils/types";
import "../../assets/css/MovieRentalCard.css";
import useAddRentalForUser from "../../hooks/useAddRentals";

type Props = {
  movie: Movie;
};

const BasicExample = ({ movie }: Props) => {
  const addRentalMutation = useAddRentalForUser();

  const handleRentReturnClick = () => {
    if (movie.available) {
      const movieId = movie.id;
      addRentalMutation.mutate({ movieId });
    } else {
      console.log("Movie is not available for rent.");
    }
  };

  return (
    <Card style={{ width: "18rem" }} bg="dark" text="light">
      <Card.Img
        variant="top"
        src={movie.smallImage}
        style={{ height: "18rem", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title as="h6">{movie.title}</Card.Title>
        <Card.Text as="h6">{movie.rentalPrice}KM</Card.Text>
        <Badge
          bg={movie.available ? "success" : "danger"}
          style={{ marginBottom: "8px" }}
        >
          {movie.available ? "Available" : "Unavailable"}
        </Badge>
        <Card.Text className="clamp-two-lines">{movie.description}</Card.Text>
        <Button
          variant="primary"
          style={{ marginRight: "8px", marginBottom: "8px" }}
          onClick={handleRentReturnClick}
        >
          Rent
        </Button>
        <Button
          variant="primary"
          style={{ marginRight: "8px", marginBottom: "8px" }}
        >
          Add to cart
        </Button>
        <Button variant="success" style={{ marginRight: "8px" }}>
          Add to wishlist
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BasicExample;
