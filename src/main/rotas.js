import React from 'react'

import {Route,Switch,HashRouter,Redirect} from 'react-router-dom'
import Login from '../views/login'
import CadastroAluno from '../views/cadastro-aluno'
import Home from '../views/home'
import Sobre from '../views/sobre'
import ConsultaDisciplina from '../views/consulta-disciplina'
import CadastroDisciplina from '../views/cadastro-disciplina'
import CadastroEstudo from '../views/cadastro-estudo'
import ConsultaEstudo from '../views/consulta-estudo'
import { AuthConsumer } from '../main/provedor-autenticacao'


function RotaAutenticada({component:Component,isAlunoAutenticado,...props}){
    return (
        <Route {...props} render={(componentProps)=>{
            if(isAlunoAutenticado){
                return (
                    <Component {...componentProps} />
                )
            }
            else{
                return(
                    <Redirect to={{pathname:'/login',state:{from:componentProps.location}}}  />
                )
            }
        }}/>
    )
}

function Rotas(props){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/cadastro-aluno" component={CadastroAluno}></Route>
                
                <RotaAutenticada isAlunoAutenticado={props.isAlunoAutenticado} path="/consulta-disciplina" component={ConsultaDisciplina}/>
                <RotaAutenticada isAlunoAutenticado={props.isAlunoAutenticado} path="/cadastro-disciplina/:id?/:id?" component={CadastroDisciplina}/>
                <RotaAutenticada isAlunoAutenticado={props.isAlunoAutenticado} path="/cadastro-estudo" component={CadastroEstudo}/>
                <RotaAutenticada isAlunoAutenticado={props.isAlunoAutenticado} path="/consulta-estudo" component={ConsultaEstudo}/>
                <RotaAutenticada isAlunoAutenticado={props.isAlunoAutenticado} path="/home" component={Home}/>
                <RotaAutenticada isAlunoAutenticado={props.isAlunoAutenticado} path="/sobre" component={Sobre}/>
            </Switch>
        </HashRouter>
    )
}

export default () =>(
    <AuthConsumer>
        {
            (context) => (<Rotas isAlunoAutenticado={context.isAutenticado}  />)
        }
    </AuthConsumer>
)