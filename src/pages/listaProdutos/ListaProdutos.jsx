import { useEffect, useState } from 'react'
import api from '../../api/api'
import styles from './listaProdutos.module.css'
import { Link } from 'react-router-dom'
import { BsHandThumbsDown, BsHandThumbsUp } from 'react-icons/bs'

const ListaProdutos = () => {
   const [data, setData] = useState([])

   useEffect(() => {
      const data = async () => {
         const response = await api.get('/produtos')
         setData(response.data)
      }

      data()
   }, [])

   return (
      <>
         <div className={styles.container}>
            <div className={styles.card}>
               {data.map((item, index) => {
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
                           <div className={styles.avaliacoes}>
                              <strong>
                                 <BsHandThumbsUp /> {item.feedbacksPositivos}
                              </strong>
                              <br />
                              <strong>
                                 <BsHandThumbsDown /> {item.feedbacksNegativos}
                              </strong>
                           </div>
                        </h4>
                        <Link to={`/detalheProduto/${item.id}`}>
                           <button>Ver mais</button>
                        </Link>
                        <button>Adicionar carrinho</button>
                     </div>
                  )
               })}
            </div>
         </div>
      </>
   )
}

export default ListaProdutos
