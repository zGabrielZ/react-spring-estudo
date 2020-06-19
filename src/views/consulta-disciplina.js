import React from 'react'
import Card from '../componentes/card'
import FormGroup from '../componentes/form-group'
import DisciplinaService from '../services/disciplina-service'
import { msgAlerta, msgErro, msgSucesso } from '../componentes/toastr'
import LocalStorageService from '../services/localStorage-services'

class ConsultaDisciplina extends React.Component {

    state = {
        nome: '',
        atualPagina: 1,
        disciplinaPorPagina: 5,
        disciplinas: []
    }

    primeiraPagina = () => {
        if (this.state.atualPagina > 1) {
            this.setState({
                atualPagina: 1
            })
        }
    }

    anteriorPagina = () => {
        if (this.state.atualPagina > 1) {
            this.setState({
                atualPagina: this.state.atualPagina - 1
            })
        }
    }

    proximaPagina = () => {
        if (this.state.atualPagina < Math.ceil(this.state.disciplinas.length / this.state.disciplinaPorPagina)) {
            this.setState({
                atualPagina: this.state.atualPagina + 1
            })
        }
    }

    ultimaPagina = () => {
        if (this.state.atualPagina < Math.ceil(this.state.disciplinas.length / this.state.disciplinaPorPagina)) {
            this.setState({
                atualPagina: Math.ceil(this.state.disciplinas.length / this.state.disciplinaPorPagina)
            })
        }
    }

    constructor() {
        super()
        this.disciplinaService = new DisciplinaService()
    }

    componentDidMount() {
        const alunoLogado = LocalStorageService.obterItem('_aluno_logado')

        this.disciplinaService.lista(alunoLogado.id)
            .then(response => {
                this.setState({ disciplinas: response.data })
            }).catch(error => {
                msgErro('Erro ao encontrar a lista de disciplinas')
            })
    }

    buscar = () => {
        if (!this.state.nome) {
            msgAlerta('O campo nome não pode ser vazio')
            this.componentDidMount()
            return false
        }

        const alunoLogado = LocalStorageService.obterItem('_aluno_logado')

        const disciplina = {
            nome: this.state.nome,
            aluno: alunoLogado.id
        }

        this.disciplinaService.consultar(disciplina)
            .then(response => {
                if (response.data.length < 1) {
                    msgAlerta('Nenhum resultado encotrado')
                }
                this.setState({ disciplinas: response.data })
            }).catch(error => {
                msgErro(error.response.data)
                console.log(error.response)
            })
    }

    voltar = () => {
        this.props.history.push('/cadastro-disciplina')
    }

    excluir = (id) => {
        const alunoLogado = LocalStorageService.obterItem('_aluno_logado')

        this.disciplinaService
            .deletar(alunoLogado.id, id)
            .then(response => {
                if (response.data != null) {
                    msgSucesso('Disciplina excluído com sucesso')
                    this.setState({
                        disciplinas: this.state.disciplinas
                            .filter(disciplina => disciplina.id !== id)
                    })
                }
            }).catch(error => {
                msgErro(error.response.data.titulo)
            })
    }

    edicao = (id) => {
        const alunoLogado = LocalStorageService.obterItem('_aluno_logado')
        this.props.history.push(`/cadastro-disciplina/${alunoLogado.id}/${id}`)
    }

    render() {
        const { disciplinas, atualPagina, disciplinaPorPagina } = this.state

        const ultimaIndex = atualPagina * disciplinaPorPagina
        const primeiraIndex = ultimaIndex - disciplinaPorPagina
        const atualDisciplina = disciplinas.slice(primeiraIndex, ultimaIndex)
        const total = Math.ceil(disciplinas.length / disciplinaPorPagina)

        return (
            <Card title="Buscar disciplinas">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="bs-component">
                            <FormGroup id="buscar" label="Buscar nome : " htmlFor="buscar">
                                <input type="text"
                                    className="form-control"
                                    value={this.state.nome}
                                    onChange={(e) => this.setState({ nome: e.target.value })}
                                    id="buscar" name="buscar"
                                    aria-describedby="buscarHelp" placeholder="Digite sua busca"></input>
                            </FormGroup>
                            <button
                                className="btn btn-success" onClick={this.buscar}>
                                Procurar
                            </button>
                            <button style={{ marginLeft: '20px' }}
                                className="btn btn-danger" onClick={this.voltar}>
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="jumbotron">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <table className="table table-hover">
                                    <thead>
                                        <tr className="table-secondary">
                                            <th scope="col">Código</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Editar</th>
                                            <th scope="col">Deletar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            disciplinas.length ?
                                                atualDisciplina.map(disciplina => {
                                                    return (
                                                        <tr key={disciplina.id}>
                                                            <td>{disciplina.id}</td>
                                                            <td>{disciplina.nome}</td>
                                                            <td><button title="Editar"
                                                                className="btn btn-primary"
                                                                onClick={this.edicao.bind(this, disciplina.id)}>
                                                                <i className="pi pi-pencil"></i>
                                                            </button></td>
                                                            <td><button title="Deletar"
                                                                className="btn btn-primary"
                                                                onClick={this.excluir.bind(this, disciplina.id)}
                                                            >
                                                                <i className="pi pi-trash"></i>
                                                            </button></td>
                                                        </tr>
                                                    )
                                                }) : null
                                        }
                                    </tbody>
                                </table>
                                <footer>
                                    <div style={{ float: 'left' }}>
                                        Página {atualPagina} de {total}
                                    </div>
                                    <div style={{ float: 'right' }}>
                                        <ul className="pagination pagination-lg">
                                            <li className="page-item active">
                                                <button type="button" className="page-link"
                                                    disabled={atualPagina === 1 ? true : false} onClick={this.primeiraPagina}
                                                >Primeira</button>
                                            </li>
                                            <li className="page-item">
                                                <button type="button" className="page-link"
                                                    disabled={atualPagina === 1 ? true : false} onClick={this.anteriorPagina}
                                                >Anterior</button>
                                            </li>
                                            <li className="page-item">
                                                <button type="button" className="page-link"
                                                    disabled={atualPagina === total ? true : false} onClick={this.proximaPagina}
                                                >Próxima</button>
                                            </li>
                                            <li className="page-item">
                                                <button type="button" className="page-link"
                                                    disabled={atualPagina === total ? true : false} onClick={this.ultimaPagina}
                                                >Última</button>
                                            </li>
                                        </ul>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default ConsultaDisciplina