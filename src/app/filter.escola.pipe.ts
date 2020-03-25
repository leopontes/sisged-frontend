import { Pipe, PipeTransform } from "@angular/core";
import { Escola } from "./escola";

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Pipe({
    name:'filter'
})
export class FilterEscolaPipe implements PipeTransform{
    transform(items: Escola[], searchText: string): Escola[]{
        if(!items)return ;
        if(!searchText)return items;

        searchText = searchText.toLocaleLowerCase();

        return items.filter(it=>(
                it.nome.toLocaleLowerCase().includes(searchText) ||
                it.diretor.toLocaleLowerCase().includes(searchText) ||
                it.local.toLocaleLowerCase().includes(searchText)
            )
        );
    }
}