# ApiAndConsumer_GerenciamentoAnimes

Este reposítorio tem por objetivo fazer uma implementação de uma Api que gerencia um App/Site de Animes além de consumi-la
em um ambiente de uma aplicação Web.

# Obs:
Quando você fazer o download desse repositório é necessário executar a Api primeiro 
para depois executar o consumidor da Api e também deve certificar-se que em qual porta LocalHost a 
api está rodando e em caso de algum erro basta ir na pasta "ConsumirApiAnime" abrir o arquivo "Program.cs" 
e localizar a classe "RunAsync" e mudar o número da porta localhost para o número da porta que está
rodando no seu PC.
Exemplo:  
    static async Task RunAsync()
    {
        client.BaseAddress = new Uri("https://localhost:1234/");
        ...
    }
