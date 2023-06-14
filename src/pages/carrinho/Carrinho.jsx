import { useContext, React, useState } from 'react'
import styles from './carrinho.module.css'
import { CarrinhoContext } from '../../context/Context'
import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import api from '../../api/api'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import ControlPointIcon from '@mui/icons-material/ControlPoint'

const Carrinho = () => {
   const GlobalState = useContext(CarrinhoContext)
   const state = GlobalState.state
   const dispatch = GlobalState.dispatch

   const total = state.reduce((total, item) => {
      return total + item.price * item.quantidade
   }, 0)

   const finalizarCompra = async () => {
      try {
         await Promise.all(
            state.map(async item => {
               const response = await api.patch(`/produtos/${item.id}`, {
                  amount: item.amount - item.quantidade
               })
               return response.data
            })
         )
      } catch (error) {
         console.error('Erro ao finalizar a compra:', error)
      }
   }

   const [open, setOpen] = useState(false)
   const handleOpen = () => setOpen(true)
   const handleClose = () => setOpen(false)

   const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4
   }
   return (
      <>
         <div className={styles.retorno}>
            <Link to="/">
               <Button
                  variant="contained"
                  size="larger"
                  color="primary"
                  startIcon={<ArrowCircleLeftIcon sx={{ fontSize: 40 }} />}
               >
                  RETORNAR
               </Button>
            </Link>
         </div>
         <div className={styles.carrinho}>
            <tr className={styles.tabela}>
               <th>Imagem</th>
               <th>Produto</th>
               <th>Valor</th>
               <th>Qtd Estoque</th>
               <th>Qtd Compra</th>
            </tr>
            {state.map((item, index) => {
               return (
                  <div key={index} className={styles.card}>
                     <img src={item.image} alt="" />
                     <p>{item.title}</p>
                     <p>R$ {item.quantidade * item.price}</p>
                     <p>{item.amount} Un</p>
                     <div className={styles.quantidade}>
                        {item.quantidade < item.amount ? (
                           <IconButton
                              color="success"
                              aria-label="add to shopping cart"
                              onClick={() =>
                                 dispatch({ type: 'INCREASE', payload: item })
                              }
                           >
                              <ControlPointIcon />
                           </IconButton>
                        ) : (
                           <IconButton disabled>
                              <ControlPointIcon />
                           </IconButton>
                        )}

                        <p>{item.quantidade}</p>
                        <IconButton
                           color="error"
                           aria-label="add to shopping cart"
                           onClick={() => {
                              if (item.quantidade > 1) {
                                 dispatch({ type: 'DECREASE', payload: item })
                              } else {
                                 dispatch({ type: 'REMOVE', payload: item })
                              }
                           }}
                        >
                           <RemoveCircleOutlineIcon />
                        </IconButton>
                     </div>
                     <IconButton
                        color="error"
                        aria-label="remover"
                        className={styles.btn_remove}
                        onClick={() =>
                           dispatch({ type: 'REMOVE', payload: item })
                        }
                     >
                        <HighlightOffIcon />
                     </IconButton>
                  </div>
               )
            })}
            {state.length > 0 && (
               <div className={styles.total}>
                  <LocalAtmIcon
                     color="success"
                     sx={{ fontSize: 40 }}
                     style={{ marginRight: '15px' }}
                  />
                  <h2>Total = R$ {total.toFixed(2)}</h2>
               </div>
            )}
            <div className={styles.btn_compra}>
               <Button
                  onClick={handleOpen}
                  style={{
                     fontSize: '25px',
                     marginLeft: '81vw'
                  }}
               >
                  Finalizar Compra
               </Button>
               <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
               >
                  <Box sx={style}>
                     <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                     >
                        Compra Finalizada!
                     </Typography>
                     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Obrigado por comprar em nossa Loja!
                     </Typography>
                     <Typography>Volte Sempre!</Typography>
                     <Link to={'/'} reloadDocument>
                        <button
                           className={styles.btn_voltar}
                           onClick={finalizarCompra}
                        >
                           Voltar
                        </button>
                     </Link>
                  </Box>
               </Modal>
            </div>
         </div>
      </>
   )
}

export default Carrinho
