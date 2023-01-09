/**
 1 parametro do get é o /endereco, 2 parametro é uma funcao que vai executar assim que ehtrar nesse endereco
 request serve para buscar informacoes que estao vindo da requisicao e o respose serve para devolver uma resposta

 HTTP methods / API RESTfull
 GET - leitura de objetos, listagem , busca
POST - Criando algo 
 PUT - editando por completo algo (perfil)
 PATCH - editar uma info expecifica 

 PARAMETROS
     Query-  vem atraves do ?, exemplo: localhost:3333/ads?page=2, 
             para persitir o estado atual que a pagina se encontra no momento
             usado em fitros ordenacao paginacao
             fica disponivel na url 
             nao utiliza para infos importantes
             sempre sao nomeados 
    
    Route-  tbm ficam na url
            exemplo: localhost:3333/ads/5
            nao sao nomeados
            usado para identificacao de um recurso
    
    Body-   Quando envia varias infos em uma requisicao = formulario
            nao fica na url
            usado para infos sensiveis como senhas
**/

import express, { request, response } from 'express'

//criando a aplicação
const app = express()


//rota para listagem de games 
app.get('/games',(request, response) => {
    return response.json([]);
});
 
// rota para criacao de novo anuncio
app.post('/ads',(request, response) => {
    return response.json([]);
});

// Listagem de anuncios por game 
//para informar que o id é um parametro coloca o :
app.get('/games/:id/ads', (request, response) => {
    return response.json([
        {id: 3, name: 'Anuncio 1' },
        {id: 2, name: 'Anuncio 2' },
        {id: 3, name: 'Anuncio 3' },
        {id: 4, name: 'Anuncio 4' },
        {id: 5, name: 'Anuncio 5' },
    ]);
});

// Buscar o discord pelo ID do anuncio 
app.get('/ads/:id/discord', (request, response) => {
    return response.json([
        
    ]);
});




app.listen(3333)

