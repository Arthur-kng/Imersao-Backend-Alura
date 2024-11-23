import express from "express"
import routes from "./src/routes/postRoutes.js";
// console.log(process.env.STRING_CONEXAO) // Util para depuração //Função de teste usada na Aula 03 - Por segurança não é recomendada seu uso expondo dados sensíveis.

// **Conecta ao banco de dados:**
// A função conectarAoBanco é responsável por estabelecer a conexão com o MongoDB. O resultado da conexão é armazenado na variável conexao.

const app = express(); 
app.use(express.static("uploads")) //Abre essa para para servir serviços estáticos
routes(app);
// **Inicia o servidor na porta 3000:**
app.listen(3000, () => { // O servidor Express começa a ouvir requisições na porta 3000.
     console.log("Servidor Escutando ...");
});

//Aulas 01 e 02 da Imersão - Segmentos que não serão mais usados
/*const posts = [
    {
      id: 0,
      descricao: "Um circuito integrado microscópico",
      imagem: "https://placecats.com/millie/300/150"
    },
    {
      id: 1,
      descricao: "Um drone sobrevoando uma cidade",
      imagem: "https://placecats.com/millie/300/150" 
    },
    {
      id: 2,
      descricao: "Um computador quântico (visualização artística)",
      imagem: "https://placecats.com/millie/300/150"   
    },
    {
      id: 3,
      descricao: "Um cockpit de avião",
      imagem: "https://placecats.com/millie/300/150"
    },
    {
      id: 4,
      descricao: "Um servidor de dados em um data center",
      imagem: "https://placecats.com/millie/300/150"
    },
    {
      id: 5,
      descricao: "Um foguete sendo lançado",
      imagem: "https://placecats.com/millie/300/150"
    }
  ];
function buscarPostPorId(id){
    return posts.findIndex((post)=>{
        return post.id === Number(id);
    });
}
app.get("/posts/:id", (req,res)=> { 
    const index = buscarPostPorId(req.params.id )
    res.status(200).json(posts[index]);
});*/