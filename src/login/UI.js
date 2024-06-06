import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck,faUserCheck,faInfoCircle} from "@fortawesome/free-solid-svg-icons";

import MdlError from "../modales/MdlError";
import Controller from "./Controller";

const Login = (props) =>
{
    const {
        //------variables
        validado,
        usuario,
        contrasena,
        //------metodos
        submit,
        setUsuario,
        setContrasena,
        //------modales
        mensajeError,
        visibleError,
        ocultarError
    } = Controller();
    return(
        <>
        <Form noValidate validated={validado} onSubmit={submit}>
            <section className="vh-100 bg-light">
                <Container className="py-5 h-100">
                    <Row className="d-flex justify-content-center align-items-center h-100">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="shadow-2-strong" style={{bordeRadius:"1rem"}}>
                                <Card.Body className="p5">
                                    <h3 className="mb-3 text-center">MyApp - Login</h3>
                                    <div className="text-center"><FontAwesomeIcon icon={faUserCheck} size="3x"/></div>
                                    <div><hr/></div>
                                    <Form.Group>
                                        <Form.Label>Usuario</Form.Label>
                                        <Form.Control required id="usuario" type="text" value={usuario} onChange={e => setUsuario(e.target.value)}/>
                                        <Form.Control.Feedback type="invalid">Complete usuario.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Contrase&ntilde;a</Form.Label>
                                        <Form.Control required id="contrasena" type="password" value={contrasena} onChange={e => setContrasena(e.target.value)}/>
                                        <Form.Control.Feedback type="invalid">Complete contrase&ntilde;a.</Form.Control.Feedback>
                                    </Form.Group>
                                    <div className="mt-4 text-center">
                                        <Button type="submit" variant="primary"><FontAwesomeIcon icon={faCheck} className="pe-2"/>Aceptar</Button>
                                    </div>
                                    {
                                        props.mensaje === "fin" ? <Alert variant="success" className="mt-2 fs-6"><FontAwesomeIcon icon={faInfoCircle} size="lg" className="pe-2"/>Sesi&oacute;n finalizada</Alert> : ""
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Form>
        <MdlError mensaje={mensajeError}
                  visible={visibleError}
                  ocultar={ocultarError}/>
        </>
    );
};
export default Login;