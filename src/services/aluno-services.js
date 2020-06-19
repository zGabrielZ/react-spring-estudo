import ApiService from './api-services'

class AlunoService extends ApiService{

    constructor(){
        super('/alunos/login')
    }

    autenticar(credenciais){
        return this.post('/autenticar',credenciais)
    }

    obterNome(id){
        return this.get(`/${id}`)
    }

    cadastrar(credenciais){
        return this.post('/',credenciais)
    }

    lista(){
        return this.get('/lista')
    }

    obterEnsino(){
        return[
            {label:'Selecione',value:''},
            {label:'Fundamental',value:'FUNDAMENTAL'},  
            {label:'Médio',value:'MÉDIO'},
            {label:'Superior',value:'SUPERIOR'}  
        ]
    }

    obterTipoSexo(){
        return[
            {label:'Selecione',value:''},
            {label:'Masculino',value:'MASCULINO'},  
            {label:'Feminino',value:'FEMININO'}
        ]
    }

}

export default AlunoService