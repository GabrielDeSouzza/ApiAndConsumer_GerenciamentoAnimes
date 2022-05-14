using Api_Gerenciamento_Animes.Models;
using Api_Gerenciamento_Animes.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api_Gerenciamento_Animes.Controllers
{
    /*[ApiController]
    [Route("api/[controller]")]*/

    
    public class AnimeController : ControllerBase
    {
        public AnimeController() { }

        [HttpGet]
        public ActionResult<List<Anime>> getAll()
        {

            return AnimeService.GetAll();
        }

       /* [HttpGet("{id}")]
        public ActionResult<Anime> Get(int id)
        {
            var anime = AnimeService.Get(id);
            if(anime == null)
                return NotFound();
            return anime;
        }

        [HttpPost]
        public IActionResult Create(Anime anime)
        {
            AnimeService.Add(anime);
            return Ok(anime);
            //return CreatedAtAction(nameof(Anime), new{id = anime.Id }, anime);
        }
       

        
        [HttpPut]
        public IActionResult Update(int id, Anime anime)
        {
            
            if(id != anime.Id)
            {
                return BadRequest();
            }
            var existingAnime = AnimeService.Get(id);
            if(existingAnime is null)
            {
                return NotFound();
            }
            AnimeService.Update(anime);
            return NoContent();
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var anime = AnimeService.Get(id);
            if(anime is null)
            {
                return NotFound();
            }
            AnimeService.Delete(id);
            return NoContent();
        }*/
    }
}
