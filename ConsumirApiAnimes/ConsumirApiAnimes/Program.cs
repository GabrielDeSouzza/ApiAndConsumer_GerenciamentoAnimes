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
        if(anime == null)
        {

            return;
        }

        Console.WriteLine($"Id:{anime.Id}");
        Console.WriteLine($"Anime:{anime.Titulo}");
        Console.WriteLine($"Genero:{anime.Genero}");
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
        else
        {
            Console.WriteLine("Anime não encontrado!!!");
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

    static async Task<HttpStatusCode> DeleteAnimeAsync(int id)
    {
        HttpResponseMessage response = await client.DeleteAsync($"api/Anime/{id}");
        return response.StatusCode;
    }

    static async Task RunAsync()
    {
        client.BaseAddress = new Uri("https://localhost:7128/");
        client.DefaultRequestHeaders.Accept.Clear();
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        Inicio:
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
                    var anime = await GetAnimeAsync("api/Anime");
                    if (anime != null)
                    {
                        foreach (Anime animes in anime)
                        {
                            MostrarAnime(animes);
                            Console.WriteLine("\n");
                        }
                    }
                    else
                    {
                        Console.WriteLine("Nenhum anime encontrado");
                    }
                    Console.WriteLine("\n\n\n");
                    goto Inicio;
                    
                    break;
                case 2:
                    Console.WriteLine("Digite o Id do anime desejado");
                    int id = int.Parse(Console.ReadLine());
                    Anime animeById = await GetAnimeByIDAsync("api/Anime", id);
                    MostrarAnime(animeById);
                    Console.WriteLine("\n\n\n");
                    goto Inicio;
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
                    novoAnime.Genero = genero;
                    await CriarAnimeAsync(novoAnime);
                    Console.WriteLine("Anime Adicionado\n\n\n");
                    goto Inicio;

                    break;
                case 4:
                    Console.WriteLine("Digite o ID do anime a ser atualizado");
                    int idUpdate= int.Parse(Console.ReadLine());
                    Anime animeUp = await GetAnimeByIDAsync("api/Anime", idUpdate);
                    if (animeUp != null)
                    {
                        Console.WriteLine("Digite o nome/titulo do anime");
                        animeUp.Titulo = Console.ReadLine();
                        Console.WriteLine("Digite o ano de lançamento");
                        animeUp.Ano = int.Parse(Console.ReadLine());
                        Console.WriteLine("Digite uma descrição do anime");
                        animeUp.Descricao = Console.ReadLine();
                        Console.WriteLine("Digite os Generos dos anime");
                        Console.WriteLine("Obs: Coloque uma virgula para separar os generos");
                        string generoUp = Console.ReadLine();
                        animeUp.Genero = generoUp;
                        await AtualizarAnimeAsync(animeUp);
                        Console.WriteLine("Anime Atualiado\n\n\n");
                        goto Inicio;
                    }
                    else
                    {
                        Console.WriteLine("Id invalido, tente novamente\n\n\n");
                        goto Inicio;
                    }
                    break;
                case 5:
                    Console.WriteLine("Digite o Id do anime a ser excluido");
                    int idDel = int.Parse(Console.ReadLine());
                    var animeDel = await GetAnimeByIDAsync("api/Anime", idDel);
                    Console.WriteLine($"Você está excluindo {animeDel.Titulo}");
                    Console.WriteLine( await DeleteAnimeAsync(idDel));
                    Console.WriteLine("Anime deletado\n\n\n");
                    goto Inicio;
                    break;
                default:
                    Console.WriteLine("Tente novamente");
                    goto Inicio;
                    break;

            }

        }
        catch (FormatException e)
        {
            Console.WriteLine("Caractere invalido tente novamente\n\n\n");
            goto Inicio;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            throw;
        }
    }

    static  void Main()
    {
        RunAsync().GetAwaiter().GetResult();
    }




}