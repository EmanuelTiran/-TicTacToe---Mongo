import { useState } from 'react';

import style from "./style.module.css"

import { axiosReq } from '../apiReq'
import X from '../X';
import O from '../O';
// import { useNavigate } from "react-router-dom";

export default function ChoiceSymbol() {
    const [symbols, setSymbols] = useState(Array(9).fill(''));

    return (<div className={style.boardGame}>
        choose player
        <div className={style.board}>
            <div className={style.square}><X /></div>
            <div className={style.square}><O /></div>
        </div>
    </div>
    );
}

