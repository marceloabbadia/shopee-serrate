import { Link, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import api from '../../api/api'
import styles from './detalheProduto.module.css'
import { CircularProgress } from '@mui/material'
import { BsHandThumbsDown, BsHandThumbsUp } from 'react-icons/bs'
import { CarrinhoContext } from '../../context/Context'
import { ButtonGroup, Button, IconButton } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';


const DetalheProduto = () => {
   const [produto, setProduto] = useState({})
   const [loaded, setLoaded] = useState(false)
   const [relacionados, setRelacionados] = useState([])
   const { id } = useParams()
   // const [positivo, setPositivo] = useState(0)
   // const [negativo, setNegativo] = useState(0)

   useEffect(() => {
      lerDados()
   }, [])

   const lerDados = async () => {
      const response = await data()
      relacionar(response.data.category)
   }

   const data = async () => {
      setLoaded(true)
      const response = await api.get(`/produtos/${id}`)
      setProduto(response.data)
      setLoaded(false)
      return response
   }

   const relacionar = async categoria => {
      const response = await api.get(`/produtos/`, {
         params: { category: categoria }
      })
      setRelacionados(response.data)
   }

   const GlobalState = useContext(CarrinhoContext)
   const dispatch = GlobalState.dispatch
   console.log(GlobalState)

   return (
      <>
         {loaded && (
            <CircularProgress
               style={{
                  width: '10rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: 'black',
                  margin: '0 auto',
                  marginTop: '10%'
               }}
            />
         )}
         <div className={styles.paginatoda}>
            <div className={styles.retorno}>
               <Link to="/">
                  <Button variant="contained" size="larger" color="secondary" startIcon={<ArrowCircleLeftIcon sx={{ fontSize: 40 }} />}>
                     RETORNAR
                  </Button>
               </Link>
            </div>
            <div className="container">
               <div className={styles.produto}>
                  <div className={styles.info}>
                     <img
                        src={produto.image}
                        alt={produto.description}
                        width={100}
                     />
                     <h2>{produto.title}</h2>
                     <strong>R$: {produto.price}</strong>
                     <p>{produto.description}</p>
                     <h3>{produto.category}</h3>
                     <h4>Quantidade: {produto.amount}</h4>


                     <div className={styles.avaliacoes}>
                        <ThumbUpIcon color="success" />
                        <p>{produto.feedbacksPositivos}</p>
                        <ThumbDownIcon color="error" />
                        <p>{produto.feedbacksNegativos}</p>
                     </div>
                     <Button variant="outlined" startIcon={<AddShoppingCartIcon />}
                        onClick={() => dispatch({ type: 'ADD', payload: produto })}
                     >
                        ADICIONAR AO CARRINHO
                     </Button>
                  </div>
               </div>
            </div>

            <div className={styles.relacionados}>
               {relacionados.map((item, index) => {
                  return (
                     <div key={index} className={styles.cards_relacionados}>
                        <Link to={`/detalheProduto/${item.id}`} reloadDocument>
                           <img
                              src={item.image}
                              alt={item.description}
                              width={90}
                           />
                           <p>{item.title}</p>
                           <h2>R${item.price}</h2>
                        </Link>
                     </div>
                  )
               })}
            </div>
         </div>
      </>
   )
}

export default DetalheProduto
