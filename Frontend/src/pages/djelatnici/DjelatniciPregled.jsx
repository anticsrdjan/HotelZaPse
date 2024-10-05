import { useEffect, useState } from "react"
import DjelatnikService from "../../services/DjelatnikService"
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function DjelatniciPregled(){

    const navigate = useNavigate()

    const[djelatnici, setDjelatnici] = useState();

    async function dohvatiDjelatnikove(){
        const odgovor = await DjelatnikService.get();
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        //debugger; // ovo radi u Chrome inspect (ali i ostali preglednici)
        setDjelatnici(odgovor.poruka)
    } 

    // Ovaj hook (kuka) se izvodi dolaskom na stranicu Djelatnici
    useEffect(()=>{
       dohvatiDjelatnikove();
    },[])

   
    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeDjelatnika(sifra)
    }

    async function brisanjeDjelatnika(sifra) {
        
        const odgovor = await DjelatnikService.brisanje(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        dohvatiDjelatnikove();
    }


    return(
        <>
        <Link to={RouteNames.DJELATNIK_NOVI}
        className="btn btn-success siroko">Dodaj novi Djelatnik</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Broj zaduženja</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {djelatnici && djelatnici.map((djelatnik,index)=>(
                    <tr key={index}>
                        <td>
                            {djelatnik.ime}
                        </td>
                        <td>
                            {djelatnik.prezime}
                        </td>
                        <td>
                            {djelatnik.brojZaduzenja}
                        </td>
                        
                        <td>
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(djelatnik.sifra)}
                            >
                                Obriši
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            onClick={()=>navigate(`/djelatnici/${djelatnik.sifra}`)}
                            >
                                Promjena
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}