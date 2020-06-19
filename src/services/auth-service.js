import LocalStorageService from './localStorage-services'

export const ALUNO_LOGADO = '_aluno_logado'

export default class AuthService{


    static isAlunoAutenticado(){
        const aluno = LocalStorageService.obterItem(ALUNO_LOGADO)
        return aluno
    }

    static removerAlunoAutenticado(){
        LocalStorageService.removerItem(ALUNO_LOGADO)
    }

    static logar(aluno){
        LocalStorageService.addItem(ALUNO_LOGADO,aluno)
    }



}