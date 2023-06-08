import { useEffect, useState } from "react";
import api from "../../api/api";
import styles from "./cadastro.module.css";

const Cadastro = () => {
  return (
    <>
      <div>
        <form className={styles.form_cadastro}>
          <h2>CADASTRO</h2>
          <input type="text" required />
          <p></p>
          <label htmlFor="">Nome (completo) </label>
          <br />
          <input type="number" required />
          <p></p>
          <label htmlFor="">CPF (apenas números) </label>
          <br />
          <input type="email" required />
          <p></p>
          <label htmlFor="">Email </label>
          <br />
          <input type="password" required />
          <p></p>
          <label htmlFor="">Senha </label>
          <br />
          <input type="password" required />
          <p></p>
          <label htmlFor="">Confirmar Senha </label>
          <br />
          <button>Cadastrar</button>
          <button>Limpar</button>
          <br />
          <br />
          <button className={styles.btn_voltar}>Voltar</button>
          <br />
        </form>
      </div>
    </>
  );
};

export default Cadastro;
