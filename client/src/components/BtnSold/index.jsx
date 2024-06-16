import { useState } from 'react';
import Btn from '../Btn';
import style from "./style.module.css"
import { IoReturnUpBack } from "react-icons/io5";

export default function JoinGame() {
    const [inputValue, setInputValue] = useState('');

    const handleJoinClick = () => {
        console.log(inputValue);
        setInputValue(inputValue); // Update the state with the current input value
    };
    const handleCreateGame = () => {
        console.log("");
        setInputValue(inputValue); // Update the state with the current input value
    };

    return (
        <div className={style.joinGame}>
            <div className={style.sqr}>
                <IoReturnUpBack/>
            </div>
            join to a game
            <input
                className={style.input}
                placeholder='enter code game'
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <div onClick={handleJoinClick} >
                <Btn value={'JOIN'} />
            </div>
            <div className={style.lines}>
                <span className={style.line}></span>
                OR
                <span className={style.line}></span>
            </div>
            <div onClick={handleCreateGame} >
                <Btn value={'create a game'} />
            </div>
        </div>
    )
}