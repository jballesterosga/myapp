import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPen,faCheck,faEraser,faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

import Menu from "../../Menu";
import MdlInfo from "../../modales/MdlInfo";
import MdlError from "../../modales/MdlError";
import ValidarToken from "../../Sesion";
import Controller from "./Controller";

const Modificar = () =>
{
    const {
        //------variables
        focusIdentificacion,
        identificacion,
        nombre,
        correo,
        editable,
        esValido,
        //------metodos
        setIdentificacion,
        cargarEmpleado,
        enter,
        setNombre,
        setCorreo,
        modificar,
        reset,
        //------modales
        mensajeInfo,
        visibleInfo,
        ocultarInfo,
        mensajeError,
        visibleError,
        ocultarError
    } = Controller();
    return(
        <>
        <Menu/>
        <Alert variant="info" className="fs-5 fw-bold">
            <FontAwesomeIcon icon={faUserPen} size="lg" className="pe-2"/>Modificar empleado
        </Alert>
        <Container fluid className="mt-2">
            <Row>
                <Col lg={3}>
                    <InputGroup className="align-items-end">
                        <Form.Group>
                            <Form.Label>Identificaci&oacute;n</Form.Label>
                            <Form.Control ref={focusIdentificacion} required id="identificacion" type="text" value={identificacion} readOnly={!editable} isValid={esValido} onChange={e => setIdentificacion(e.target.value)} onKeyPress={e => enter(e)}/>
                        </Form.Group>
                        <Button variant="success" className="h-50" onClick={e => cargarEmpleado(identificacion)}><FontAwesomeIcon icon={faMagnifyingGlass}/></Button>
                    </InputGroup>
                </Col>
                <Col lg={4}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control id="nombre" type="text" value={nombre} onChange={e => setNombre(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col lg={5}>
                    <Form.Group>
                        <Form.Label>Correo</Form.Label>
                        <Form.Control id="correo" type="text" value={correo} onChange={e => setCorreo(e.target.value)}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <Button type="submit" variant="primary" onClick={modificar}><FontAwesomeIcon icon={faCheck} className="pe-2"/>Modificar</Button>&nbsp;&nbsp;&nbsp;
                    <Button variant="success" onClick={reset}><FontAwesomeIcon icon={faEraser} className="pe-2"/>Limpiar datos</Button>
                </Col>
            </Row>
        </Container>
        <MdlInfo mensaje={mensajeInfo}
                 visible={visibleInfo}
                 ocultar={ocultarInfo}/>
        <MdlError mensaje={mensajeError}
                  visible={visibleError}
                  ocultar={ocultarError}/>
        <ValidarToken/>
        </>
    );
};
export default Modificar;