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
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const Header = () => {
   const { searchValue, setSearchValue } = useContext(PesquisaContext)
   const token = localStorage.getItem('token')

   const handleSearch = event => {
      event.preventDefault()
      setSearchValue('')
   }

   const handleLogout = () => {
      localStorage.removeItem('token')
      window.location.reload()
   }

   const handleClickCarrinho = () => {
      // token = localStorage.getItem('token')
      if (token == null) {
         alert('Por favor, faça login para adicionar ao carrinho.')
      }
      // navigate('/carrinho')
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
                  <Link to={'/carrinho'}>
                     <h3 className={styles.btn_carrinho}>
                        <BsCart3 />
                     </h3>
                  </Link>
                  <Link to="/login">
                     <Button variant="text" className={styles.btn_login}>
                        Login
                     </Button>
                  </Link>

                  <Button variant="text" color="error" onClick={handleLogout}>
                     Logout
                  </Button>
               </div>
            </nav>
         </div>
      </>
   )
}
//           <form className={styles.pesquisa_nome} onSubmit={handleSearch}>
//             <Box
//               sx={{
//                 width: 500,
//                 maxWidth: "90%",
//                 bgcolor: "white",
//                 boxShadow: 1,
//                 borderRadius: 5,
//               }}
//             >
//               <TextField
//                 fullWidth
//                 value={searchValue}
//                 label="Pesquisar por nome"
//                 onChange={({ target }) => setSearchValue(target.value)}
//               />
//             </Box>
//             <Link to={"/"}>
//               <button
//                 onClick={() => {
//                   setSearchValue("");
//                 }}
//               >
//                 <AiOutlineClear className={styles.btn_clear} />
//               </button>
//             </Link>
//           </form>
//           <Link
//             to={token ? "/carrinho" : "/"}
//             disabled={!token}
//             onClick={handleClickCarrinho}
//           >
//             <button className={styles.btn_carrinho}>
//               <BsCart3 />
//             </button>
//           </Link>

//           <br />

//           <br />
//         </nav>
//       </div>
//     </>
//   );
// };

export default Header
