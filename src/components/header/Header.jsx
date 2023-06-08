import styles from "./header.module.css";

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.title}>
            <h1>Shopee SerraTec</h1>
          </div>
          <div>
            <input type="search" required placeholder="pesquisar por nome" />
            <label htmlFor="">
              <button>pesquisar</button>
            </label>
            <br />
            <label htmlFor="">Categoria</label>
            <select name="categoria" id="">
              <option value=""></option>
              <option value="">Masculino</option>
              <option value="">Feminino</option>
              <option value="">Joias</option>
              <option value="">Eletronicos</option>
            </select>
          </div>
          <div className={styles.ul}>
            <ul>
              <li>Carrinho</li>
              <li>Login/Cadastro</li>
              <li>Compras</li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
