import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import godfather from '../../assets/img/godfather.jpg';
import { Movie } from '../../utils/types';
import '../../assets/css/MovieCard.css';

type Props = {
  movie: Movie;
};

const BasicExample = ({ movie }: Props) => {
  return (
    <Card style={{ width: '18rem', marginTop: '16px', marginLeft: '16px' }} bg='dark' text='light'>
      <Card.Img variant="top" src={godfather} style={{ height: '18rem', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title as="h6">{movie.title}</Card.Title>
        <Card.Text as="h6">{movie.price}KM</Card.Text>
        <Badge bg={movie.isAvailable ? 'success' : 'danger'} style={{ marginBottom: '8px' }}>
          {movie.isAvailable ? 'Available' : 'Unavailable'}
        </Badge>
        <Card.Text className="clamp-two-lines">
          {movie.description}
        </Card.Text>
        <Button variant="primary" style={{ marginRight: '8px', marginBottom: '8px' }}>
          Rent
        </Button>
        <Button variant="primary" style={{ marginRight: '8px', marginBottom: '8px' }}>
          Add to cart
        </Button>
        <Button variant="success" style={{ marginRight: '8px' }}>
          Add to wishlist
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BasicExample;
