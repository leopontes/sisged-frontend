import { Escola } from './escola';

export class Turma {
    id: number;
    codigo: string;
    tipoEnsino: number;
    ano: number
    escola: Escola;
}
