import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
const MdlError = (props) =>
{
    const {mensaje,visible,ocultar} = props;
    return(
        <>
            <Modal show={visible}
                size="md"
                onHide={ocultar}
                centered>
             <Modal.Header closeButton>
                 <Modal.Title><FontAwesomeIcon icon={faTriangleExclamation} size="lg" className="pe-2"/>Error</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <p>{mensaje}</p>
             </Modal.Body>
             <Modal.Footer>
                 <Button variant="primary" onClick={ocultar}>Cerrar</Button>
             </Modal.Footer>
         </Modal>
        </>
    );
};
export default MdlError;