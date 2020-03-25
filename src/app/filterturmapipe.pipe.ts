import { Pipe, PipeTransform } from '@angular/core';
import { Turma } from './turma';

@Pipe({
  name: 'turmaFilter'
})
export class FilterturmapipePipe implements PipeTransform {

  transform(items: Turma[], searchText: string): Turma[]{
    if(!items)return ;
    if(!searchText)return items;

    searchText = searchText.toLocaleLowerCase();

    return items.filter(it=>(
            it.codigo.toLocaleLowerCase().includes(searchText) ||
            it.ano.toString().toLocaleLowerCase().includes(searchText) ||
            it.escola.nome.toLocaleLowerCase().includes(searchText)
        )
    );
}

}
