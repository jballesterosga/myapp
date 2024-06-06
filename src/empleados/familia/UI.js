import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPeopleArrows,faCheck,faEraser,faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

import DataTable from "react-data-table-component";

import Menu from "../../Menu";
import MdlInfo from "../../modales/MdlInfo";
import MdlConfirmacion from "../../modales/MdlConfirmacion";
import MdlError from "../../modales/MdlError";
import ValidarToken from "../../Sesion";
import Controller from "./Controller";

const Familia = () =>
{
    const {
        //------variables
        focusIdentificacion,
        identificacion,
        nombre,
        correo,
        focusDetalle,
        detalle,
        editable,
        esValido,
        columnas,
        datos,
        estilos,
        paginacion,
        //------metodos
        setIdentificacion,
        enter,
        cargarEmpleado,
        setDetalle,
        guardar,
        reset,
        //------modales
        mensajeInfo,
        visibleInfo,
        ocultarInfo,
        mensajeError,
        visibleError,
        ocultarError,
        mensajeConfirmacion,
        visibleConfirmacion,
        confirmar,
        ocultarConfirmacion
    } = Controller();
    return(
        <>
        <Menu/>
        <Alert variant="info" className="fs-5 fw-bold">
            <FontAwesomeIcon icon={faPeopleArrows} size="lg" className="pe-2"/>Familia de empleado
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
                        <Form.Control id="nombre" type="text" value={nombre} readOnly={true} isValid={esValido}/>
                    </Form.Group>
                </Col>
                <Col lg={5}>
                    <Form.Group>
                        <Form.Label>Correo</Form.Label>
                        <Form.Control id="correo" type="text" value={correo} readOnly={true} isValid={esValido}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Detalle de familiar nuevo</Form.Label>
                        <Form.Control ref={focusDetalle} id="detalle" type="text" value={detalle} onChange={e => setDetalle(e.target.value)}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <Button type="submit" variant="primary" onClick={guardar}><FontAwesomeIcon icon={faCheck} className="pe-2"/>Guardar</Button>&nbsp;&nbsp;&nbsp;
                    <Button variant="success" onClick={reset}><FontAwesomeIcon icon={faEraser} className="pe-2"/>Limpiar datos</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataTable title="Familia actual"
                               columns={columnas}
                               data={datos}
                               noDataComponent="Aqui se muestra el detalle de los familiares del empleado"
                               customStyles={estilos}
                               pagination
                               paginationComponentOptions={paginacion}/>
                </Col>
            </Row>
        </Container>
        <MdlInfo mensaje={mensajeInfo}
                 visible={visibleInfo}
                 ocultar={ocultarInfo}/>
        <MdlError mensaje={mensajeError}
                  visible={visibleError}
                  ocultar={ocultarError}/>
        <MdlConfirmacion mensaje={mensajeConfirmacion}
                         visible={visibleConfirmacion}
                         confirmar={confirmar}
                         ocultar={ocultarConfirmacion}/>
        <ValidarToken/>
        </>
    );
};
export default Familia;