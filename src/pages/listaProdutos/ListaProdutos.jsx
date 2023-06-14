import { useContext, useEffect, useState } from 'react'
import api from '../../api/api'
import styles from './listaProdutos.module.css'
import { Link } from 'react-router-dom'
import { CarrinhoContext } from '../../context/Context'
import PesquisaContext from '../../context/PesquisaContext'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { Button } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const ListaProdutos = () => {
   const [data, setData] = useState([])
   const token = localStorage.getItem('token')

   const { searchValue, setSearchValue } = useContext(PesquisaContext)

   useEffect(() => {
      const data = async () => {
         let response
         if (searchValue === '') {
            response = await api.get('/produtos')
         } else {
            response = await api.get(`/produtos?title=${searchValue}`)
         }
         setData(response.data)
      }

      data()
   }, [searchValue])

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
         <div className={styles.tudo}></div>
         <div className={styles.container}>
            <div className={styles.card}>
               {data.map((item, index) => {
                  item.quantidade = 1
                  return (
                     <div key={index} className={styles.itens}>
                        <img src={item.image} alt={item.description} />
                        <h2>{item.title}</h2>
                        <p>
                           {item.description.length > 150
                              ? item.description.substring(0, 150) + '...'
                              : item.description}
                        </p>
                        <h3>R$ {item.price}</h3>
                        <h4>Avaliações</h4>
                        <div className={styles.avaliacoes}>
                           <span>
                              <ThumbUpIcon color="success" />{' '}
                              <h5>{item.feedbacksPositivos}</h5>
                           </span>
                           <span>
                              <ThumbDownIcon color="error" />{' '}
                              <h5>{item.feedbacksNegativos}</h5>
                           </span>
                        </div>

                        <Link to={`/detalheProduto/${item.id}`}>
                           <Button variant="outlined" style={{marginBottom:'10px'}}>
                              VER MAIS
                           </Button>
                        </Link>
                        <Button
                           variant="contained"
                           endIcon={<AddShoppingCartIcon />}
                           onClick={() =>
                              dispatch({ type: 'ADD', payload: item })
                           }
                        >
                           Adicionar ao carrinho
                        </Button>
                     </div>
                  )
               })}
            </div>
         </div>
      </>
   )
}

export default ListaProdutos
