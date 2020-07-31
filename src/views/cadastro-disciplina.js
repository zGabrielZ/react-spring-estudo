import React from 'react'
import Card from '../componentes/card'
import FormGroup from '../componentes/form-group'
import DisciplinaService from '../services/disciplina-service'
import LocalStorageService from '../services/localStorage-services'
import { msgSucesso, msgErroForm, msgErro } from '../componentes/toastr'
import { withRouter } from 'react-router-dom'
import '../css/cadastro-disciplina-estilo.css'

class CadastroDisciplina extends React.Component {


    state = {
        id: null,
        nome: '',
        descricao: '',
        aluno: null,
        atualizando: false,
        errorCampos: []
    }

    constructor() {
        super()
        this.disciplinaService = new DisciplinaService()
    }

    componentDidMount() {
        const params = this.props.match.params
        const alunoLogado = LocalStorageService.obterItem('_aluno_logado')
        if (params.id) {
            this.disciplinaService.obterId(alunoLogado.id, params.id)
                .then(response => {
                    this.setState({ ...response.data, atualizando: true })
                }).catch(error => {
                    msgErro(error.response.data)
                })
        }
    }

    cadastrar = () => {
        const alunoLogado = LocalStorageService.obterItem('_aluno_logado')

        const disciplina = {
            nome: this.state.nome,
            descricao: this.state.descricao,
            aluno: alunoLogado.id
        }

        this.disciplinaService.cadastrar(disciplina)
            .then(response => {
                msgSucesso('Cadastrado com sucesso !')
                this.props.history.push('/consulta-disciplina')
            }).catch(error => {
                msgErro(error.response.data.titulo)
                const camposErro = []
                const falha = error.response.data.campos
                if (falha) {
                    falha.map((itemError) => {
                        msgErroForm(itemError.nome, itemError.mensagem)
                        camposErro.push(itemError)
                        return console.log(itemError)
                    })
                    this.setState({ errorCampos: camposErro })
                }
            })

    }

    atualizar = () => {
        const alunoLogado = LocalStorageService.obterItem('_aluno_logado')

        const disciplina = {
            id: this.state.id,
            nome: this.state.nome,
            descricao: this.state.descricao,
            aluno: alunoLogado.id
        }

        this.disciplinaService.atualizar(disciplina)
            .then(response => {
                msgSucesso('Atualizado com sucesso !')
                this.props.history.push('/consulta-disciplina')
            }).catch(error => {
                msgErro(error.response.data.titulo)
                const camposErro = []
                const falha = error.response.data.campos
                if (falha) {
                    falha.map((itemError) => {
                        msgErroForm(itemError.nome, itemError.mensagem)
                        camposErro.push(itemError)
                        return console.log(itemError)
                    })
                    this.setState({ errorCampos: camposErro })
                }
            })

    }

    voltar = () => {
        this.props.history.push('/home')
    }

    irParaConsulta = () => {
        this.props.history.push('/consulta-disciplina')
    }


    render() {
        return (
            <Card title={this.state.atualizando ? 'Atualização de disciplina' : 'Cadastro de disciplina'}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup id="nome" label="Nome : " htmlFor="nome">
                                <input type="text"
                                    className="form-control"
                                    id="nome" name="nome"
                                    value={this.state.nome}
                                    onChange={e => this.setState({ nome: e.target.value })}
                                    aria-describedby="nomeHelp" placeholder="Digite nome da disciplina"></input>
                            </FormGroup>
                            <FormGroup id="descricao" label="Descrição : " htmlFor="descricao">
                                <br />
                                <textarea rows="8" cols="187" id="descricao" name="descricao"
                                    aria-describedby="descricaoHelp" placeholder="Digite a descrição"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                    maxLength="250" style={{ resize: 'none' }} ></textarea>
                            </FormGroup>
                            {
                                this.state.atualizando ?
                                    (
                                        <button className="btn btn-success um-bt" onClick={this.atualizar}>
                                            Atualizar
                                        </button>
                                    ) :
                                    <button className="btn btn-success um-bt" onClick={this.cadastrar}>
                                        Cadastrar
                                    </button>
                            }
                            <button onClick={this.voltar} className="btn btn-danger dois-bt">
                                Voltar para home
                            </button>
                            <button onClick={this.irParaConsulta} className="btn btn-warning tres-bt">
                                Ir para consulta
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroDisciplina)