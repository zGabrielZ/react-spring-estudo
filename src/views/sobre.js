import React from 'react'
import TableAlunos from './table/table-alunos'
import '../css/sobre-estilo.css'

class Sobre extends React.Component {

    render() {

         

        return (
            <div className="jumbotron">
                <div className="jumbotron">
                    <h1 className="display-3">Spring Estudo</h1>
                    <p className="lead">Esta aplicação foi desenvolvida para ajudar alunos de qualquer ensino
                    (fundamental até superior), caso alguem esteja perdido nos horário de estudar, poderá extrair o máximo
                    do sistema marcando o dia para estudar suas matérias prediletas.
                </p>

                    <p className="desenvolvido" >Desenvolvido por Gabriel Ferreira</p>

                </div>

                

                <div className="jumbotron">
                     <h2>Podemos ver também alunos cadastrados no sistema</h2>
                        <br/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <TableAlunos/>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        )
    }
}

export default Sobre