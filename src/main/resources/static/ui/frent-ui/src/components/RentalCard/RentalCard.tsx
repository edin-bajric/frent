import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { RentalMovie } from "../../utils/types";
import "../../assets/css/MovieRentalCard.css";
import useReturnRentalForUser from "../../hooks/useReturnRentals";

type Props = {
  rentalMovie: RentalMovie;
};

const BasicExample = ({ rentalMovie }: Props) => {
  const [isReturned, setIsReturned] = useState(rentalMovie.returned);
  const returnRentalMutation = useReturnRentalForUser();

  const handleReturnClick = () => {
    const rentalId = rentalMovie.id;

    returnRentalMutation.mutate(rentalId, {
      onSuccess: () => {
        setIsReturned(true);
      },
    });
  };

  return (
    <Card style={{ width: "18rem" }} bg="dark" text="light">
      <Card.Img
        variant="top"
        src={rentalMovie.smallImage}
        style={{ height: "18rem", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title as="h6">{rentalMovie.title}</Card.Title>
        <Card.Text style={{ color: "crimson" }} as="h5">
          Valid until {rentalMovie.dueDate.toString()}
        </Card.Text>
        <Badge bg="secondary" style={{ marginBottom: "8px" }}>
          {isReturned ? "Returned" : "Rented"}
        </Badge>
        <Card.Text className="clamp-two-lines">
          {rentalMovie.description}
        </Card.Text>
        <Button
          variant="primary"
          style={{ marginRight: "8px" }}
          onClick={handleReturnClick}
          disabled={isReturned}
        >
          Return
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BasicExample;
