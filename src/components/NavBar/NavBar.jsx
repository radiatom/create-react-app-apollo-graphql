import React from "react";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

const NavBar = ({setNameList, setOpenModalNewTask}) => {
    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Список завдань</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Стан" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1" onClick={() => setNameList("completedTasksList")}>
                                Виконані
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1" onClick={() => setNameList("notCompletedTasksList")}>
                                Не виконані
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Button variant="success" onClick={()=>setOpenModalNewTask(true)}>Додати завдання</Button>
            </Container>
        </Navbar>
    );
};

export default NavBar;
