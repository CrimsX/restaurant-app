import { Navbar, Container, Nav } from 'react-bootstrap';
import { Cart } from '../cartdrawer/cart.components'
import './navbar.styles.css'

export function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky">
      <Container>
        <Navbar.Brand href="home">Ordering App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="home">Home</Nav.Link>
                <Nav.Link href="orders">Orders</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
                <Cart/>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
