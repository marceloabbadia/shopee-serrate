import { useState } from "react";
import api from "../../api/api";
import styles from "./login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [emailLogin, setEmailLogin] = useState([]);
  const [senhaLogin, setSenhaLogin] = useState([]);

  const handleChangeEmailLogin = (e) => {
    setEmailLogin(e.target.value);
  };

  const handleChangeSenhaLogin = (e) => {
    setSenhaLogin(e.target.value);
  };

  const handleSubmitFormLogin = (e) => {
    e.preventDefault();

    if (emailLogin === "" || senhaLogin === "") {
      alert("Não é possível logar com um campo vazio");
    } else {
      let listaUsuarios = [];

      let userValid = {
        email: "",
        senha: "",
      };

      listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));

      listaUsuarios.forEach((item) => {
        if (emailLogin == item.Email && senhaLogin == item.Senha) {
          userValid = {
            email: item.email,
            senha: item.senha,
          };
        }
      });

      if (userValid.email == "" || userValid.senha == "") {
        alert("Senha ou login inválidos!");
        resetarFormLogin();
      } else {
        let token =
          Math.random().toString(16).substring(2) +
          Math.random().toString(16).substring(2);
        localStorage.setItem("token", token);
        alert("Seu token foi validado e voce será redirecionado!");
        resetarFormLogin();
      }
    }
  };

  const resetarFormLogin = () => {
    setEmailLogin("");
    setSenhaLogin("");
  };

  return (
    <>
      <div>
        <form className={styles.form_login} onSubmit={handleSubmitFormLogin}>
          <h3>LOGIN</h3>
          <input
            value={emailLogin}
            type="email"
            required
            onChange={handleChangeEmailLogin}
          />
          <p></p>
          <label htmlFor="emailLogin">Email: </label>
          <br />
          <input
            value={senhaLogin}
            type="password"
            required
            onChange={handleChangeSenhaLogin}
          />
          <p></p>
          <label htmlFor="senhaLogin">Senha: </label>
          <br />
          <button type="submit">Entrar</button>
          <button type="reset" onClick={resetarFormLogin}>
            Limpar
          </button>
          <br />
          <br />
          <p>Nao é cadastrado?</p>
          <Link to="/cadastro">
            <button className={styles.btn_cadastro}>Cadraste-se</button>
          </Link>

          <br />
        </form>
      </div>
    </>
  );
};

export default Login;
