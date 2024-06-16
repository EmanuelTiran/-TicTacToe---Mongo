
import style from "./style.module.css"
import React, { useContext } from 'react';
import DataContext from '../DataContext';
import { useState } from 'react';

export default function Popup() {
    const { text, open, setOpen } = useContext(DataContext);

    const handleOutsideClick = () => {
        setOpen(!open);
    };

    const handleInsideClick = (e) => {
        e.stopPropagation(); 
    };

    return (
        open && (
            <div className={style.outside} onClick={handleOutsideClick}>
                click me!!
                <div className={style.inside} onClick={handleInsideClick}>
                    hello {text}
                </div>
            </div>
        )
    )
}
