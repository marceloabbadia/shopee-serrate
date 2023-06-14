import styles from './header.module.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsSearch, BsCart3 } from 'react-icons/bs'
import { RiLoginBoxLine } from 'react-icons/ri'
import { AiOutlineClear } from 'react-icons/ai'
import { useState, useContext } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import PesquisaContext from '../../context/PesquisaContext'

const Header = () => {
   const { searchValue, setSearchValue } = useContext(PesquisaContext)
   const token = localStorage.getItem('token')

   const handleSearch = event => {
      event.preventDefault()
      setSearchValue('')
   }

   const handleClickCarrinho = () => {
      if (!token) {
         alert('Por favor, faça login para adicionar ao carrinho.')
      }
   }

   return (
      <>
         <div className={styles.header}>
            <nav className={styles.nav}>
               <div className={styles.title}>
                  <Link
                     to={'/'}
                     style={{ fontSize: '22px', textDecoration: 'none' }}
                  >
                     <h1>SHOPEE SERRATEC</h1>
                  </Link>
               </div>

               <form className={styles.pesquisa_nome} onSubmit={handleSearch}>
                  <Box
                     sx={{
                        width: 500,
                        maxWidth: '90%',
                        bgcolor: 'white',
                        boxShadow: 1,
                        borderRadius: 5
                     }}
                  >
                     <TextField
                        fullWidth
                        value={searchValue}
                        placeholder="Pesquisar por nome"
                        onChange={({ target }) => setSearchValue(target.value)}
                     />
                  </Box>
                  <Link to={'/'}>
                     <h3
                        onClick={() => {
                           setSearchValue('')
                        }}
                     >
                        <AiOutlineClear className={styles.btn_clear} />
                     </h3>
                  </Link>
               </form>
               <div className={styles.btn}>
                  <Link
                     to={token ? '/carrinho' : '/'}
                     disabled={!token}
                     onClick={handleClickCarrinho}
                  >
                     <h3 className={styles.btn_carrinho}>
                        <BsCart3 />
                     </h3>
                  </Link>
                  <br />
                  <Link to="/login">
                     <h3 className={styles.btn_login}>
                        <RiLoginBoxLine />
                     </h3>
                  </Link>
               </div>
            </nav>
         </div>
      </>
   )
}

export default Header
