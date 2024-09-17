using System.ComponentModel.DataAnnotations;

namespace HotelZaPse.Models
{
    public abstract class Entitet
    {
        [Key]
        public int? Sifra { get; set; }
    }
}
