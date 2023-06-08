import { useEffect, useState } from 'react'
import api from '../../api/api'
import styles from './listaProdutos.module.css'

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
                        <img src={item.image} alt="" width={200} />
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <h3>R$ {item.price}</h3>
                        <h4>
                           Avaliações <br />
                           <strong>
                              Positivos {item.rating.feedbacksPositivos}
                           </strong>
                           <br />
                           <strong>
                              Negativos {item.rating.feedbacksNegativos}
                           </strong>
                        </h4>
                        <button>Ver mais</button>
                        <button>Ver mais</button>
                     </div>
                  )
               })}
            </div>
         </div>
      </>
   )
}

export default ListaProdutos
