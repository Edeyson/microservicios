using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;//libreria cor
using System.Text.Json;
using System;
using WebApplication1.Modelos;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]//libreria cors
    [ApiController]
    public class ValuesController_game : ControllerBase
    {
        // GET: api/<ValuesController_game>
        [HttpGet]
        public string Get()
        {
            return "values";
        }

        // GET api/<ValuesController_game>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            Game g = new Game("", "", id);
            g.conectar();
            var lista = g.listar();
            return lista;
        }

        // POST api/<ValuesController_game>
        [HttpPost]
        public string Post([FromBody] JsonElement datos)
        {
            
            String score = datos.GetProperty("score").GetString();
            String date = datos.GetProperty("date").GetString();
            int id_player = datos.GetProperty("id_player").GetInt32();
            Game g = new Game( score, date, id_player);
            g.conectar();
            string m = g.ingresar();
            return m;
        }


        // PUT api/<ValuesController_game>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController_game>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
