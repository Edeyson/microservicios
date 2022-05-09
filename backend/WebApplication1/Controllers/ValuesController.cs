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
    public class ValuesController : ControllerBase
    {
        // GET: api/<ValuesController>
        [HttpGet]
        public string Get()
        {
            return "value1";
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ValuesController>
        [HttpPost]
        public string Post([FromBody] JsonElement datos)
        {
            int id = datos.GetProperty("id").GetInt32();
            String name = datos.GetProperty("name").GetString();
            String password = datos.GetProperty("password").GetString();
            usuarios u = new usuarios(id, name, password);
            u.conectar();
            string m = u.ingresar();
            return m;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
