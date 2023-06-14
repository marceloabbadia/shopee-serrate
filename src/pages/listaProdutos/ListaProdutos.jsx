import { useContext, useEffect, useState } from 'react'
import api from '../../api/api'
import styles from './listaProdutos.module.css'
import { Link } from 'react-router-dom'
import { CarrinhoContext } from '../../context/Context'
import PesquisaContext from '../../context/PesquisaContext'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { Button, Checkbox } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const ListaProdutos = () => {
   const [data, setData] = useState([])
   const token = localStorage.getItem('token')
   const [noItemsFound, setNoItemsFound] = useState(false)

   const { searchValue, setSearchValue } = useContext(PesquisaContext)

   useEffect(() => {
      const fetchData = async () => {
         let response
         if (searchValue === '') {
            response = await api.get('/produtos')
         } else {
            response = await api.get('/produtos')
         }
         const filteredData = filterData(response.data, searchValue)
         setData(filteredData)

         if (filteredData.length === 0) {
            setNoItemsFound(true)
         } else {
            setNoItemsFound(false)
         }
      }

      fetchData()
   }, [searchValue])

   const filterData = (products, search) => {
      const filteredProducts = products.filter(produto => {
         const title = produto.title.toLowerCase()
         const searchLower = search.toLowerCase()
         return title.includes(searchLower)
      })
      return filteredProducts
   }

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
         {noItemsFound && (
            <div className={styles.not_found}>
               Nenhum item encontrado! Verifique o nome pesquisado e tente
               novamente.
            </div>
         )}

         <div className={styles.container}>
            <div className={styles.card}>
               {data.map((item, index) => {
                  item.quantidade = 1
                  {
                     if (item.amount > 0) {
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
                                 <Button
                                    variant="outlined"
                                    style={{ marginBottom: '10px' }}
                                 >
                                    VER MAIS
                                 </Button>
                              </Link>
                              <Button
                                 disabled={!token}
                                 className="vermais"
                                 variant="contained"
                                 endIcon={<AddShoppingCartIcon />}
                                 onClick={() =>
                                    dispatch({ type: 'ADD', payload: item })
                                 }
                              >
                                 {token
                                    ? 'Adicionar ao carrinho'
                                    : 'Faça Login para acessar ao carrinho'}
                              </Button>
                           </div>
                        )
                     }
                  }
               })}
            </div>
         </div>
      </>
   )
}

export default ListaProdutos
