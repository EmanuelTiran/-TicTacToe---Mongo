import { useContext, useEffect, useState } from "react";
import DataContext from "../DataContext";

import style from "./style.module.css";
import Square from "../Square";
import Btn from "../Btn";
import useSocket from "../../socket";

// import { useNavigate } from "react-router-dom";

export default function Board() {
  const [symbols, setSymbols] = useState(Array(9).fill(""));
  const [playAgain, setPlayAgain] = useState(false);
  const { player } = useContext(DataContext);
  const socket = useSocket();

  // const navigate = useNavigate();

  const backToWelcome = async () => {
    // navigate("chooseplayer");
  };

  const updatedGame = ({ gameMoves }) => {
    setSymbols(gameMoves);
    setPlayAgain(false);
  };

  useEffect(() => {
    socket.on("updatedNew", updatedGame);
    return () => {
      socket.off("updatedNew", updatedGame);
    };
  }, []);

  const newGame = async () => {
    try {
      socket.emit("newGame", player.roomId);
    } catch (error) {
      console.log(error);
      console.error("Error fetching data: ", error?.response);
    }
  };

  return (
    <div className={style.boardGame}>
      <div>
        <div className={style.borderTop}></div>
        <div className={style.container}></div>
        <div className={style.borderBottom}></div>
      </div>
      <div className={style.board}>
        {symbols &&
          symbols.map((value, index) => (
            <Square
              key={index}
              index={index}
              setSymbols={setSymbols}
              symbols={symbols}
              setPlayAgain={setPlayAgain}
            />
          ))}
      </div>

      {playAgain && (
        <div onClick={newGame}>
          <Btn value={"play again"} />
        </div>
      )}
      {!playAgain && (
        <div onClick={backToWelcome}>
          <Btn value={"back"} />
        </div>
      )}
    </div>
  );
}
