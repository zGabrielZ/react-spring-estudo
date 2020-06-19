import React from 'react'
import Card from '../componentes/card'
import FormGroup from '../componentes/form-group'
import AlunoService from '../services/aluno-services'
import { msgErro,msgErroForm} from '../componentes/toastr'
import { AuthContext } from '../main/provedor-autenticacao'
import {withRouter} from 'react-router-dom' 

class Login extends React.Component {



    state = {
        email: '',
        senha: '',
        errorCampos:[]
    }

    constructor(){
        super()
        this.alunoService = new AlunoService()
    }

    entrar = () => {
        this.alunoService.autenticar({
            email:this.state.email,
            senha:this.state.senha
        }).then(response=>{
            this.context.iniciarSessao(response.data)
            this.props.history.push('/home')
        }).catch(error=>{
            console.log(error)
            msgErro(error.response.data.titulo)
            const camposErro = []
                const falha = error.response.data.campos
                if(falha){
                    falha.map((itemError)=>{
                        msgErroForm(itemError.nome,itemError.mensagem)
                        camposErro.push(itemError)
                        return console.log(itemError)
                    })
                    this.setState({errorCampos:camposErro})
                }
        })
    }

    cadastrar = () =>{
        this.props.history.push('/cadastro-aluno')
    }


    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email : " htmlFor="email">
                                                <input type="email" value={this.state.email}
                                                    onChange={e => this.setState({ email: e.target.value })}
                                                    className="form-control"
                                                    id="email" name="email"
                                                    aria-describedby="emailHelp" placeholder="Digite seu email"></input>
                                                <small id="email" className="form-text text-white">Não compartilhamos seu email com mais ninguém</small>
                                            </FormGroup>
                                            <FormGroup label="Senha : " htmlFor="senha">
                                                <input type="password" value={this.state.senha}
                                                    onChange={e => this.setState({ senha: e.target.value })}
                                                    className="form-control"
                                                    id="senha" name="senha"
                                                    aria-describedby="senhaHelp" placeholder="Digite sua senha"></input>
                                            </FormGroup>

                                            <button className="btn btn-success" onClick={this.entrar}>
                                                Entrar
                                                </button>
                                            <button style={{ marginLeft: '20px' }} onClick={this.cadastrar} className="btn btn-danger">
                                                Cadastrar
                                                </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

}

Login.contextType = AuthContext

export default withRouter(Login)