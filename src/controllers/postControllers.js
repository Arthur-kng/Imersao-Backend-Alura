import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";
import {getTodosPosts, criarPost, updatePost} from "../models/postModels.js"; //Chama as funções de dentro do postModels

export async function listarPosts(req,res) {// Quando uma requisição GET for feita para a rota "/posts", esta função será executada.
    const resultados = await getTodosPosts()// Busca todos os posts
    res.status(200).json(resultados);// Envia os resultados como resposta em formato JSON)
}
//Função Associada a rota sempre vai ter os parâmetros req para receber a requisição e res para devolver a resposta a quem fez o pedido
export async function postarNovoPost(req, res){
    const novoPost = req.body;  //Toda Requisição tem um cabeçalho (header) e quando vamos enviar conteúdos ele vai dentro do corpo da requisição (body)
    //Tratamento de Excessões - Evitar que o sistema trave caso a tarefa não tenha sucesso
    try{ // Tenta realizar a tarefa
        const postCriado = await criarPost(novoPost); //await é a ferramenta de sincronização dentro da função
        res.status(200).json(postCriado);// Envia os resultados como resposta em formato JSON) -- A resposta sempre depende de onde está vindo os dados
    }catch(erro){ // Tratativa quando o try resulta em erro
        console.error(erro.message); // Existe diversos tipos de console como log, error, table ... | o objeto do catch sempre tem o .message
        res.status(500).json({"Erro":"Falha na Requisição"}); // Feedback genérico no retorno da mensagem, muitos detalhes no retorno da falha de requisição é uma falha de segurança!
        // 500 - Erro genérico do Servidor
    }
}

export async function uploadImage(req, res){
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };  //Toda Requisição tem um cabeçalho (header) e quando vamos enviar conteúdos ele vai dentro do corpo da requisição (body)
    //Tratamento de Excessões - Evitar que o sistema trave caso a tarefa não tenha sucesso
    try{ // Tenta realizar a tarefa
        const postCriado = await criarPost(novoPost); //await é a ferramenta de sincronização dentro da função
        const imagemAtualizada = `uploads/post${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);// Envia os resultados como resposta em formato JSON) -- A resposta sempre depende de onde está vindo os dados
    }catch(erro){ // Tratativa quando o try resulta em erro
        console.error(erro.message); // Existe diversos tipos de console como log, error, table ... | o objeto do catch sempre tem o .message
        res.status(500).json({"Erro":"Falha na Requisição"}); // Feedback genérico no retorno da mensagem, muitos detalhes no retorno da falha de requisição é uma falha de segurança!
        // 500 - Erro genérico do Servidor
    }
}

export async function updateNewPost(req, res){
    const id = req.params.id;
    const urlImage = `http://localhost:3000/post${id}.png`
    //Tratamento de Excessões - Evitar que o sistema trave caso a tarefa não tenha sucesso
    try{ // Tenta realizar a tarefa
        const imageBuffer = fs.readFileSync(`uploads/post${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer)
        const Post = {
            descricao: descricao,
            imgUrl: urlImage,
            alt: req.body.alt
        };
        const postCriado = await updatePost(id, Post)
        res.status(200).json(postCriado);// Envia os resultados como resposta em formato JSON) -- A resposta sempre depende de onde está vindo os dados
    }catch(erro){ // Tratativa quando o try resulta em erro
        console.error(erro.message); // Existe diversos tipos de console como log, error, table ... | o objeto do catch sempre tem o .message
        res.status(500).json({"Erro":"Falha na Requisição"}); // Feedback genérico no retorno da mensagem, muitos detalhes no retorno da falha de requisição é uma falha de segurança!
        // 500 - Erro genérico do Servidor
    }
}