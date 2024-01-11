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
              <Nav.Link href="##">Rentals</Nav.Link>
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
                <NavDropdown.Item href="#####">Register</NavDropdown.Item>
                <NavDropdown.Item href="######">Sign in</NavDropdown.Item>
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
      {showCart && <Cart movies={movies} handleClose={handleCloseCart} />}
      {showWishlist && (
        <Wishlist movies={movies} handleClose={handleCloseWishlist} />
      )}
      {showNotifications && (
        <Notifications
          notifications={notifications}
          handleClose={handleCloseNotifications}
        />
      )}
    </>
  );
};

export default NavScrollExample;
