import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import CloseButton from "react-bootstrap/CloseButton";
import { Movie, Notification } from "../../utils/types";
import SignIn from "../SignIn";
import Register from "../Register";

type Props = {
  movies: Movie[];
  notifications: Notification[];
};

const NavScrollExample = ({ movies, notifications }: Props) => {
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleWishlistClick = () => {
    setShowWishlist(true);
  };

  const handleCloseWishlist = () => {
    setShowWishlist(false);
  };

  const handleNotificationsClick = () => {
    setShowNotifications(true);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const handleSignInClick = () => {
    setShowSignIn(true);
  };

  const handleCloseSignIn = () => {
    setShowSignIn(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  const calculateTotalPrice = (movies: any[]) => {
    return movies.reduce((total, movie) => total + movie.price, 0);
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="primary"
        data-bs-theme="dark"
      >
        <Container fluid>
          <Navbar.Brand href="#">Frent</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
              variant="pills"
              defaultActiveKey="/home"
            >
              <Nav.Link href="#">Movies</Nav.Link>
              <Nav.Link href="##">
                Rentals
              </Nav.Link>
              <Nav.Link href="###" onClick={handleCartClick}>
                Cart
              </Nav.Link>
              <Nav.Link href="####" onClick={handleWishlistClick}>
                Wishlist
              </Nav.Link>
              <Nav.Link href="#####" onClick={handleNotificationsClick}>
                Notifications
              </Nav.Link>
              <NavDropdown title="Account" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#####" onClick={handleRegisterClick}>Register</NavDropdown.Item>
                <NavDropdown.Item href="######" onClick={handleSignInClick}>Sign in</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas
        data-bs-theme="dark"
        show={showCart}
        onHide={handleCloseCart}
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
      <Offcanvas
        data-bs-theme="dark"
        show={showWishlist}
        onHide={handleCloseWishlist}
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
                <Button variant="primary" style={{ marginRight: "16px" }}>
                  Rent
                </Button>
                <CloseButton />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas
        data-bs-theme="dark"
        show={showNotifications}
        onHide={handleCloseNotifications}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup as="ol">
            {notifications.map((notification, index) => (
              <ListGroup.Item
                key={index}
                as="li"
                className="d-flex justify-content-between align-items-start"
                variant="light"
              >
                <div className="ms-2 me-auto">{notification.message}</div>
                <CloseButton />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas
        data-bs-theme="dark"
        show={showSignIn}
        onHide={handleCloseSignIn}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sign In</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SignIn />
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas
        data-bs-theme="dark"
        show={showRegister}
        onHide={handleCloseRegister}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Register</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Register />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavScrollExample;
