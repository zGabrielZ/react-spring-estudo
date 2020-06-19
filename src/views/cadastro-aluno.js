import React from 'react'
import Card from '../componentes/card'
import FormGroup from '../componentes/form-group'
import {withRouter} from 'react-router-dom'
import AlunoService from '../services/aluno-services'
import {msgSucesso,msgErroForm,msgErro} from '../componentes/toastr'
import SelectMenuEnum from '../componentes/selectMenu'

class CadastroAluno extends React.Component {


    state = {
        nome: '',
        email: '',
        senha: '',
        data:'',
        ensino:'',
        sexo:'',
        errorCampos:[]
    }

    constructor(){
        super()
        this.alunoService = new AlunoService()
    }

    cadastrar = () => {

        const aluno = {
            nomeCompleto:this.state.nome,
            dataNascimento:this.state.data,
            email:this.state.email,
            ensino:this.state.ensino,
            sexo:this.state.sexo,
            senha:this.state.senha
        }

        this.alunoService.cadastrar(aluno)
            .then(response=>{
                msgSucesso('Cadastrado com sucesso !')
            }).catch(error=>{
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

    voltar = () =>{
        this.props.history.push('/login')
    }

    render() {


        const tiposSexo = this.alunoService.obterTipoSexo()
        const tiposEnsino = this.alunoService.obterEnsino()

        return (
            <Card title="Cadastro de aluno">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup id="nome" label="Nome : " htmlFor="nome">
                                <input type="text" value={this.state.nome}
                                    onChange={e => this.setState({ nome: e.target.value })}
                                    className="form-control"
                                    id="nome" name="nome"
                                    aria-describedby="nomeHelp" placeholder="Digite seu nome"></input>
                            </FormGroup>
                            <FormGroup id="data" label="Data nascimento : " htmlFor="data">
                                <input type="date" value={this.state.data}
                                    onChange={e => this.setState({ data: e.target.value })}
                                    className="form-control"
                                    id="data" name="data"
                                    aria-describedby="dataHelp" placeholder="Digite sua data nascimento"></input>
                            </FormGroup>
                            <FormGroup id="ensino" label="Ensino : ">
                                <SelectMenuEnum id="ensino" name="ensino" lista={tiposEnsino} className="form-control"
                                    value={this.state.ensino}
                                    onChange={(e) => this.setState({ ensino: e.target.value })} />
                            </FormGroup>
                            <FormGroup id="sexo" label="Sexo : ">
                                <SelectMenuEnum id="sexo" name="sexo" lista={tiposSexo} className="form-control"
                                    value={this.state.sexo}
                                    onChange={(e) => this.setState({ sexo: e.target.value })} />
                            </FormGroup>
                            <FormGroup id="nome" label="Email : " htmlFor="email">
                                <input type="email" value={this.state.email}
                                    onChange={e => this.setState({ email: e.target.value })}
                                    className="form-control"
                                    id="email" name="email"
                                    aria-describedby="emailHelp" placeholder="Digite seu email"></input>
                                <small id="email" className="form-text text-muted">Não compartilhamos seu email com mais ninguém</small>
                            </FormGroup>
                            <FormGroup id="nome" label="Senha : " htmlFor="senha">
                                <input type="password" value={this.state.senha}
                                    onChange={e => this.setState({ senha: e.target.value })}
                                    className="form-control"
                                    id="senha" name="senha"
                                    aria-describedby="senhaHelp" placeholder="Digite sua senha"></input>
                            </FormGroup>
                            <button className="btn btn-success" onClick={this.cadastrar}>
                                Cadastrar
                                </button>
                            <button style={{ marginLeft: '20px' }} onClick={this.voltar} className="btn btn-danger">
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter(CadastroAluno)