import { HttpService } from "./HttpService";



async function get(){
    return await HttpService.get('/Djelatnik')
    .then((odgovor)=>{
        //console.log(odgovor.data)
        //console.table(odgovor.data)
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        //console.log(e)
        return {greska: true, poruka: 'Problem kod dohvaćanja Djelatnikova'}   
    })
}

async function brisanje(sifra){
    return await HttpService.delete('/Djelatnik/' + sifra)
    .then(()=>{
        return {greska: false, poruka: 'Obrisano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod brisanja Djelatnika'}   
    })
}

async function dodaj(Djelatnik){
    return await HttpService.post('/Djelatnik',Djelatnik)
    .then(()=>{
        return {greska: false, poruka: 'Dodano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod dodavanja Djelatnika'}   
    })
}

async function promjena(sifra,Djelatnik){
    return await HttpService.put('/Djelatnik/' + sifra,Djelatnik)
    .then(()=>{
        return {greska: false, poruka: 'Dodano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod dodavanja Djelatnika'}   
    })
}

async function getBySifra(sifra){
    return await HttpService.get('/Djelatnik/'+sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja Djelatnika s šifrom '+sifra}   
    })
}


export default {
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena
}
