import Carousel from "react-bootstrap/Carousel";
import browseImage from "../../assets/img/browseImage.jpeg";
import rentImage from "../../assets/img/rentImage.jpg";
import enjoyImage from "../../assets/img/enjoyImage.jpg";
import "../../assets/css/Carousel.css";

function UncontrolledExample() {
  return (
    <Carousel className="carousel">
      <Carousel.Item>
        <img
          src={browseImage}
          className="carousel-img"
          alt="Browse Image"
        ></img>
        <Carousel.Caption>
          <h3>Browse</h3>
          <p>Discover, Explore, Find Your Flick!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={rentImage} className="carousel-img" alt="Rent Image"></img>
        <Carousel.Caption>
          <h3>Rent</h3>
          <p>Grab the Popcorn, Rent the Fun!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={enjoyImage} className="carousel-img" alt="Enjoy Image"></img>
        <Carousel.Caption>
          <h3>Enjoy</h3>
          <p>Sit Back, Relax, and Enjoy the Show!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
