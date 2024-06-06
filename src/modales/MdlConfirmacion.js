import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleQuestion} from "@fortawesome/free-solid-svg-icons";
const MdlConfirmacion = (props) =>
{
    const {mensaje,visible,confirmar,ocultar} = props;
    return(
        <>
            <Modal show={visible}
                size="md"
                onHide={ocultar}
                centered>
             <Modal.Header closeButton>
                <Modal.Title><FontAwesomeIcon icon={faCircleQuestion} size="lg" className="pe-2"/>Confirmaci&oacute;n requerida</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <p>{mensaje}</p>
             </Modal.Body>
             <Modal.Footer>
                <Button variant="primary" onClick={confirmar}>Aceptar</Button>
                <Button variant="success" onClick={ocultar}>Cancelar</Button>
             </Modal.Footer>
         </Modal>
        </>
    );
};
export default MdlConfirmacion;