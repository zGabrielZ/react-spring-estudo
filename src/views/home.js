import React from 'react'
import AlunoService from '../services/aluno-services'
import { msgErro } from '../componentes/toastr'
import { AuthContext } from '../main/provedor-autenticacao'
import LocalStorageService from '../services/localStorage-services'
import '../css/home-estilo.css'

class Home extends React.Component{


    state = {
        nome:''
    }

    constructor(){
        super()
        this.alunoService = new AlunoService()
    }

    componentDidMount(){
        const alunoLogado = LocalStorageService.obterItem('_aluno_logado')
    
        this.alunoService.obterNome(alunoLogado.id)
            .then(response=>{
                this.setState({nome:response.data.nomeCompleto})
            }).catch(error=>{
                msgErro('Nome não encontrado')
                console.log(error.response)
            })
    }

    cadastrarDisciplina = () => {
        this.props.history.push('/cadastro-disciplina')
    }

    cadastrarEstudo = () => {
        this.props.history.push('/cadastro-estudo')
    }

    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo, {this.state.nome}</h1>
                <p className="lead">Esse é o seu sistema de estudo, pode usar a qualquer momento!!</p>
                <p>A página Home é a sua aréa adminstrativa, utilize os botões abaixo para navegar ou até mesmo 
                    usar a ferramenta de cima.
                </p>
                <p className="lead">
                    <button className="btn btn-primary btn-lg um-bt" onClick={this.cadastrarDisciplina}>
                        Cadastrar disciplina
                    </button>
                    <button className="btn btn-danger btn-lg dois-bt"
                    onClick={this.cadastrarEstudo}>
                        Cadastrar horário de estudo
                    </button>
                </p>
            </div>
        )
    }
}

Home.contextType = AuthContext
export default Home