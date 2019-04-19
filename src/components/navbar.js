import React from 'react'
import { Item } from "gatsby"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link as GatsbyLink} from "gatsby"

class NavBar extends React.Component {
    render() {
        return (
            <Navbar bg="light" style={{color: "#883a3a"}}>
            <GatsbyLink to="/">
                <span className="navbar-brand mb-0 h1">Theta Tau | SJSU</span>
            </GatsbyLink>
            <Nav>
                <Nav.Item>
                    <GatsbyLink to="/">
                        Home
                    </GatsbyLink>
                </Nav.Item>
                <Nav.Item> 
                    <GatsbyLink to="/about">
                        About
                    </GatsbyLink>
                </Nav.Item>
                <Nav.Item>
                    <GatsbyLink to="/brothers">
                        Brothers
                    </GatsbyLink>
                </Nav.Item>
                <Nav.Item>
                    <GatsbyLink to="/rush">
                        Rush
                    </GatsbyLink>
                </Nav.Item>
            </Nav>
          </Navbar>
        )
    }
}

export default NavBar
