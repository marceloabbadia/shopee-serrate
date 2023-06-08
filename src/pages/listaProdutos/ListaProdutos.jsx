import { useEffect, useState } from 'react'
import api from '../../api/api'

const listaProdutos = async () => {
   const [data, setData] = useState([])

   useEffect(async () => {
      const response = await api.get('/produtos')
      setData(response.data)
      
   }, [])
}

const ListaProdutos = () => {
   return <>{listaProdutos()}</>
}

export default ListaProdutos
