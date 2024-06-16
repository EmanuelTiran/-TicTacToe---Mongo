import React from "react";
import { useEffect } from "react";

import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("menu");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (<div
    className={styles.welcome}
  >

    <img
      className={styles.img}
      onClick={() => navigate("playboard")}
      src="/img/Welcome.svg"
      alt="Welcome.svg"
      />
      </div>
  );
}