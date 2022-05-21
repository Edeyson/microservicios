using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Npgsql;// Libreria



namespace WebApplication1.Modelos





{
    public class usuarios
    {
        int id { set; get; }
        String name { set; get; }
        int age { set; get; }

        String password { set; get; }
        int [] game { set; get; }

        String rol {get; set; } 
        public usuarios(int id, String name, String password, int age)
        {
            this.id = id;
            this.name = name;
            this.password = password;
            this.age = age;
            this.rol = rol;
        }

        public usuarios()
        {
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
                string sql = "INSERT INTO usuario VALUES("+this.id + ",'" + this.name + "','" + this.password + "'," + this.age + ", 'user_admin')";
                new NpgsqlCommand(sql,this.cone).ExecuteNonQuery();
                return "Datos guardados:)";
            }
            catch (Exception E)
            {
                return "Error, verificar(Si es llave duplicada ,o" +
                    "erro  " + E;
            }
        }

        public Boolean loggin()
        {
            try
            {
                NpgsqlCommand cmd = new NpgsqlCommand();
                String sql = "SELECT * FROM usuario WHERE id=" + this.id + "AND password = '" + this.password + "';";
                new NpgsqlCommand(sql, this.cone).ExecuteNonQuery();
                return true;
             }
            catch(Exception e)
            {
                String p = ("mensaje "+e);
                return false;
            }
        }

        public String eliminar()
        {
            String mensaje = "";
            try
            {
                NpgsqlCommand cmd = new NpgsqlCommand();
                string sql = "delete from usuarios where cedula='" + this.id + "';";
                cmd = new NpgsqlCommand(sql, this.cone);
                cmd.ExecuteNonQuery();
                mensaje = "se elimino con exito";

            }
            catch (Exception E)
            {
                mensaje = "" + E;
            }
            return mensaje;
        }


        public String modificar()
        {
            String mensaje = "";
            try
            {
                NpgsqlCommand cmd = new NpgsqlCommand();
                string sql = "update usuarios set nombre='" + this.name + "', age=" + this.age + ", password='" + this.password +"' where cedula=" + this.id + ";";

                cmd = new NpgsqlCommand(sql, this.cone);
                cmd.ExecuteNonQuery();
                mensaje = "se actualizó con exito";

            }
            catch (Exception E)
            {
                mensaje = "" + E;
            }
            return mensaje;
        }

        public String listar()
        {
            String mensaje = "";
            String sql = "";
            try
            {

                NpgsqlCommand cmd = new NpgsqlCommand();
                if (id != 0)
                    sql = "select * from usuarios where ced = '" + id + "'";
                if (id == 0)
                    sql = "select * from usuarios";

                var reader = new NpgsqlCommand(sql, this.cone).ExecuteReader();
                var todoslosusuarios = new List<dynamic>();

                while (reader.Read())
                {
                    dynamic usuarios = new ExpandoObject();
                    usuarios.cedula = reader.GetString(0);
                    usuarios.nombre = reader.GetString(1);
                    usuarios.pass = reader.GetString(2);
                    usuarios.edad = reader.GetInt64(3);
                    usuarios.rol = reader.GetString(4);
                    todoslosusuarios.Add(usuarios);
                }
                string Json = JsonConvert.SerializeObject(todoslosusuarios);

                reader.Close();

                return Json;
            }
            catch (Exception E)
            {
                mensaje = "Error" + E;
            }

            return mensaje;
        }

        public String consultar()
        {
            String mensaje = "";
            try
            {
                NpgsqlCommand cmd = new NpgsqlCommand();
                string sql = "select * from usuarios";
                cmd = new NpgsqlCommand(sql, this.cone);
                cmd.ExecuteNonQuery();
                mensaje = "usuarios";

            }
            catch (Exception E)
            {
                mensaje = "" + E;
            }
            return mensaje;
        }


    }

}





