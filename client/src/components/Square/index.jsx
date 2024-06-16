import React, { useState, useContext, useEffect } from 'react'
import style from "./style.module.css"
import DataContext from "../DataContext";
import useSocket from '../../socket';

import X from '../X'
import O from '../O'

export default function Square({ index, setSymbols, symbols, setPlayAgain }) {
  const socket = useSocket()
  const [isMouseDown, setIsMouseDown] = useState(false);
  const { setText, setOpen, player } = useContext(DataContext);
  
  const updated = ({ gameMoves, win }) => {
      if (win) {
        setPlayAgain(true)
        setSymbols(gameMoves);
        setOpen(true)
        setText(win)
      } else {
        setSymbols(gameMoves);
      }
    }
  

  useEffect(() => {
    socket.on("updated", updated);
    return () => {
      socket.off("updated", updated);
    };
  }, []);


  const fetchData = async () => {
    try {
      socket.emit('updateData', { index, socketId: player.socketId, numRoom: player.roomId });
      console.log("updateData at client: ", {index});

    } catch (error) {
      console.error("Error fetching data: ", error?.response);
    }
  };

  function fillSquare() {
    if (!symbols[index]) {
      setIsMouseDown(true);
      fetchData();
    }
  }

  const releaseSquare = () => {
    setIsMouseDown(false);
  };

  return (
    <div className={`${style.square} ${isMouseDown ? style.noBoxShadow : ''}`}
      onMouseDown={fillSquare}
      onMouseUp={releaseSquare}
    >
      {symbols[index] === '' ? null : (symbols[index] === 'X' ? <X /> : <O />)}
    </div>
  );
}
