import React, {  useState } from 'react'
import style from "./style.module.css"

export default function Btn({value}) {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const releaseSquare = () => {
        setIsMouseDown(!isMouseDown);
      };
  return (<>
    <div className={`${style.btn} ${isMouseDown ? style.noBoxShadow : ''}`}
    onMouseDown={releaseSquare}
    onMouseUp={releaseSquare}
    >
    <span className={`${style.left} ${isMouseDown ? style.noBoxShadow : ''}`}></span>
        {value}
        <span className={`${style.right} ${isMouseDown ? style.noBoxShadow : ''}`}></span>
    </div>
    </>
  )
}
