/**
 * Chat.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	mensaje:{
  		type: 'text',
  		require: true
  	},
  	emisor:{
  		model: 'Usuario',
  		required: true
  	},
  	receptor: {
  		type: 'array',
  		required: true
  	}
  }
};

