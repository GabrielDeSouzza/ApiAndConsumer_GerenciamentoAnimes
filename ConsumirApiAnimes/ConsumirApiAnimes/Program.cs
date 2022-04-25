using ConsumirApiAnimes.Models;
using System.Net.Http.Json;
using System.Net;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text.Json.Nodes;

class Program
{
    static HttpClient client = new HttpClient();

    static void MostrarAnime(Anime anime)
    {
        Console.WriteLine($"Id:{anime.Id}");
        Console.WriteLine($"Anime:{anime.Titulo}");
        foreach(string animeGeneros in anime.Genero)
        {
            Console.Write(animeGeneros+"; ");
        }
        Console.WriteLine();
        Console.WriteLine($"Descrição:{anime.Descricao}");
        Console.WriteLine($"Ano:{anime.Ano}");
    }

    static async Task<Uri> CriarAnimeAsync(Anime anime)
    {
        HttpResponseMessage response = await client.PostAsJsonAsync("api/Anime", anime);
        response.EnsureSuccessStatusCode();
        return response.Headers.Location;
    }

    static async Task<List<Anime>> GetAnimeAsync(string caminho)
    {
        List<Anime> animes = null;
        HttpResponseMessage response = await client.GetAsync(caminho);
        if (response.IsSuccessStatusCode)
        {
            animes = await response.Content.ReadAsAsync<List<Anime>>();
 
        }
        return animes;
    }

    static async Task<Anime> GetAnimeByIDAsync(string caminho, int id)
    {
        Anime anime = null;
        HttpResponseMessage response = await client.GetAsync(caminho + "/" + id);
        if (response.IsSuccessStatusCode)
        {
            anime = await response.Content.ReadAsAsync<Anime>();
        }
        return anime;
    }
    static async Task<Anime> AtualizarAnimeAsync(Anime anime)
    {
        HttpResponseMessage response = await client.PutAsJsonAsync($"api/Anime/{anime.Id}", anime);
        response.EnsureSuccessStatusCode();
        anime = await response.Content.ReadAsAsync<Anime>();
        return anime;
    }

    static async Task<HttpStatusCode> DeleteAnimeAsync(string id)
    {
        HttpResponseMessage response = await client.DeleteAsync($"api/Anime/{id}");
        return response.StatusCode;
    }

    static async Task RunAsyinc()
    {
        client.BaseAddress = new Uri("https://localhost:7128/");
        client.DefaultRequestHeaders.Accept.Clear();
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        try
        {
            Console.WriteLine("\t\t\tGerenciador de Animes\n\n\n");
            Console.WriteLine("Escolha entre uma das opções\n");
            Console.WriteLine("1-Ver todos animes cadastrados");
            Console.WriteLine("2-Ver Anime expeficico pelo Id");
            Console.WriteLine("3-Add Anime");
            Console.WriteLine("4-Atualizar Anime");
            Console.WriteLine("5-Excluir Anime");
            Console.WriteLine("0-Fechar o Gerenciador");
            int op = int.Parse(Console.ReadLine());
            switch (op)
            {
                case 0:
                    Console.WriteLine("\t\t\tAté a proxíma!!!");
                    break;
                case 1:
                    var anime =await GetAnimeAsync("api/Anime");
                    foreach(Anime animes in anime)
                    {
                        MostrarAnime(animes);
                        Console.WriteLine("\n");
                    }
                    break;
                case 2:
                    Console.WriteLine("Digite o Id do anime desejado");
                    int id = int.Parse(Console.ReadLine());
                    Anime animeById = await GetAnimeByIDAsync("api/Anime", id);
                    MostrarAnime(animeById);
                    break;
                case 3:
                    var novoAnime = new Anime();
                    Console.WriteLine("Digite o nome/titulo do anime");
                    novoAnime.Titulo = Console.ReadLine();
                    Console.WriteLine("Digite o ano de lançamento");
                    novoAnime.Ano = int.Parse(Console.ReadLine());
                    Console.WriteLine("Digite uma descrição do anime");
                    novoAnime.Descricao = Console.ReadLine();
                    Console.WriteLine("Digite os Generos dos anime");
                    Console.WriteLine("Obs: Coloque uma virgula para separar os generos");
                    string genero = Console.ReadLine();
                    novoAnime.Genero = genero.Split(",").ToList();
                    await CriarAnimeAsync(novoAnime);
                    break;
            }

        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            throw;
        }
    }

    static  void Main()
    {
        RunAsyinc().GetAwaiter().GetResult();
    }




}