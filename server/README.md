# Back-end

## Entidades 

### Game - (entidade) 
   -id
   -title
   -bannerUrl 

### Ad - (entidade) 
   -id
   -gameId
   -name
   -yearsPlaying
   -discord
   -weekDays
   -hourStart
   -hourEnd
   -useVoiceChannel
   -createdAt

## Casos de Uso - 
    - Listagem de games com contagem de anuncios
    - Criação de novo anuncio 
    - Listagem de anuncios por game (Mobile)
    - Buscar discord pelo ID do anuncio (Mobile)

## Banco de dados usado - 
    - Sqlite (banco relacional)
    - Knex (query builder) = escreve codigos js e depois é convertido para sql
    - Prisma (ORM)  = Faz uma relacao das tabelas do banco de dados com as classes do js e typescript

## Tecnologias utilizadas 
    - react
    - React Native
    - Node
    - Expo