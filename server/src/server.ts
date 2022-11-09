import express from 'express'

//criando a aplicação
const app = express()

//1 parametro do get é o /endereco, 2 parametro é uma funcao que vai executar assim que ehtrar nesse endereco
// request serve para buscar informacoes que estao vindo da requisicao e o respose serve para devolver uma resposta
app.get('/ads', (request, response) => {
    return response.json([
        {id: 3, name: 'Anuncio 1' },
        {id: 2, name: 'Anuncio 2' },
        {id: 3, name: 'Anuncio 3' },
        {id: 4, name: 'Anuncio 4' },
        {id: 5, name: 'Anuncio 5' },
    ])
})

app.listen(3333)

