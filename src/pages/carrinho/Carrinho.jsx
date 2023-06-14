import { useContext } from 'react'
import styles from './carrinho.module.css'
import { CarrinhoContext } from '../../context/Context'
import { ButtonGroup, Button, IconButton } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Link, useParams } from 'react-router-dom'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';



const Carrinho = () => {
   const GlobalState = useContext(CarrinhoContext)
   const state = GlobalState.state
   const dispatch = GlobalState.dispatch

   const total = state.reduce((total, item) => {
      return total + item.price * item.quantidade
   }, 0)

   return (
      <>
         <div className={styles.retorno}>
            <Link to="/">
               <Button variant="contained" size="larger" color="secondary" startIcon={<ArrowCircleLeftIcon sx={{ fontSize: 40 }} />}>
                  RETORNAR
               </Button>
            </Link>
         </div>
         <div className={styles.carrinho}>
            {state.map((item, index) => {
               return (
                  <div key={index} className={styles.card}>

                     <img src={item.image} alt="" />
                     <p>{item.title}</p>
                     <p>R$ {item.quantidade * item.price}</p>
                     <div className={styles.quantidade}>
                        <IconButton color="success" aria-label="add to shopping cart"
                           onClick={() =>
                              dispatch({ type: 'INCREASE', payload: item })
                           }>
                           <ControlPointIcon />
                        </IconButton>
                        <p>{item.quantidade}</p>
                        <IconButton color="error" aria-label="add to shopping cart"
                           onClick={() => {
                              if (item.quantidade > 1) {
                                 dispatch({ type: 'DECREASE', payload: item })
                              } else {
                                 dispatch({ type: 'REMOVE', payload: item })
                              }
                           }}>
                           <RemoveCircleOutlineIcon />
                        </IconButton>
                     </div>
                     <IconButton color="error" aria-label="remover"
                        className={styles.btn_remove}
                        onClick={() =>
                           dispatch({ type: 'REMOVE', payload: item })
                        }>
                        <HighlightOffIcon />
                     </IconButton>
                  </div>
               )
            })}
            {state.length > 0 && (
               <div className={styles.total}>
                  <LocalAtmIcon color="success" sx={{ fontSize: 31 }} />
                  <h2>Total = R$ {total.toFixed(2)}</h2>
               </div>
            )}
         </div>
      </>
   )
}

export default Carrinho
