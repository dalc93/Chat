/**
 * AmigoController
 *
 * @description :: Server-side logic for managing amigoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	buscarAmigos: function(req, res){
		var data_client = req.params.all();

		Amigo.find({
			idUsuarioUno: data_client.id
		})
		.exec(function(err, amigos){
			if(err){
				return res.serverError(err);
			}
			console.log("amigos::: " , amigos);
			res.json(amigos);					
		});
	},
	agregarAmigo: function(req, res)	{
		var data_client = req.params.all();
	}
};

