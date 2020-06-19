import React from 'react'
import NavBarItem from '../componentes/navBarItem'


class NavBarDrop extends React.Component {


    state = {
        displayMenu: false
    }

    constructor(){
        super()

        this.mostrarDropMenu = this.mostrarDropMenu.bind(this)
        this.esconderDropMenu = this.esconderDropMenu.bind(this)

    }

    mostrarDropMenu(e) {
        e.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.esconderDropMenu)
        })
    }

    esconderDropMenu() {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.esconderDropMenu)
        })
    }

    render() {
        return (
            <li className="nav-item dropdown">
                <a  onClick={this.mostrarDropMenu} className="nav-link dropdown-toggle" data-toggle="dropdown"
                    role="button" aria-haspopup="true" aria-expanded="false" href={this.props.href}>{this.props.label}</a>


              {
                  this.state.displayMenu?(
                      <ul>
                        <NavBarItem label="Aluno" href="#/cadastro-aluno"/>
                        <NavBarItem label="Disciplina" href="#/cadastro-disciplina"/>
                        <NavBarItem label="Buscar disciplina" href="#/consulta-disciplina"/>
                        <NavBarItem label="Estudo" href="#/cadastro-estudo"/>
                      </ul>
                  ):
                  (
                      null
                  )
              }  


            </li>
        )
    }


}

export default NavBarDrop