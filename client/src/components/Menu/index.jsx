import React from 'react'
import style from "./style.module.css"
import Btn from '../Btn'

import { useNavigate } from "react-router-dom";

export default function Menu() {
    const navigate = useNavigate();

    return (

        <div className={style.menu}>
            <img className={style.img} src="/img/LogoSmall.svg" alt="" />
            <div className={style.btns}>
                <Btn value={"play solo"} />
                <div
                    onClick={() => navigate("/joinGame")}

                > <Btn value={"play with a friend"} /></div>
            </div>
        </div>
    )
}
