/**
 * Usuario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	nombre: {
  		type: 'String',
  		required: true,
  		unique: true
  	},
  	email: {
  		type: 'String',
  		required: true,
  		unique: true
  	},
    amigos:{
      type: 'text'
    }
  }
};

