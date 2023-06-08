import { useEffect, useState } from "react";
import api from "../../api/api";
import styles from "./login.module.css";

const Login = () => {
  return (
    <>
      <div>
        <form>
          <h3>LOGIN</h3>
          <label htmlFor="">Email: </label>
          <input type="email" required />
          <br />
          <label htmlFor="">Senha: </label>
          <input type="password" required />
          <br />
          <button>Enviar</button>
          <button>Limpar</button>
          <br />
          <br />
          <p>Nao é cadastrado?</p>
          <button className={styles.btn_cadastro}>Clique Aqui</button>
          <br />
        </form>
      </div>
    </>
  );
};

export default Login;
