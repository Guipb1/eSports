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

import express from 'express'
import {PrismaClient}from '@prisma/client'
import { convertHoursStringToMinutes } from './utils/convert-hour-string-to-minutes'
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string'

//criando a aplicação
const app = express()
app.use(express.json())
const prisma = new PrismaClient({
    log:['query']
})


//rota para listagem de games 
//findMany - para encontrar todos
app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include:{
            _count:{
                select:{
                    ads:true,
                }
            }
        }
    })

    return response.json(games);
});
 
// rota para criacao de novo anuncio
// utiliza o bodyParams
// sempre for criar um ad precisa informar o id do game
app.post('/games/:id/ads', async(request, response) => {
    const gameId = request.params.id;
    const body: any = request.body;

    const ad = await prisma.ad.create({
        data:{
             gameId,
             name: body.name,
             yearsPlaying: body.yearsPlaying,
             discord: body.discord,
             weekDays: body.weekDays.join(','), //recebo ele como um array mas quero transformar em uma string separada por ,
             hourStart: convertHoursStringToMinutes(body.hourStart),  
             hourEnd: convertHoursStringToMinutes(body.hourEnd),
             useVoiceChannel: body.useVoiceChannel,
        }
    })
    return response.status(201).json(ad);
});

// Listagem de anuncios por game 
//para informar que o id é um parametro coloca o :
app.get('/games/:id/ads', async (request, response) => {
    const gameId =  request.params.id;

    const ads = await prisma.ad.findMany({
        select:{
            id:true,
            name:true,
            weekDays:true,
            useVoiceChannel:true,
            yearsPlaying:true,
            hourStart:true,
            hourEnd:true,
        },
        where:{
            gameId,
        },
        orderBy:{
            createdAt:'desc'
        }
    })
    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),

        }
    }))
});

// Buscar o discord pelo ID do anuncio 
app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;

    const ad = await prisma.ad.findFirstOrThrow({
        select:{
            discord: true,
        },
        where:{
            id:adId,
        }
    })

    return response.json({
        discord: ad.discord,
});
});




app.listen(3333)

