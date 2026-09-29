using System.ComponentModel.DataAnnotations;
namespace AppPrueba.Models;

public class Auto
{
    [Key]
    public int AutoId { get; set; }
    public string? Modelo { get; set; }
    public int? Kilometraje { get; set; }
    public decimal? Precio { get; set; }
    public string? Patente { get; set; }
    public string? Marca { get; set; }
    public int? Anio { get; set; }
    public DateTime? FechaIngreso { get; set; }
    public bool? Estado { get; set; } = true;
}
