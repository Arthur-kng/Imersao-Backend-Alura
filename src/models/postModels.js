//Camada que cuida dos modelos de dados -- Nesse caso interage com o MongoDB
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)
// **Função assíncrona para buscar todos os posts:**
//defaut só pode ser usado quando existe somente uma função que será exportada
export  async function getTodosPosts(){ // Conecta ao banco de dados, seleciona a coleção "posts" e retorna todos os documentos.
    const db = conexao.db("Imersao-Backend");
    const colecao = db.collection("posts");
    return colecao.find().toArray(); //"find" é o comando de encontrar dentro do banco
}

export async function criarPost(novoPost){
    const db = conexao.db("Imersao-Backend"); // Define qual é o Banco de Dados que será acessado
    const colecao = db.collection("posts"); // Define a coleção de dados dentro do Banco (equiavalente a table no mysql por exemplo)
    return colecao.insertOne(novoPost); //"insertOne" comando definindo pelo MongoDB para a inserção de dados
}

export async function updatePost(id, novoPost){
    const db = conexao.db("Imersao-Backend"); // Define qual é o Banco de Dados que será acessado
    const colecao = db.collection("posts"); // Define a coleção de dados dentro do Banco (equiavalente a table no mysql por exemplo)
    const objID = ObjectId.createFromHexString(id); //Pega o parãmetro id recebido e escreve ele em um formato que o MongoDb entenda
    return colecao.updateOne({_id: new ObjectId(objID)},{$set:novoPost} ); //"updateOne" comando definindo pelo MongoDB para a inserção de dados
}