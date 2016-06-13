'use strict'

//REQUIRE Modulo Mongoose
const mongoose = require('mongoose');

//CRIA string de endereço do Banco de dados(BD)
let uriConnection = 'mongodb://localhost:27017/nodeAuthentication';

//INICIA conexão com BD
mongoose.connect(uriConnection);

mongoose.connection
	.on('connected', () =>{
		console.log('Conectado com sucesso!');
	})
	.on('erro', (err) => {
		console.log('Erro na conexão: ', err);
	})
	.on('disconnected', () =>{
		console.log('Disconectado com o Banco de Dados!');
	})
	.on('open', () =>{
		console.log('Conexão aberta');
	});

process.on('SIGINT', () =>{
	mongoose.connection.close(() =>{
		console.log('Finalização da conexão com o Banco de Dados')
	});
});
