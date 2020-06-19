import ApiService from './api-services'

class EstudoService extends ApiService{

    constructor(){
        super('/estudos')
    }

    lista(id){
        return this.get(`/${id}/estudar`)
    }

    cadastrar(estudo){
        return this.post(`/`,estudo)
    }

    atualizarStatusParalisar(id,status){
        return this.put(`/${id}/paralisada`,{status})
    }

    atualizarStatusFinalizar(id,status,fim){
        return this.put(`/${id}/finalizar`,{status,fim})
    }

    atualizarStatusReiniciar(id,status){
        return this.put(`/${id}/reiniciar`,{status})
    }

    deletar(idAluno,idEstudo){
        return this.delete(`/${idAluno}/estudar/${idEstudo}`)
    }

}

export default EstudoService