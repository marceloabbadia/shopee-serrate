import styles from "./header.module.css";
import React from "react";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";
import { useContext } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PesquisaContext from "../../context/PesquisaContext";
import Button from "@mui/material/Button";

const Header = () => {
  const { searchValue, setSearchValue } = useContext(PesquisaContext);
  const token = localStorage.getItem("token");

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchValue("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/");
  };

  return (
    <>
      <div className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.title}>
            <Link to={"/"} style={{ fontSize: "22px", textDecoration: "none" }}>
              <h1>SHOPEE SERRATEC</h1>
            </Link>
          </div>

          <form className={styles.pesquisa_nome} onSubmit={handleSearch}>
            <Box
              sx={{
                width: 500,
                maxWidth: "90%",
                bgcolor: "white",
                boxShadow: 1,
                borderRadius: 5,
              }}
            >
              <TextField
                fullWidth
                value={searchValue}
                placeholder="Pesquisar por nome"
                onChange={({ target }) => setSearchValue(target.value)}
              />
            </Box>
            <Link to={"/"}>
              <h3
                onClick={() => {
                  setSearchValue("");
                }}
              >
                <AiOutlineClear className={styles.btn_clear} />
              </h3>
            </Link>
          </form>
          <div className={styles.btn}>
            <Link to={"/carrinho"} >
              <h3 className={styles.btn_carrinho}>
                <BsCart3 />
              </h3>
            </Link>
            <div>
              {token == null && (
                <Link to="/login">
                  <Button
                    variant="text"
                    className={styles.btn_login}
                   
                  >
                    Login
                  </Button>
                </Link>
              )}
              {token != null && (
                <Button variant="text" color="error" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
