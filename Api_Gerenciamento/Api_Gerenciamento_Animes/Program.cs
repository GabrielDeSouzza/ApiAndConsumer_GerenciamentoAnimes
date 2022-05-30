using Api_Gerenciamento_Animes.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add cadeia de conexão do Sql Lite

var connectionString = builder.Configuration.GetConnectionString("Animes") ?? "Data Source=Animes.db";

// Add contexto do serviço

builder.Services.AddSqlite<AnimeDb>(connectionString);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

//Config Sqlite Api methods 

app.MapGet("api/Anime", async (AnimeDb db) =>  await db.Animes.ToListAsync());

app.MapGet("api/Anime/{id}", async (AnimeDb db, int id) =>
{
    var anime = await db.Animes.FindAsync(id);
    if (anime == null)
    {
        return Results.NotFound();
    }

    return Results.Ok(anime);
});

app.MapPost("api/Anime", async (AnimeDb db, Anime anime) =>
{
    await db.Animes.AddAsync(anime);
    await db.SaveChangesAsync();
    return Results.Created($"api/Anime/{anime.Id}", anime);
});

app.MapPut("api/Anime/{id}", async (AnimeDb db, Anime UpdateAnime, int id) =>
{
    var anime = await db.Animes.FindAsync(id);
    if (anime == null)
    {
        return Results.NotFound();
    }
    anime.Ano = UpdateAnime.Ano;
    anime.Descricao = UpdateAnime.Descricao;
    anime.Titulo = UpdateAnime.Titulo;
    anime.Genero = UpdateAnime.Genero;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("api/Anime/{id}", async (AnimeDb db, int id) =>
{
    var anime = await db.Animes.FindAsync(id);
    if (anime == null)
    {
        return Results.NotFound();
    }
    db.Animes.Remove(anime);
    await db.SaveChangesAsync();
    return Results.Ok();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseDefaultFiles();

app.UseStaticFiles();

app.MapControllers();

app.Run();
