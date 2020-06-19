import React from 'react'
import AuthService from '../services/auth-service'
import { msgSucesso } from '../componentes/toastr'

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer
const AuthProvider = AuthContext.Provider

class ProvedorAutenticacao extends React.Component{
    
    state = {
        alunoAutenticado:null,
        isAutenticado:false
    }
    
    iniciarSessao = (aluno) =>{
        AuthService.logar(JSON.stringify(aluno))
        this.setState({isAutenticado:true,alunoAutenticado:aluno})
        msgSucesso('Logado com sucesso !')
    }

    encerrarSessao = () =>{
        AuthService.removerAlunoAutenticado()
        this.setState({isAutenticado:false,alunoAutenticado:null})
        msgSucesso('Deslogado com sucesso !')
    }

    render(){

        const context = {
            alunoAutenticado:this.state.alunoAutenticado,
            isAutenticado:this.state.isAutenticado,
            iniciarSessao:this.iniciarSessao,
            encerrarSessao:this.encerrarSessao
        }

        return(
            <AuthProvider value={context}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default ProvedorAutenticacao