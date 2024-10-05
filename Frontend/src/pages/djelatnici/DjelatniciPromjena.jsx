import DjelatnikService from "../../services/DjelatnikService"
import { Button, Row, Col, Form } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { useEffect, useState } from "react";


export default function DjelatniciPromjena(){

    const [djelatnik,setDjelatnik] = useState({})
    const navigate = useNavigate()
    const routeParams = useParams()

    async function dohvatidjelatnik(){
        const odgovor = await DjelatnikService.getBySifra(routeParams.sifra);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        //debugger; // ovo radi u Chrome inspect (ali i ostali preglednici)
        let s = odgovor.poruka
        setDjelatnik(s)
    } 

    useEffect(()=>{
        dohvatidjelatnik();
     },[])

     async function promjena(djelatnik) {
        //console.log(djelatnik)
        //console.log(JSON.stringify(djelatnik))
        const odgovor = await DjelatnikService.promjena(routeParams.sifra,djelatnik)
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
        promjena({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            brojZaduzenja: parseInt(podaci.get('brojZaduzenja'))
        })
    }

    return(
        <>
        Promjena djelatnika
        <Form onSubmit={obradiSubmit}>

            <Form.Group controlId="ime">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" name="ime" required
                defaultValue={djelatnik.ime} />
            </Form.Group>

            <Form.Group controlId="prezime">
                <Form.Label>Prezime</Form.Label>
                <Form.Control type="text" name="prezime" required
                defaultValue={djelatnik.prezime} />
            </Form.Group>


            <Form.Group controlId="brojZaduzenja">
                <Form.Label>Broj zaduženja</Form.Label>
                <Form.Control type="number" min={10} max={500} name="brojZaduzenja" required defaultValue={djelatnik.brojZaduzenja}/>
            </Form.Group>


        <Row className="akcije">
            <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.DJELATNIK_PREGLED} 
            className="btn btn-danger siroko">Odustani</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="success"
            type="submit"
            className="siroko">Promjeni djelatnik</Button>
            </Col>
        </Row>
        </Form>
        </>
    )
}