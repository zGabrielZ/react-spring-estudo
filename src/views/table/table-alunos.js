import React from 'react'
import AlunoService from '../../services/aluno-services'
import { msgErro } from '../../componentes/toastr'

class TableAlunos extends React.Component {


    state = {
        alunos: [],
        atualPagina: 1,
        alunoPorPagina: 5
    }

    constructor() {
        super()
        this.alunoService = new AlunoService()
    }


    componentDidMount() {
        this.alunoService.lista()
            .then(response => {
                this.setState({ alunos: response.data })
            }).catch(error => {
                msgErro('Erro ao encontrar a lista de alunos')
            })
    }

    primeiraPagina = () =>{
        if(this.state.atualPagina>1){
            this.setState({
                atualPagina:1
            })
        }
    }

    anteriorPagina = () =>{
        if(this.state.atualPagina>1){
            this.setState({
                atualPagina:this.state.atualPagina - 1
            })
        }
    }

    proximaPagina = () =>{
        if(this.state.atualPagina<Math.ceil(this.state.alunos.length/this.state.alunoPorPagina)){
            this.setState({
                atualPagina:this.state.atualPagina + 1
            })
        }
    }

    ultimaPagina = () =>{
        if(this.state.atualPagina<Math.ceil(this.state.alunos.length/this.state.alunoPorPagina)){
            this.setState({
                atualPagina:Math.ceil(this.state.alunos.length/this.state.alunoPorPagina)
            })
        }
    }

    render() {

        const { alunos, atualPagina, alunoPorPagina } = this.state
        const ultimaIndex = atualPagina * alunoPorPagina
        const primeiraIndex = ultimaIndex - alunoPorPagina
        const atualAlunos = alunos.slice(primeiraIndex, ultimaIndex)
        const total = Math.ceil(alunos.length / alunoPorPagina)

        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr className="table-secondary">
                            <th scope="col">Código</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Data do cadastro</th>
                            <th scope="col">Data de nascimento</th>
                            <th scope="col">Sexo</th>
                            <th scope="col">Ensino</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            alunos.length ?
                                atualAlunos.map(aluno => {
                                    return (
                                        <tr key={aluno.id}>
                                            <td>{aluno.id}</td>
                                            <td>{aluno.nomeCompleto}</td>
                                            <td>{aluno.dataCadastro}</td>
                                            <td>{aluno.dataNascimento}</td>
                                            <td>{aluno.sexo}</td>
                                            <td>{aluno.ensino}</td>
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
                                disabled={atualPagina === 1?true:false} onClick={this.primeiraPagina}
                                >Primeira</button>
                            </li>
                            <li className="page-item">
                                <button type="button" className="page-link"
                                disabled={atualPagina === 1?true:false} onClick={this.anteriorPagina}
                                >Anterior</button>
                            </li>
                            <li className="page-item">
                                <button type="button" className="page-link"
                                 disabled={atualPagina === total?true:false} onClick={this.proximaPagina}
                                >Próxima</button>
                            </li>
                            <li className="page-item">
                                <button type="button" className="page-link"
                                 disabled={atualPagina === total?true:false} onClick={this.ultimaPagina}
                                >Última</button>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>
        )
    }
}

export default TableAlunos

