import DjelatnikService from "../../services/DjelatnikService"
import { Button, Row, Col, Form } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function DjelatniciDodaj(){

    const navigate = useNavigate()

    async function dodaj(djelatnik) {
        //console.log(djelatnik)
        //console.log(JSON.stringify(djelatnik))
        const odgovor = await DjelatnikService.dodaj(djelatnik)
        if(odgovor.greska){
            alert(odgovor.poruka)
            return;
        }
        navigate(RouteNames.DJELATNIK_PREGLED)
    }

    function obradiSubmit(e){ // e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server
        let podaci = new FormData(e.target)
        //console.log(podaci.get('naziv'))
        dodaj({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            brojZaduzenja: parseInt(podaci.get('brojZaduzenja'))
           
        })
    }

    return(
        <>
        Dodavanje djelatnika
        <Form onSubmit={obradiSubmit}>

            <Form.Group controlId="ime">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" name="ime" required />
            </Form.Group>

            <Form.Group controlId="prezime">
                <Form.Label>Prezime</Form.Label>
                <Form.Control type="text" name="prezime" required />
            </Form.Group>

            <Form.Group controlId="brojZaduzenja">
                <Form.Label>Broj zaduženja</Form.Label>
                <Form.Control type="number" min={10} max={500} name="brojZaduzenja" required />
            </Form.Group>


        <Row className="akcije">
            <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.DJELATNIK_PREGLED} 
            className="btn btn-danger siroko">Odustani</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="success"
            type="submit"
            className="siroko">Dodaj djelatnik</Button>
            </Col>
        </Row>
        </Form>
        </>
    )
}