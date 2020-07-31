import React from 'react';
import 'bootswatch/dist/sketchy/bootstrap.css'
import '../custom.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'

import Rotas from './rotas'
import NavBar from '../componentes/navBar';
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'

import 'jquery'
import 'popper.js'
import 'bootstrap'

import ProvedorAutenticacao from './provedor-autenticacao'

class App extends React.Component{

    render(){
      return (
        <ProvedorAutenticacao>
          <NavBar/>
        <div className="container">
          <Rotas/>
        </div>
        </ProvedorAutenticacao>
      )
    }

}

export default App;
