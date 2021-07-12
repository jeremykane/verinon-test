import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { NavbarText } from 'reactstrap'
import { withRouter } from "react-router-dom";
import AuthenticationService from "../../apis/AuthenticationService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
        this.state.username = 'Welcome, ' + AuthenticationService.getCurrentUser()
    }

    render() {
        // const isUserloggedIn = AuthenticationService.isUserLoggedIn();
        console.log(AuthenticationService.getCurrentUser())
        return (
            <header>
                <Navbar variant="dark" fixed="top" className="nav-bar">
                    <Navbar.Brand href="/dashboard">Verinon</Navbar.Brand>
                    <Nav className="mr-auto" >
                    </Nav>

                    <Nav className="navbar-right">
                        {!AuthenticationService.isUserLoggedIn() && <Nav.Link href="/login" className="nav-bar-button"><FontAwesomeIcon icon={faUser} /> Login</Nav.Link>}
                        {AuthenticationService.isUserLoggedIn() &&
                            <NavbarText> Welcome, {AuthenticationService.getCurrentUser()}</NavbarText>}
                        {AuthenticationService.isUserLoggedIn() && <Nav.Link href="/login " className="nav-bar-button" onClick={AuthenticationService.logout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Nav.Link>}
                    </Nav>
                </Navbar>
            </header>
        )
    }
}

export default withRouter(HeaderComponent);