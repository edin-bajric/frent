import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { Movie } from "../../utils/types";
import "../../assets/css/MovieRentalCard.css";
import useAddToCartForUser from "../../hooks/useAddToCart";
import useAddToWishlistForUser from "../../hooks/useAddToWishlist";
import useIsMovieInWishlist from "../../hooks/useIsMovieInWishlist";
import useIsMovieInCart from "../../hooks/useIsMovieInCart";

type Props = {
  movie: Movie;
};

const BasicExample = ({ movie }: Props) => {
  const addToCartMutation = useAddToCartForUser();
  const addToWishlistMutation = useAddToWishlistForUser();
  const isMovieInWishlistQuery = useIsMovieInWishlist(movie.id);
  const isMovieInCartQuery = useIsMovieInCart(movie.id);

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
        <div className="d-flex flex-column align-items-start justify-content-between">
          <Button
            variant="primary"
            style={{ marginRight: "8px", marginBottom: "8px" }}
            disabled={isMovieInCartQuery.data}
            onClick={handleAddToCartClick}
          >
            Add to cart
          </Button>
          <Button
            variant="success"
            style={{ marginRight: "8px" }}
            onClick={handleAddToWishlistClick}
            disabled={isMovieInWishlistQuery.data}
          >
            Add to wishlist
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BasicExample;
