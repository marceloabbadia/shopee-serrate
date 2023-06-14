import React from 'react'
import Button from '@mui/material/Button'
import styles from './loginEUsuario.module.css'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'

const LoginEUsuario = () => {
   // -----> Login
   const [emailLogin, setEmailLogin] = useState([])
   const [senhaLogin, setSenhaLogin] = useState([])

   // -----> cadastro
   const [nome, setNome] = useState([])
   const [telefone, setTelefone] = useState([])
   const [email, setEmail] = useState([])
   const [senha, setSenha] = useState([])

   //-------> configuracao do input senha (olhos)

   const [showPassword, setShowPassword] = React.useState(false)

   const handleClickShowPassword = () => setShowPassword(show => !show)

   // <------ Fim da configuracao input senha (olhos)

   // ----> Inicio do Login

   const handleChangeEmailLogin = e => {
      setEmailLogin(e.target.value)
   }

   const handleChangeSenhaLogin = e => {
      setSenhaLogin(e.target.value)
   }

   const handleSubmitFormLogin = e => {
      e.preventDefault()

      let listaUsuarios = []

      listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'))

      if (listaUsuarios === null) {
         alert('Nenhum usuário ainda cadastrado!')
      } else {
         let userValid = {
            email: '',
            senha: ''
         }

         listaUsuarios.forEach(item => {
            if (emailLogin == item.Email && senhaLogin == item.Senha) {
               userValid = {
                  email: item.email,
                  senha: item.senha
               }
            }
         })

         if (userValid.email == '' || userValid.senha == '') {
            alert('Senha ou login inválidos!')
            resetarFormLogin()
         } else {
            let token =
               Math.random().toString(16).substring(2) +
               Math.random().toString(16).substring(2)
            localStorage.setItem('token', token)
            alert('Seu token foi validado e voce será redirecionado!')
            resetarFormLogin()
         }
      }
   }

   const resetarFormLogin = () => {
      setEmailLogin('')
      setSenhaLogin('')
   }

   // <------ Fim do Login

   // ------> Inicio do cadastro

   const handleChangeNome = e => {
      setNome(e.target.value)
   }

   const handleChangeTelefone = e => {
      setTelefone(e.target.value)
   }

   const handleChangeEmail = e => {
      setEmail(e.target.value)
   }

   const handleChangeSenha = e => {
      setSenha(e.target.value)
   }

   const handleSubmitForm = e => {
      e.preventDefault()

      let avaliacaoEmail

      let listaUsuarios = JSON.parse(
         localStorage.getItem('listaUsuarios') || '[]'
      )

      listaUsuarios.find(item => {
         if (item.Email === email) {
            avaliacaoEmail = false
            return avaliacaoEmail
         } else {
            avaliacaoEmail = true
            return avaliacaoEmail
         }
      })

      if (avaliacaoEmail == false) {
         alert('Email já cadastrado!')
         resetarForm()
      } else {
         listaUsuarios.push({
            Nome: nome,
            Telefone: telefone,
            Email: email,
            Senha: senha
         })

         localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios))

         alert('Usuario cadastrado com sucesso!')

         resetarForm()
      }
   }

   const resetarForm = () => {
      setNome('')
      setTelefone('')
      setEmail('')
      setSenha('')
   }

   // Fim do cadastro <-----

   return (
      <>
         {/* Inicio Login */}
         <div className={styles.container_geral}>
            <div className={styles.barra_central}></div>
            <div className={styles.login1}>
               <h2>Já Sou Cliente</h2>
               <br />
               <form
                  className={styles.form_login}
                  onSubmit={handleSubmitFormLogin}
               >
                  <TextField
                     required
                     id="outlined-required"
                     label="Email"
                     value={emailLogin}
                     onChange={handleChangeEmailLogin}
                  />
                  <br />
                  <br />
                  <FormControl sx={{ m: 1, width: '22ch' }} variant="outlined">
                     <InputLabel htmlFor="outlined-adornment-password">
                        Senha
                     </InputLabel>
                     <OutlinedInput
                        value={senhaLogin}
                        onChange={handleChangeSenhaLogin}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                           <InputAdornment position="end">
                              <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={handleClickShowPassword}
                                 edge="end"
                              >
                                 {showPassword ? (
                                    <VisibilityOff />
                                 ) : (
                                    <Visibility />
                                 )}
                              </IconButton>
                           </InputAdornment>
                        }
                        label="Password"
                     />
                  </FormControl>
                  <br />
                  <br />
                  <Button variant="contained" type="submit">
                     Entrar
                  </Button>
                  <p></p>
                  <br />

                  <Button
                     variant="outlined"
                     type="reset"
                     onClick={resetarFormLogin}
                  >
                     Limpar
                  </Button>
                  <br />
                  <br />
                  <p className={styles.texto_login}>
                     Faça login para receber mais ofertas
                  </p>
               </form>
            </div>

            {/* Fim do Login */}

            {/* Inicio cadastro */}

            <div className={styles.cadastro1}>
               <h2>Sou Novo Cliente</h2>
               <br />

               <form onSubmit={handleSubmitForm}>
                  <TextField
                     required
                     id="outlined-required"
                     label="Nome"
                     value={nome}
                     onChange={handleChangeNome}
                  />
                  <br />
                  <br />
                  <TextField
                     required
                     id="outlined-required"
                     label="Telefone"
                     value={telefone}
                     onChange={handleChangeTelefone}
                     type="Number"
                  />
                  <br />
                  <br />
                  <TextField
                     required
                     id="outlined-required"
                     label="Email"
                     value={email}
                     onChange={handleChangeEmail}
                  />
                  <br />
                  <br />
                  <FormControl sx={{ m: 1, width: '22ch' }} variant="outlined">
                     <InputLabel htmlFor="outlined-adornment-password">
                        Senha
                     </InputLabel>
                     <OutlinedInput
                        value={senha}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        onChange={handleChangeSenha}
                        endAdornment={
                           <InputAdornment position="end">
                              <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={handleClickShowPassword}
                                 edge="end"
                              >
                                 {showPassword ? (
                                    <VisibilityOff />
                                 ) : (
                                    <Visibility />
                                 )}
                              </IconButton>
                           </InputAdornment>
                        }
                        label="Password"
                     />
                  </FormControl>
                  <br />
                  <br />
                  <Button variant="contained" type="submit">
                     Cadastrar
                  </Button>
                  <br />
                  <br />
                  <Button variant="outlined" type="reset" onClick={resetarForm}>
                     {' '}
                     Limpar
                  </Button>
                  <br />
                  <br />
                  <p className={styles.texto_login}>
                     R$12 OFF na sua primeira compra
                  </p>
               </form>
               {/* Fim cadastro */}
            </div>
         </div>
      </>
   )
}

export default LoginEUsuario
