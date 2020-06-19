import ApiService from '../services/api-services'

class DisciplinaService extends ApiService{

    constructor(){
        super('/alunos')
    }

    lista(id){
        return this.get(`/${id}/disciplinas`)
    }

    consultar(disciplina){
        return this.post(`/${disciplina.aluno}/disciplinas/buscar-nome-disciplina?nome=${disciplina.nome}`)
    }

    cadastrar(disciplina){
        return this.post(`/disciplinas/inserir`,disciplina)
    }

    atualizar(disciplina){
        return this.put(`/${disciplina.aluno}/disciplinas/${disciplina.id}/atualizar`,disciplina)
    }

    deletar(idAluno,idDisciplina){
        return this.delete(`/${idAluno}/disciplinas/${idDisciplina}`)
    }

    obterId(idAluno,idDisciplina){
        return this.get(`/${idAluno}/disciplinas/${idDisciplina}`)
    }

}

export default DisciplinaService