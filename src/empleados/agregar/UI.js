import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus,faCheck,faEraser} from "@fortawesome/free-solid-svg-icons";

import Menu from "../../Menu";
import MdlInfo from "../../modales/MdlInfo";
import MdlError from "../../modales/MdlError";
import ValidarToken from "../../Sesion";
import Controller from "./Controller";

const Agregar = () =>
{
    const {
        //------variables
        validado,
        identificacion,
        nombre,
        correo,
        //------metodos
        submit,
        reset,
        setIdentificacion,
        setNombre,
        setCorreo,
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
        <Form noValidate validated={validado} onSubmit={submit}>
            <Alert variant="info" className="fs-5 fw-bold">
                <FontAwesomeIcon icon={faUserPlus} size="lg" className="pe-2"/>Agregar nuevo empleado
            </Alert>
            <Container fluid className="mt-2">
                <Row>
                    <Col lg={2}>
                        <Form.Group>
                            <Form.Label>Identificaci&oacute;n</Form.Label>
                            <Form.Control required id="identificacion" type="text" value={identificacion} onChange={e => setIdentificacion(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">Complete identificaci&oacute;n.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control required id="nombre" type="text" value={nombre} onChange={e => setNombre(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">Complete nombre.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group>
                            <Form.Label>Correo</Form.Label>
                            <Form.Control required id="correo" type="text" value={correo} onChange={e => setCorreo(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">Complete correo.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Button type="submit" variant="primary"><FontAwesomeIcon icon={faCheck} className="pe-2"/>Guardar</Button>&nbsp;&nbsp;&nbsp;
                        <Button variant="success" onClick={reset}><FontAwesomeIcon icon={faEraser} className="pe-2"/>Limpiar datos</Button>
                    </Col>
                </Row>
            </Container>
        </Form>
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
export default Agregar;
