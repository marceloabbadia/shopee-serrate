import { useEffect, useState } from "react";
import api from "../../api/api";
import styles from "./login.module.css";

const Login = () => {
  return (
    <>
      <div>
        <form className={styles.form_login}>
          <h3>LOGIN</h3>
          <input type="email" required />
          <p></p>
          <label htmlFor="">Email: </label>
          <br />
          <input type="password" required />
          <p></p>
          <label htmlFor="">Senha: </label>
          <br />
          <button>Enviar</button>
          <button>Limpar</button>
          <br />
          <br />
          <p>Nao é cadastrado?</p>
          <button className={styles.btn_cadastro}>Cadraste-se</button>
          <br />
        </form>
      </div>
    </>
  );
};

export default Login;
