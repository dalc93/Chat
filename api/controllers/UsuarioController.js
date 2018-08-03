/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addUsuario: function(req, res){
		var data_client = req.params.all();
		console.log('En addUsuario');
		Usuario.create({
			nombre:data_client.nombre, 
			email:data_client.email
		}).exec(function (err){
			if(err)
			{
				console.log("error al insertar usuario");
			}
			else
			{
				console.log("usuario insertado");
			}
		});
	},
	findUsuario: function(req, res)
	{		
		var data_client = req.allParams();
		
		Usuario.find({
			nombre: data_client.nombre,
			email: data_client.email
		}).exec(function(err, usuario){
			if(err){
				return res.serverError(err);
			}
			
			console.log("nombre: ", usuario);
			return res.json(usuario);
		});			    
	},
	agregarAmigo:function(req, res){
		var data_client = req.allParams();
		console.log(data_client.nombre);
		Usuario.find({
			nombre: data_client.nombre
		}).exec(function(err, usuario){
			if(err)
			{
				return res.serverError(err);
			}
			console.log("nombre: ", usuario[0].nombre);
			var am = usuario[0].amigos + 'pepe#';
			Usuario.update({nombre: data_client.nombre}, {amigos: am})
			.exec(function afterwards(err, updated){
			  if (err) {
			    // handle error here- e.g. `res.serverError(err);`
			    return;
			  }
			});
			return res.json(usuario);
		})
	},
	listarAmigos:function(req, res)
	{
		var data_client = req.allParams();
		
		Usuario.find({
			nombre: data_client.nombre,
			email: data_client.email
		}).exec(function(err, usuario){
			if(err){
				return res.serverError(err);
			}
			
			console.log("nombre: ", usuario);
			return res.json(usuario);
		});	
	}
};

