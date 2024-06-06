import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import Menu from "./Menu";
function About()
{
    return(
        <>
        <Menu/>
        <Container fluid className="mt-2">
            <Row>
                <Col>
                    <Alert variant="light">
                        <Alert.Heading>Acerca de </Alert.Heading>
                        <p>
                            Aplicaci&oacute;n de prueba REACT.
                        </p>
                    </Alert>
                </Col>
            </Row>
        </Container>
        </>
    );
}
export default About;