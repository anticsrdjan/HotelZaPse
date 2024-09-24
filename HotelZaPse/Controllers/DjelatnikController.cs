
using HotelZaPse.Models;
using HotelZaPse.Data;
using Microsoft.AspNetCore.Mvc;

namespace EdunovaAPP.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DjelatnikController : ControllerBase
    {
        // dependency injection
        // 1. definirati privatno svojstvo
        private readonly EdunovaContext _context;

        // dependecy injection
        // 2. proslijediš instancu kroz konstruktor
        public DjelatnikController(EdunovaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Djelatnici);
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            return Ok(_context.Djelatnici.Find(sifra));
        }



        [HttpPost]
        public IActionResult Post(Djelatnik smjer)
        {
            _context.Djelatnici.Add(smjer);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, smjer);
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Djelatnik djelatnik)
        {
            var smjerBaza = _context.Djelatnici.Find(sifra);

            // za sada ručno, kasnije mapper
            smjerBaza.Ime = djelatnik.Ime;
            smjerBaza.Prezime = djelatnik.Prezime ;
            smjerBaza.BrojZaduzenja = djelatnik.BrojZaduzenja;
            

            _context.Djelatnici.Update(smjerBaza);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promjenjeno" });

        }



        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var smjerBaza = _context.Djelatnici.Find(sifra);

            _context.Djelatnici.Remove(smjerBaza);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno obrisano" });

        }


    }
}