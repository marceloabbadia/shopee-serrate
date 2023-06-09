import { useState } from "react";
import api from "../../api/api";
import styles from "./cadastro.module.css";
import { Link } from "react-router-dom";

const Cadastro = () => {
  const [nome, setNome] = useState([]);
  const [cpf, setCpf] = useState([]);
  const [telefone, setTelefone] = useState([]);
  const [email, setEmail] = useState([]);
  const [senha, setSenha] = useState([]);
  const [confSenha, setConfSenha] = useState([]);

  const handleChangeNome = (e) => {
    setNome(e.target.value);
  };
  const handleChangeCpf = (e) => {
    setCpf(e.target.value);
  };

  const handleChangeTelefone = (e) => {
    setTelefone(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeSenha = (e) => {
    setSenha(e.target.value);
  };

  const handleChangeConfSenha = (e) => {
    setConfSenha(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (senha != confSenha) {
      alert("Senha e confirmacao de senha nao sao iguais, tente novamente!");
      setSenha("");
      setConfSenha("");
    } else {
      let listaUsuarios = JSON.parse(
        localStorage.getItem("listaUsuarios") || "[]"
      );
      listaUsuarios.push({
        Nome: nome,
        Cpf: cpf,
        Telefone: telefone,
        Email: email,
        Senha: senha,
      });

      localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));

      alert("Usuario cadastrado com sucesso!");

      resetarForm();
    }
  };

  const resetarForm = () => {
    setNome("");
    setCpf("");
    setTelefone("");
    setEmail("");
    setSenha("");
    setConfSenha("");
  };

  return (
    <>
      <div>
        <form className={styles.form_cadastro} onSubmit={handleSubmitForm}>
          <h2>CADASTRO</h2>

          <input
            value={nome}
            type="text"
            id="nome"
            required
            onChange={handleChangeNome}
          />
          <p></p>
          <label htmlFor="nome">Nome e Sobrenome </label>
          <br />
          <input
            value={cpf}
            type="number"
            id="cpf"
            required
            onChange={handleChangeCpf}
          />
          <p></p>
          <label htmlFor="cpf">CPF (apenas números) </label>
          <br />
          <input
            value={telefone}
            type="number"
            id="telefone"
            required
            onChange={handleChangeTelefone}
          />
          <p></p>
          <label htmlFor="telefone">Telefone </label>
          <br />
          <input
            value={email}
            type="email"
            id="email"
            required
            onChange={handleChangeEmail}
          />
          <p></p>
          <label htmlFor="email">Email </label>
          <br />
          <br />
          <input
            value={senha}
            type="password"
            id="senha"
            required
            onChange={handleChangeSenha}
          />
          <p></p>
          <label htmlFor="senha">Senha </label>
          <br />
          <br />
          <input
            value={confSenha}
            type="password"
            id="confSenha"
            required
            onChange={handleChangeConfSenha}
          />
          <p></p>
          <label htmlFor="confSenha">Confirmar Senha </label>
          <br />
          <br />
          <button type="submit">Cadastrar</button>
          <button type="reset" onClick={resetarForm}>
            Limpar
          </button>
          <br />
          <br />
          <Link to="/">
            <button className={styles.btn_voltar}>Voltar</button>
          </Link>

          <br />
        </form>
      </div>
    </>
  );
};

export default Cadastro;
