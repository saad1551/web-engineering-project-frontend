import React, { useContext } from 'react';
import { Container, Nav, Navbar, Image, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import axios from '../config/apiConfig';

const Header = () => {
    const { userRole, setUserRole } = useContext(UserContext); // Use context here

    const handleLogout = () => {
        localStorage.removeItem('jwt_payload');
        setUserRole(null); // Clear user role in context

        if (userRole === 'buyer') {
            axios.get('buyers/logout'); // Logout buyer
        } else if (userRole === 'seller') {
            axios.get('sellers/logout'); // Logout seller
        }

        window.location.href = '/'; // Redirect to login or home page
    };

    return (
        <Navbar expand="lg" className="rw-primary-color" fixed="top">
            <Container>
                <Navbar.Brand>
                    <Image src="/logo.png" height={40} />
                </Navbar.Brand>
                {userRole && (
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                )}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {userRole === 'buyer' && (
                            <>
                                <Nav.Link href="/buyer-dashboard" className="text-uppercase text-light fw-bold px-3">
                                    Dashboard
                                </Nav.Link>
                                <Nav.Link href="/buyer-profile" className="text-uppercase text-light fw-bold px-3">
                                    Edit Profile
                                </Nav.Link>
                            </>
                        )}
                        {userRole === 'seller' && (
                            <>
                                <Nav.Link href="/seller-dashboard" className="text-uppercase text-light fw-bold px-3">
                                    Dashboard
                                </Nav.Link>
                                <Nav.Link href="/seller-profile" className="text-uppercase text-light fw-bold px-3">
                                    Edit Profile
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                    {/* Logout button - Visible on all screen sizes */}
                    {userRole && (
                        <div className="d-none d-lg-block ml-3">
                            <Button
                                variant="outline-light"
                                className="fw-bold"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    )}

                    {/* Mobile Logout button - Visible only on mobile screens */}
                    {userRole && (
                        <div className="d-lg-none w-100 mt-3">
                            <Button
                                variant="outline-light"
                                className="w-100"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
