import {Link} from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlay,faHouse,faUsers,faUserPlus,faUserPen,faPeopleArrows,faMagnifyingGlass,faCircleInfo,faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
function Menu()
{
    return(
        <>
        <Navbar expand="sm" className="bg-body-tertiary" data-bs-theme="dark">
            <Navbar.Brand href="#0"><FontAwesomeIcon icon={faCirclePlay} size="lg" className="pe-2"/>MyApp</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/home"><FontAwesomeIcon icon={faHouse} size="lg" className="pe-2"/>Inicio</Nav.Link>
                    <NavDropdown title={<><FontAwesomeIcon icon={faUsers} size="lg" className="pe-2"/><span>Empleados</span></>}>
                        <NavDropdown.Item as={Link} to="/empleados/agregar"><FontAwesomeIcon icon={faUserPlus} size="lg" className="pe-2"/>Agregar</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/empleados/modificar/0"><FontAwesomeIcon icon={faUserPen} size="lg" className="pe-2"/>Modificar</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/empleados/familia/0"><FontAwesomeIcon icon={faPeopleArrows} size="lg" className="pe-2"/>Familia</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item as={Link} to="/empleados/consultar"><FontAwesomeIcon icon={faMagnifyingGlass} size="lg" className="pe-2"/>Consultar</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to="/about"><FontAwesomeIcon icon={faCircleInfo} size="lg" className="pe-2"/>Acerca de</Nav.Link>
                    <Nav.Link as={Link} to="/logout"><FontAwesomeIcon icon={faRightFromBracket} size="lg" className="pe-2"/>Salir</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
}
export default Menu;