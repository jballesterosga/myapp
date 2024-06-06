import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass,faFileExport} from "@fortawesome/free-solid-svg-icons";

import DataTable from "react-data-table-component";

import Menu from "../../Menu";
import MdlInfo from "../../modales/MdlInfo";
import MdlError from "../../modales/MdlError";
import MdlConfirmacion from "../../modales/MdlConfirmacion";
import MdlProcesando from "../../modales/MdlProcesando";
import ValidarToken from "../../Sesion";
import Controller from "./Controller";

const Consultar = () =>
{
    const {
        //------variables
        columnas,
        datos,
        estilos,
        paginacion,
        //------metodos
        buscar1,
        buscar2,
        exportar,
        setNombre,
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
        ocultarConfirmacion,
        visibleProcesando
    } = Controller();
    return(
        <>
        <Menu/>
        <Alert variant="info" className="fs-5 fw-bold">
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" className="pe-2"/>Consultar empleados
        </Alert>
        <Container fluid className="mt-2">
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control id="nombre" type="text" aria-label="Buscar empleado por nombre" placeholder="Buscar empleado por nombre" onKeyPress={buscar2} onChange={e => setNombre(e.target.value)}/>
                        <Button variant="primary" onClick={buscar1}><FontAwesomeIcon icon={faMagnifyingGlass} size="sm" className="pe-2"/>Buscar</Button>
                        <Button variant="success" onClick={exportar}><FontAwesomeIcon icon={faFileExport} size="sm" className="pe-2"/>Exportar</Button>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataTable columns={columnas}
                               data={datos}
                               noDataComponent="Aqui se muestra el detalle de los empleados"
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
        <MdlProcesando visible={visibleProcesando}/>
        <ValidarToken/>
        </>
    );
};
export default Consultar;