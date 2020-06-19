import React from 'react'
import NavBarItem from './navBarItem'
import NavBarDrop from './navBarDrop'

import { AuthConsumer } from '../main/provedor-autenticacao'

function NavBar(props) {
    if(props.isAlunoAutenticado){
        return (
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
                <a className="navbar-brand" href="#/home">Spring Estudo</a>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                 aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav mr-auto">
                        <NavBarItem label="Home" href="#/home"/>
                        <NavBarDrop label="Cadastros"/>
                        <NavBarItem label="Horário de estudo" href="#/consulta-estudo"/>
                        <NavBarItem label="Sobre" href="#/sobre"/>
                        <NavBarItem onClick={props.deslogar} label="Sair" href="#/login"/>
                    </ul>
                </div>
            </nav>
        )
    }
    else{
        return false
    }
}

export default () =>(
    <AuthConsumer>
        {
            (context) => (<NavBar isAlunoAutenticado={context.isAutenticado} deslogar={context.encerrarSessao}  />)
        }
    </AuthConsumer>
)