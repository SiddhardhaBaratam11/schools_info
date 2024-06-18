import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './HomePage.css'; // Import your CSS file

const HomePage = () => {
  return (
    <div style={styles.container}>
      <Navbar bg="light" expand="lg" style={styles.navbar}>
        <Navbar.Brand href="/" style={styles.brand}>
          School Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/parents" className="nav-link">
               Parent
            </Link>
            <Link to="/admin" className="nav-link">
              Admin
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
  },
  navbar: {
    borderBottom: '1px solid #e5e5e5',
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  content: {
    textAlign: 'center',
    marginTop: '50px',
  },
};

export default HomePage;
