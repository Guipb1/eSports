import { MagnifyingGlassPlus } from "phosphor-react";
import "./styles/main.css";
import logoImg from "./assets/logo-nlw-esports.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";


interface Game { // para indicar qual o formato da informacao que eu vou salvar no estado, que é o formato que é retornado na api
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number;
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data) // salvando a lista de games no estado
      })
  }, [])





  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>
        está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => { // mostrar um banner de game para cada game da api, map = percorre um array e retorna algo
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>

      <CreateAdBanner />


    </div>
  );
}

export default App;
