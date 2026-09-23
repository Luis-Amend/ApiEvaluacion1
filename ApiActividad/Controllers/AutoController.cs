using AppPrueba.Data;
using AppPrueba.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppPrueba.Controllers;

[Route("api/[controller]")]
[ApiController]

public class AutoController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AutoController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> ListadoAutos()
    {
        var auto = await _context.Autos.ToListAsync();

        return Ok(auto);
    }

    [HttpPost]
    public async Task<IActionResult> CrearAuto([FromBody]Auto auto)
    {
        var modeloMayuscula = auto.Modelo?.Trim().ToUpper();
        var marcaMayuscula = auto.Marca?.Trim().ToUpper();
        var patenteMayuscula = auto.Patente?.Trim().ToUpper();
        var anio = auto.Anio;
        var fechaIngreso = auto.FechaIngreso;
        var estado = auto.Estado;
        var kilometraje = auto.Kilometraje;
        var precio = auto.Precio;
        
        var existePatente = await _context.Autos.AnyAsync(e => e.Patente == patenteMayuscula);

        if (!existePatente)
        {
            var nuevoAuto = new Auto
            {
                Modelo = modeloMayuscula,
                Marca = marcaMayuscula,
                Patente = patenteMayuscula,
                Anio = anio,
                FechaIngreso = fechaIngreso,
                Estado = estado,
                Kilometraje = kilometraje,
                Precio = precio
            };
            _context.Autos.Add(nuevoAuto);
            await _context.SaveChangesAsync();
            return Ok("Auto guardado");
        }
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> ActualizarAuto(int id, [FromBody]Auto auto)
    {
        var modeloMayuscula = auto.Modelo?.Trim().ToUpper();
        var marcaMayuscula = auto.Marca?.Trim().ToUpper();
        var patenteMayuscula = auto.Patente?.Trim().ToUpper();
        var anio = auto.Anio;
        var fechaIngreso = auto.FechaIngreso;
        var estado = auto.Estado;
        var kilometraje = auto.Kilometraje;
        var precio = auto.Precio;

        var editarAuto = await _context.Autos.Where(e => e.AutoId == id).SingleOrDefaultAsync();

        if (editarAuto == null)
        {
        return Ok("el auto que quiere editar no existe");
        };

        var existePatente = await _context.Autos.AnyAsync(e => e.Patente == patenteMayuscula && e.AutoId != id);

        if (!existePatente)
        {
            editarAuto.Modelo = modeloMayuscula;
            editarAuto.Marca = marcaMayuscula;
            editarAuto.Patente = patenteMayuscula;
            editarAuto.Anio = anio;
            editarAuto.FechaIngreso = fechaIngreso;
            editarAuto.Estado = estado;
            editarAuto.Kilometraje = kilometraje;
            editarAuto.Precio = precio;
            await _context.SaveChangesAsync();

            return Ok("auto editado exitosamente");
        }
        return Ok("ya existe un auto con esa patente");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> EliminarAuto(int id)
    {
        var eliminarAuto = await _context.Autos.Where(e => e.AutoId == id).SingleOrDefaultAsync();

        if (eliminarAuto == null)
        {
            return NotFound("auto no encontrado");
        }
        _context.Autos.Remove(eliminarAuto);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> ObtenerAuto(int id)
    {
        var auto = await _context.Autos.Where(e => e.AutoId == id).SingleOrDefaultAsync();

        if (auto == null)
        {
            return NotFound("auto no encontrado");
        }

        return Ok(auto);
    }
}
