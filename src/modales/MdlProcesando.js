import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

const MdlProcesando = (props) =>
{
    const {visible} = props;
    return(
        <>
            <Modal show={visible}
                size="sm"
                backdrop="static"
                keyboard={false}
                centered>
             <Modal.Body className="text-center">
                 <Spinner animation="grow" variant="primary"/>
                 <Spinner animation="grow" variant="primary"/>
                 <Spinner animation="grow" variant="primary"/>
                 <Spinner animation="grow" variant="primary"/>
                 <Spinner animation="grow" variant="primary"/>
                 <Spinner animation="grow" variant="primary"/>
                 <Spinner animation="grow" variant="primary"/>
             </Modal.Body>
         </Modal>
        </>
    );
};
export default MdlProcesando;