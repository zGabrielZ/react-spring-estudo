import React from 'react'
import Card from '../componentes/card'
import DisciplinaService from '../services/disciplina-service'
import EstudoService from '../services/estudo-service'
import LocalStorageService from '../services/localStorage-services'
import { msgErro, msgSucesso } from '../componentes/toastr'

class ConsultaEstudo extends React.Component {

    state = {
        estudos: [],
        atualPagina: 1,
        estudoPorPagina: 5
    }

    constructor() {
        super()
        this.disciplinaService = new DisciplinaService()
        this.estudoService = new EstudoService()
    }

    componentDidMount() {
        const alunoLogado = LocalStorageService.obterItem('_aluno_logado')

        this.estudoService.lista(alunoLogado.id)
            .then(response => {
                this.setState({ estudos: response.data })
            }).catch(error => {
                msgErro('Erro ao encontrar a lista de estudos')
            })
    }

    voltar = () => {
        this.props.history.push('/home')
    }

    cadastro = () => {
        this.props.history.push('/cadastro-estudo')
    }

    alterarStatusParalisar = (estudo, status) => {
        this.estudoService.atualizarStatusParalisar(estudo.id, status)
            .then(response => {
                const estudos = this.state.estudos
                const index = estudos.indexOf(estudo)
                if (index !== -1) {
                    estudo['statusEstudo'] = status
                    estudos[index] = estudo
                    this.setState({ estudo })
                }
                msgSucesso('Status paralisado com sucesso!')
            }).catch(error => {
                msgErro(error.response.data.titulo)
            })
    }

    alterarStatusReinicio = (estudo, status) => {
        this.estudoService.atualizarStatusReiniciar(estudo.id, status)
            .then(response => {
                const estudos = this.state.estudos
                const index = estudos.indexOf(estudo)
                if (index !== -1) {
                    estudo['statusEstudo'] = status
                    estudos[index] = estudo
                    this.setState({ estudo })
                }
                msgSucesso('Status reiniciado com sucesso!')
            }).catch(error => {
                msgErro(error.response.data.titulo)
            })
    }

    alterarStatusFinalizar = (estudo, status, horario) => {
        this.estudoService.atualizarStatusFinalizar(estudo.id, status)
            .then(response => {
                const estudos = this.state.estudos
                const index = estudos.indexOf(estudo)
                if (index !== -1) {
                    estudo['statusEstudo'] = status
                    estudo['dataFim'] = horario
                    estudos[index] = estudo
                    this.setState({ estudo })
                }
                msgSucesso('Status finalizado com sucesso!')
            }).catch(error => {
                msgErro(error.response.data.titulo)
            })
    }

    data = () => {
        let dia = new Date()
        var diaSemana = dia.getDate()
        var mes = dia.getMonth()
        var ano = dia.getFullYear()
        var horas = dia.getHours()
        var minutos = dia.getMinutes()
        return (`${diaSemana}/${1 + mes}/${ano} ${horas}:${minutos}`)
    }

    excluir = (id) => {
        const alunoLogado = LocalStorageService.obterItem('_aluno_logado')

        this.estudoService
            .deletar(alunoLogado.id, id)
            .then(response => {
                if (response.data != null) {
                    msgSucesso('Estudo excluído com sucesso')
                    this.setState({
                        estudos: this.state.estudos
                            .filter(estudo => estudo.id !== id)
                    })
                }
            }).catch(error => {
                msgErro(error.response.data.titulo)
            })
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
        if (this.state.atualPagina < Math.ceil(this.state.estudos.length / this.state.estudoPorPagina)) {
            this.setState({
                atualPagina: this.state.atualPagina + 1
            })
        }
    }

    ultimaPagina = () => {
        if (this.state.atualPagina < Math.ceil(this.state.estudos.length / this.state.estudoPorPagina)) {
            this.setState({
                atualPagina: Math.ceil(this.state.estudos.length / this.state.estudoPorPagina)
            })
        }
    }


    render() {

        const { estudos, atualPagina, estudoPorPagina } = this.state
        const ultimaIndex = atualPagina * estudoPorPagina
        const primeiraIndex = ultimaIndex - estudoPorPagina
        const atualEstudos = estudos.slice(primeiraIndex, ultimaIndex)
        const total = Math.ceil(estudos.length / estudoPorPagina)

        return (
            <div>
                <Card title="Consulta de estudo">
                    <div className="row">
                        <div className="col-md-6">
                            <button className="btn btn-success" onClick={this.cadastro}>
                                Ir para cadastro
                                </button>
                            <button style={{ marginLeft: '20px' }} onClick={this.voltar} className="btn btn-danger">
                                Voltar para home
                            </button>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <table className="table table-hover">
                                    <thead>
                                        <tr className="table-secondary">
                                            <th scope="col">Código</th>
                                            <th scope="col">Início</th>
                                            <th scope="col">Hora prevista</th>
                                            <th scope="col">Fim</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Disciplina</th>
                                            <th scope="col">Mudar status</th>
                                            <th scope="col">Deletar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            estudos.length ?
                                                atualEstudos.map(estudo => {
                                                    return (
                                                        <tr key={estudo.id}>
                                                            <td>{estudo.id}</td>
                                                            <td>{estudo.dataInicio}</td>
                                                            <td>{estudo.horasPrevista + ' horas'}</td>
                                                            <td>{estudo.dataFim}</td>
                                                            <td>{estudo.statusEstudo}</td>
                                                            <td>{estudo.disciplina.nome}</td>
                                                            <td>
                                                                <button onClick={this.alterarStatusParalisar.bind(this, estudo, 'PARALISADO')} className="btn btn-success">Paralisar</button>
                                                                <button onClick={this.alterarStatusReinicio.bind(this, estudo, 'REINICIO')} className="btn btn-danger">Reiniciar</button>
                                                                <button onClick={this.alterarStatusFinalizar.bind(this, estudo, 'TERMINADO', this.data())} className="btn btn-primary">Finalizar</button>
                                                            </td>
                                                            <td><button title="Deletar"
                                                                className="btn btn-danger"
                                                                onClick={() =>
                                                                    window.confirm(`Deseja excluir este estudo  : ${estudo.disciplina.nome} ?`) &&
                                                                    this.excluir(estudo.id)
                                                                }
                                                            >
                                                                <i className="pi pi-trash"></i>
                                                            </button></td>
                                                        </tr>
                                                    )
                                                }) : null
                                        }
                                    </tbody>
                                </table>
                                <footer className="paginacao">
                                    <div style={{ float: 'left' }}>
                                        Página {atualPagina} de {total}
                                    </div>
                                    <div className="indices">
                                        <ul className="pagination pagination-lg pages">
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
                </Card>
            </div>
        )
    }

}

export default ConsultaEstudo