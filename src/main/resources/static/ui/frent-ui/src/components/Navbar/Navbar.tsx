import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Movie, Notification } from "../../utils/types";
import Cart from "../Cart";
import Wishlist from "../Wishlist";
import Notifications from "../Notification";
import { Link } from "react-router-dom";

type Props = {
  movies: Movie[];
  notifications: Notification[];
};

const NavScrollExample = ({ movies, notifications }: Props) => {
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

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

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="primary"
        data-bs-theme="dark"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/home">
            Frent
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>
              <Nav.Link as={Link} to="/rentals">
                Rentals
              </Nav.Link>
              <Nav.Link onClick={handleCartClick}>Cart</Nav.Link>
              <Nav.Link onClick={handleWishlistClick}>Wishlist</Nav.Link>
              <Nav.Link onClick={handleNotificationsClick}>
                Notifications
              </Nav.Link>
              <NavDropdown title="Account" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/register">
                  Register
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/signin">
                  Sign in
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Link to="/search">
                <Button variant="outline-primary">Search</Button>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Cart show={showCart} handleClose={handleCloseCart} movies={movies} />
      <Wishlist
        show={showWishlist}
        handleClose={handleCloseWishlist}
        movies={movies}
      />
      <Notifications
        show={showNotifications}
        handleClose={handleCloseNotifications}
        notifications={notifications}
      />
    </>
  );
};

export default NavScrollExample;
