//Rotas de Acesso do sistema - navegador
import express from "express";
import multer from "multer";
import cors from "cors"; // Gerenciador de referência cruzada
import { listarPosts, postarNovoPost, uploadImage, updateNewPost } from "../controllers/postControllers.js";

const corsOptions = {
    origin: "http://localhost:8000", 
    optionsSuccessStatus: 200
}
//Multer é um middleware
const storage = multer.diskStorage({// Código específico para o multer dentro do WINDOWS lidar com o arquivo sem que ele mude de nome
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
    
const upload = multer({ dest: "./uploads" , storage}) //Cria a pasta onde estarão os arquivos de upload do sistema | no Windows a pasta precisa ser criada manualmente
// const uploads = multer({dest: "./uploads"}) //Para Linux e MacOs

const routes = (app) => {
    // **Configura o middleware para interpretar requisições JSON:**
    app.use(express.json()); // Essencial para trabalhar com dados enviados no formato JSON.
    app.use(cors(corsOptions))
    // **Rota GET para buscar todos os posts:**
    //Rota de Acesso função.verbohttp("rota", )
    app.get("/posts", listarPosts); //Rota para fazer a leitura de dados -GET
    app.post("/posts", postarNovoPost); // Rota de envio de dados - POST
    app.post("/posts/upload", upload.single("imagem"), uploadImage); //Rota de acesso para envio de imagens com o multer - POST
    app.put("/posts/upload/:id", updateNewPost)
}

export default routes;
