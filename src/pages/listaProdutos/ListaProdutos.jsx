import { useContext, useEffect, useState } from 'react'
import api from '../../api/api'
import styles from './listaProdutos.module.css'
import { Link } from 'react-router-dom'
import { BsHandThumbsDown, BsHandThumbsUp } from 'react-icons/bs'
import { CarrinhoContext } from '../../context/Context'
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { ButtonGroup, Button } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ListaProdutos = () => {
   const [data, setData] = useState([])
   const token = localStorage.getItem('token')

   useEffect(() => {
      const data = async () => {
         const response = await api.get('/produtos')
         setData(response.data)
      }

      data()
   }, [])

   const incrementarFeedbackPositivo = index => {
      const incrementar = [...data]
      incrementar[index].feedbacksPositivos++
      setData(incrementar)
   }

   const decrementarFeedbackPositivo = index => {
      const decrementar = [...data]
      if (decrementar[index].feedbacksNegativos > 0) {
         decrementar[index].feedbacksNegativos++
         setData(decrementar)
      }
   }
   const GlobalState = useContext(CarrinhoContext)
   const dispatch = GlobalState.dispatch

   return (
      <>
         <div className={styles.tudo}>
            
         </div>
         <div className={styles.container}>
            <div className={styles.card}>
               {data.map((item, index) => {
                  item.quantidade = 1
<<<<<<< HEAD
                  return (
                     <div key={index} className={styles.itens}>
                        <img
                           src={item.image}
                           alt={item.description}
                           width={80}
                        />
                        <h2>{item.title}</h2>
                        <p>
                           {item.description.length > 150
                              ? item.description.substring(0, 150) + '...'
                              : item.description}
                        </p>
                        <h3>R$ {item.price}</h3>
                        <h4>
                           Avaliações <br />
                           <div className={styles.avaliacoes}>
                              <strong>
                                 <ThumbUpIcon color="success" /> {item.feedbacksPositivos}
                              </strong>
                              <br />
                              <strong>
                                 <ThumbDownIcon color="error" /> {item.feedbacksNegativos}
                              </strong>
                           </div>
                        </h4>
                        <Link to={`/detalheProduto/${item.id}`}>
                           <Button variant="outlined">VER MAIS</Button>

                        </Link>
                        <p>⠀⠀</p>
                        <Button className="vermais" variant="contained" endIcon={<AddShoppingCartIcon />}
                           onClick={() =>
                              dispatch({ type: 'ADD', payload: item })
                           }>Adicionar ao carrinho</Button>
                        <div className={styles.favorito}>
                        <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite color="error" />} />
                        </div>
                     </div>
                     
                  )
=======
                  {
                     if (item.amount > 0) {
                        return (
                           <div key={index} className={styles.itens}>
                              <img
                                 src={item.image}
                                 alt={item.description}
                                 width={150}
                              />
                              <h2>{item.title}</h2>
                              <p>
                                 {item.description.length > 150
                                    ? item.description.substring(0, 150) + '...'
                                    : item.description}
                              </p>
                              <h3>R$ {item.price}</h3>
                              <h4>
                                 Avaliações <br />
                                 {token == null ? (
                                    <div className={styles.avaliacoes}>
                                       <button
                                          onClick={() =>
                                             incrementarFeedbackPositivo(index)
                                          }
                                          disabled
                                       >
                                          <BsHandThumbsUp />
                                          {item.feedbacksPositivos}
                                       </button>
                                       <br />
                                       <button
                                          onClick={() =>
                                             decrementarFeedbackPositivo(index)
                                          }
                                          disabled
                                       >
                                          <BsHandThumbsDown />
                                          {item.feedbacksNegativos}
                                       </button>
                                    </div>
                                 ) : (
                                    <div className={styles.avaliacoes}>
                                       <button
                                          onClick={() =>
                                             incrementarFeedbackPositivo(index)
                                          }
                                       >
                                          <BsHandThumbsUp />
                                          {item.feedbacksPositivos}
                                       </button>
                                       <br />
                                       <button
                                          onClick={() =>
                                             decrementarFeedbackPositivo(index)
                                          }
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
                                 onClick={() =>
                                    dispatch({ type: 'ADD', payload: item })
                                 }
                              >
                                 Adicionar carrinho
                              </button>
                           </div>
                        )
                     }
                  }
>>>>>>> 7d90eb06c3ee906cbb52d171e55658db5ce001f5
               })}
            </div>
         </div>
      </>
   )
}

export default ListaProdutos
