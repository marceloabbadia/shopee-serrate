import { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import styles from "./listaProdutos.module.css";
import { Link } from "react-router-dom";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import { CarrinhoContext } from "../../context/Context";
import PesquisaContext from "../../context/PesquisaContext";

const ListaProdutos = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const { searchValue, setSearchValue } = useContext(PesquisaContext);

  useEffect(() => {
    const data = async () => {
      let response;
      if (searchValue === "") {
        response = await api.get("/produtos");
      } else {
        response = await api.get(`/produtos?title=${searchValue}`);
      }
      setData(response.data);
    };

    data();
  }, [searchValue]);

  
  const incrementarFeedbackPositivo = (index) => {
    const incrementar = [...data];
    incrementar[index].feedbacksPositivos++;
    setData(incrementar);
  };

  const decrementarFeedbackPositivo = (index) => {
    const decrementar = [...data];
    if (decrementar[index].feedbacksNegativos > 0) {
      decrementar[index].feedbacksNegativos++;
      setData(decrementar);
    }
  };
  const GlobalState = useContext(CarrinhoContext);
  const dispatch = GlobalState.dispatch;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          {data.map((item, index) => {
            item.quantidade = 1;
            {
              if (item.amount > 0) {
                return (
                  <div key={index} className={styles.itens}>
                    <img src={item.image} alt={item.description} width={150} />
                    <h2>{item.title}</h2>
                    <p>
                      {item.description.length > 150
                        ? item.description.substring(0, 150) + "..."
                        : item.description}
                    </p>
                    <h3>R$ {item.price}</h3>
                    <h4>
                      Avaliações <br />
                      {token == null ? (
                        <div className={styles.avaliacoes}>
                          <button
                            onClick={() => incrementarFeedbackPositivo(index)}
                            disabled
                          >
                            <BsHandThumbsUp />
                            {item.feedbacksPositivos}
                          </button>
                          <br />
                          <button
                            onClick={() => decrementarFeedbackPositivo(index)}
                            disabled
                          >
                            <BsHandThumbsDown />
                            {item.feedbacksNegativos}
                          </button>
                        </div>
                      ) : (
                        <div className={styles.avaliacoes}>
                          <button
                            onClick={() => incrementarFeedbackPositivo(index)}
                          >
                            <BsHandThumbsUp />
                            {item.feedbacksPositivos}
                          </button>
                          <br />
                          <button
                            onClick={() => decrementarFeedbackPositivo(index)}
                          >
                            <BsHandThumbsDown />
                            {item.feedbacksNegativos}
                          </button>
                        </div>
                      )}
                    </h4>
                    <Link to={`/detalheProduto/${item.id}`}>
                      <button>Ver mais</button>
                    </Link>
                    <button
                      onClick={() => dispatch({ type: "ADD", payload: item })}
                    >
                      Adicionar carrinho
                    </button>
                  </div>
                );
              }
            }
          })}
        </div>
      </div>
    </>
  );
};

export default ListaProdutos;
