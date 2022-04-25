using Api_Gerenciamento_Animes.Componentes;
using Api_Gerenciamento_Animes.Models;

namespace Api_Gerenciamento_Animes.Services
{
    public class AnimeService
    {
        static List<Anime> Animes { get; }

        static int NextId=2;
        
        static AnimeService() 
        {
            Animes = new List<Anime>
            {

                new Anime{
                    Id = 1,
                    Ano = 1997,
                    Titulo = "Berseker",
                    Descricao = "Guts é um ex-mercenário espadachim que era comandante da Tropa de Assalto e agora vive," +
                    " em uma espécie de terra alternativa e com traços medievais, para caçar demônios" +
                    " Apóstolos, aqueles que já foram humanos um dia, mas por causa de um pacto tomaram outra forma. ",
                    Genero = new List<string> { "Fantasia sombria", "Épico", "Espada", "Gore", "Seinen" }
                }
            };
        }
        public static List<Anime> GetAll() => Animes;

        public static Anime Get(int id)
        {
            return Animes.FirstOrDefault(a => a.Id == id);
        }

        public static void Add(Anime anime)
        {
            anime.Id = NextId++;
            Animes.Add(anime);
        }

        public static void Delete (int id)
        {
            
            var anime = Get(id);
            if (anime is null)
                return;
            for(int i=id; i < Animes.Count ; i++)
            {
                Animes[i].Id = id++;
            }
            NextId = Animes.Count;
            Animes.Remove(anime);  
        }
        public static void Update(Anime anime)
        {
            var index = Animes.FindIndex(a => a.Id == anime.Id);
            if (index == -1)
                return;
            Animes[index] = anime;
        }
    }
}
