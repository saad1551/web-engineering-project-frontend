import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Image, Button } from 'react-bootstrap';
import axios from '../config/apiConfig';

const Header = () => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const payload = JSON.parse(localStorage.getItem('jwt_payload'));

        if (payload) {
            if (payload.buyer) {
                setUserRole('buyer');
            } else if (payload.seller) {
                setUserRole('seller');
            }
        } else {
            setUserRole(null); // No user is logged in
        }
    }, []); // Runs once when the component is mounted

    const handleLogout = () => {
        localStorage.removeItem('jwt_payload'); // Remove token from storage
        setUserRole(null); // Clear role
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
                        {userRole && (
                            <Button
                                variant="outline-light"
                                className="ms-3"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
