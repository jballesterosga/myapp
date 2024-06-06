import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserClock} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
const MdlError = (props) =>
{
    const navigate = useNavigate();
    const {visible} = props;
    const redireccionar = () =>
    {
        navigate("/logout");
    };
    return(
        <>
            <Modal show={visible}
                   size="md"
                   onHide={redireccionar}
                   backdrop="static"
                   keyboard={false}
                   centered>
             <Modal.Header closeButton>
                 <Modal.Title><FontAwesomeIcon icon={faUserClock} size="lg" className="pe-2"/>Sesi&oacute;n finalizada</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <p>Debe ingresar nuevamente</p>
             </Modal.Body>
             <Modal.Footer>
                 <Button variant="primary" onClick={redireccionar}>Ingresar</Button>
             </Modal.Footer>
         </Modal>
        </>
    );
};
export default MdlError;