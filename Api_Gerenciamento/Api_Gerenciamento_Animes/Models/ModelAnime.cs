using Api_Gerenciamento_Animes.Componentes;

namespace Api_Gerenciamento_Animes.Models
{
    public class Anime
    {
        public int Id { get; set; }
        public List<string> Genero { get; set; }
        public int Ano { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
      
    }
}
