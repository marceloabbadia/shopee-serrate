import { useContext } from 'react'
import styles from './carrinho.module.css'
import { CarrinhoContext } from '../../context/Context'

const Carrinho = () => {
   const GlobalState = useContext(CarrinhoContext)
   const state = GlobalState.state
   const dispatch = GlobalState.dispatch

   const total = state.reduce((total, item) => {
      return total + item.price * item.quantidade
   }, 0)

   return (
      <>
         <div className={styles.carrinho}>
            {state.map((item, index) => {
               return (
                  <div key={index} className={styles.card}>
                     <img src={item.image} alt="" />
                     <p>{item.title}</p>
                     <p>{item.quantidade * item.price}</p>
                     <div className={styles.quantidade}>
                        <button
                           onClick={() =>
                              dispatch({ type: 'INCREASE', payload: item })
                           }
                        >
                           +
                        </button>
                        <p>{item.quantidade}</p>
                        <button
                           onClick={() => {
                              if (item.quantidade > 1) {
                                 dispatch({ type: 'DECREASE', payload: item })
                              } else {
                                 dispatch({ type: 'REMOVE', payload: item })
                              }
                           }}
                        >
                           -
                        </button>
                     </div>
                     <h2
                        className={styles.btn_remove}
                        onClick={() =>
                           dispatch({ type: 'REMOVE', payload: item })
                        }
                     >
                        x
                     </h2>
                  </div>
               )
            })}
            {state.length > 0 && (
               <div className={styles.total}>
                  <h2>Total = {total.toFixed(2)}</h2>
               </div>
            )}
         </div>
      </>
   )
}

export default Carrinho
