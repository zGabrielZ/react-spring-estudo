import React from 'react'
import AuthService from '../services/auth-service'
import { msgSucesso } from '../componentes/toastr'
import LocalStorageService from '../services/localStorage-services'

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

    componentDidMount(){
        const aluno = LocalStorageService.obterItem('_aluno_logado')
        if(aluno){
            this.setState({isAutenticado : true})
        }
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