import React from 'react'
import Card from '../componentes/card'
import FormGroup from '../componentes/form-group'
import DisciplinaService from '../services/disciplina-service'
import EstudoService from '../services/estudo-service'
import LocalStorageService from '../services/localStorage-services'
import { msgErro, msgSucesso, msgErroForm } from '../componentes/toastr'

class CadastroEstudo extends React.Component {

    state = {
        inicio: '',
        horas:'',
        disciplina: '',
        errorCampos: [],
        disciplinas: []
    }

    constructor() {
        super()
        this.disciplinaService = new DisciplinaService()
        this.estudoService = new EstudoService()
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

    renderizarOption() {
        return this.state.disciplinas.map(disciplina => {
            return <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
        })
    }

    voltar = () => {
        this.props.history.push('/home')
    }

    cadastrar = () => {
        const alunoLogado = LocalStorageService.obterItem('_aluno_logado')

        const estudo = {
            dataInicio: this.state.inicio,
            aluno: alunoLogado.id,
            horasPrevista:parseInt(this.state.horas),
            disciplina: parseInt(this.state.disciplina)
        }

        this.estudoService.cadastrar(estudo)
            .then(response => {
                msgSucesso('Cadastrado com sucesso !')
                this.props.history.push('/consulta-estudo')
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

    render() {
        return (
            <div>
                <Card title="Cadastro de estudo">
                    <div className="row">
                        <div className="col-md-6">
                            <FormGroup id="dataInicio" label="Início : " htmlFor="dataInicio">
                                <input type="datetime-local"
                                    className="form-control" value={this.state.inicio}
                                    onChange={e => this.setState({ inicio: e.target.value })}
                                    id="dataInicio" name="dataInicio"
                                    aria-describedby="dataInicioHelp"></input>
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <FormGroup id="horas" label="Horas prevista : ">
                            <input type="number"
                                    className="form-control" value={this.state.horas}
                                    onChange={e => this.setState({ horas: e.target.value })}
                                    id="horas" name="horas"
                                    aria-describedby="horasHelp"></input>
                            </FormGroup>
                        </div>
                        <div className="col-md-12">
                            <FormGroup id="disciplina" label="Disciplina : ">
                                <select className="form-control" id="disciplina" name="disciplina"
                                    value={this.state.disciplina}
                                    onChange={e => this.setState({ disciplina: e.target.value })}>
                                    <option value="">Selecione</option>
                                    {this.renderizarOption()}
                                </select>
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-success" onClick={this.cadastrar}>
                                Cadastrar
                                </button>
                            <button style={{ marginLeft: '20px' }} onClick={this.voltar} className="btn btn-danger">
                                Voltar para home
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }

}

export default CadastroEstudo