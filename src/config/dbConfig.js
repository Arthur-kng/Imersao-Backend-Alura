import { MongoClient } from 'mongodb';

export default async function conectarAoBanco(stringConexao){
    let mongoClient

    try{
        mongoClient = new MongoClient(stringConexao);
        console.log('Conectado ao cluste do banco de dados...');
        await mongoClient.connect();
        console.log('Contectado ao MongoDB Atlas com Sucesso!');

        return mongoClient; 
    } catch (erro){
        console.error('Falha na conexão com o Banco!', erro);
        process.exit();
    }
}