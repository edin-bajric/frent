import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import godfather from '../../assets/img/godfather.jpg';
import { Movie } from '../../utils/types';

type Props = {
  movie: Movie;
}

const BasicExample = ({movie}: Props) =>{
  return (
    <Card style={{ width: '18rem', marginTop: '16px', marginLeft: '16px'}} bg='dark' text='light'>
      <Card.Img variant="top" src={godfather} style={{ height: '18rem', objectFit: 'cover'}}/>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text style={{ color: 'crimson'}} as="h5">Valid until {movie.dueDate}</Card.Text>
        <Badge bg="secondary" style={{marginBottom: '8px'}}>{movie.isRented ? "Rented" : "Returned"}</Badge>
        <Card.Text>
        {movie.description}
        </Card.Text>
        <Button variant="primary" style={{marginRight: "8px"}}>Return</Button>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;