using Microsoft.EntityFrameworkCore;
using SQLite;
using System.ComponentModel.DataAnnotations;

namespace Api_Gerenciamento_Animes.Models
{
    public class Anime
    {

        public int Id { get; set; }
        public string? Genero { get; set; }
        public int Ano { get; set; }
        public string? Titulo { get; set; }
        public string? Descricao { get; set; }
        
    }
    
    public class AnimeDb : DbContext {
        public  AnimeDb(DbContextOptions options) : base(options) { }
        public DbSet<Anime> Animes { get; set; }
        
    }

    
}
