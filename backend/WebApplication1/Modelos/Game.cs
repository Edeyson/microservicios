using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Npgsql;// Libreria



namespace WebApplication1.Modelos
{
    public class Game
    {
        int id { get; set; }
        String score { get; set; }
        String date { get; set; }
        int id_player { get; set; }

        public Game( String score, String date, int id_player)
        {
            this.score = score;
            this.date = date;
            this.id_player = id_player;
        }

        NpgsqlConnection cone;

        public void conectar()
        {
            this.cone = new NpgsqlConnection("server=127.0.0.1;User Id=user40; Password=316410;Database=microservices");
            this.cone.Open();
        }


        public String ingresar()
        {
            try
            {
                NpgsqlCommand cmd = new NpgsqlCommand();
                string sql = "INSERT INTO game VALUES('" + this.score + "','" + this.date + "'," + this.id_player + ")";
                new NpgsqlCommand(sql, this.cone).ExecuteNonQuery();
                return "Juego guardado";
            }
            catch (Exception E)
            {
                return "Error, duplicacion " + E;
            }
        }



        public String listar()
        {
            String mensaje = "";
            String sql = "";
            try
            {

                NpgsqlCommand cmd = new NpgsqlCommand();

                sql = "select * from game where id_player="+this.id_player;

                var reader = new NpgsqlCommand(sql, this.cone).ExecuteReader();
                var allgames = new List<dynamic>();

                while (reader.Read())
                {
                    dynamic juegos = new ExpandoObject();
                    juegos.score = reader.GetString(0);
                    juegos.date = reader.GetString(1);
                    juegos.id = reader.GetInt32(3);
                    
                    allgames.Add(juegos);
                }
                string Json = JsonConvert.SerializeObject(allgames);

                reader.Close();

                return Json;
            }
            catch (Exception E)
            {
                mensaje = "Error" + E;
            }

            return mensaje;
        }



    }
}
