import styles from './header.module.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsSearch, BsCart3 } from 'react-icons/bs'

const Header = () => {
   const handleSearchBar = () => {
      alert('teste')
   }

   return (
      <>
         <div className={styles.header}>
            <nav className={styles.nav}>
               <div className={styles.title}>
                  <Link to={'/'}>
                     <h1>Shopee SerraTec</h1>
                  </Link>
               </div>
               <div>
                  {/* <form onSubmit={handleSearchBar}>
            </form> */}

                  <input
                     type="search"
                     required
                     placeholder="pesquisar por nome"
                  />
                  <label htmlFor="">
                     <button className="btn_pesquisa">
                        <BsSearch />
                     </button>
                  </label>
                  <br />
                  <label htmlFor="">Categoria</label>
                  <select name="categoria" id="">
                     <option value=""></option>
                     <option value="">Masculino</option>
                     <option value="">Feminino</option>
                     <option value="">Joias</option>
                     <option value="">Eletronicos</option>
                  </select>
               </div>
               <div className={styles.botoes_header}>
                  <Link to="/login">
                     <button>
                        <Link to='/carrinho'>
                           <BsCart3 />
                        </Link>
                     </button>
                  </Link>

                  <br />

                  <Link to="/login">
                     <button>Login </button>
                  </Link>

                  <br />

                  <button>Compras</button>
               </div>
            </nav>
         </div>
      </>
   )
}

export default Header
