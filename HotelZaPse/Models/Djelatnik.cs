namespace HotelZaPse.Models
{
    public class Djelatnik : Entitet 
    {
        public string? Ime { get; set; }
        public string? Prezime { get; set; }
        public int? BrojZaduzenja
        { get; set; }
    }
}
