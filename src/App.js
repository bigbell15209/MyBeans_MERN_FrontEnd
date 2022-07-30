import React, { useEffect, useState } from "react"
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	Routes
} from "react-router-dom"

///////////////////////////
// Modules needed
///////////////////////////
import { NavDropdown } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import "./App.css"


///////////////////////////
// Basic Navigation
///////////////////////////
import Home from "./components/Home"
import Login from "./components/Login"
import { useDispatch, useSelector } from "react-redux"
import {
	setLocalUserLogin,
	setLoginSuccess,
	setLogoutSuccess
} from "./features/authSlice"

import Register4Vendor from "./components/vendor/Register4Vendor"

///////////////////////////
// Seller Navigation
///////////////////////////

///////////////////////////
// Vendor Navigation
///////////////////////////



function App() {
  const [userEmail, setUserEmail] = useState("")

	const email = useSelector((state) => state.auth.value.email)
	const role = useSelector((state) => state.auth.value.role)

	const dispatch = useDispatch()

	const token = localStorage.getItem("token")
	useEffect(() => {
		if (token != null) {
			dispatch(setLocalUserLogin())
		}
	}, [])

	const logout = () => {
		dispatch(setLogoutSuccess())
	}

  return (
    <Router>
      <Navbar bg="warning" variant="light" expand="xxl" className="app-nav">
        <Container>
        <Navbar.Brand href="/home" className="app-logo">Coffee Management</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home">
								Home
							</Nav.Link>
							<Nav.Link as={Link} to="/login">
								Login
							</Nav.Link>
              <NavDropdown title="Register" id="collasible-nav-dropdown">
								<NavDropdown.Item as={Link} to="/seller-register">
									Register for Seller
								</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="/vendor-register">
									Register for Vendor
								</NavDropdown.Item>
							</NavDropdown>
            </Nav>
          </Navbar.Collapse>

          {email && <Navbar.Brand>{email}</Navbar.Brand>}
					{email && (
						<Navbar.Brand className="btn" onClick={logout}>
							{" "}
							Log out
						</Navbar.Brand>
					)}

        </Container>
      </Navbar>

      <div className="center-container">
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="vendor-register" element={<Register4Vendor/>} />
          <Route path="login" element={<Login />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
