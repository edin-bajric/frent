import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { Movie } from "../../utils/types";
import "../../assets/css/MovieRentalCard.css";
import useAddRentalForUser from "../../hooks/useAddRentals";
import useAddToCartForUser from "../../hooks/useAddToCart";
import useAddToWishlistForUser from "../../hooks/useAddToWishlist";

type Props = {
  movie: Movie;
};

const BasicExample = ({ movie }: Props) => {
  const addRentalMutation = useAddRentalForUser();
  const addToCartMutation = useAddToCartForUser();
  const addToWishlistMutation = useAddToWishlistForUser();

  const handleRentReturnClick = () => {
    if (movie.available) {
      const movieId = movie.id;
      addRentalMutation.mutate({ movieId });
    } else {
      console.log("Movie is not available for rent.");
    }
  };

  const handleAddToCartClick = () => {
    const movieId = movie.id;
    addToCartMutation.mutate(movieId);
  };

  const handleAddToWishlistClick = () => {
    const movieId = movie.id;
    addToWishlistMutation.mutate(movieId);
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
          onClick={handleAddToCartClick}
        >
          Add to cart
        </Button>
        <Button variant="success" style={{ marginRight: "8px" }} onClick={handleAddToWishlistClick}>
          Add to wishlist
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BasicExample;
