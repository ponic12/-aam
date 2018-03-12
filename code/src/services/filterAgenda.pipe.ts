import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name:'filterAgenda'
})

export class FilterAgenda implements PipeTransform {
    transform(items:any, criteria:any) : any {
        if (!criteria) return items;
        return items.filter(function(item){
            var fn = item.firstName.toLowerCase().includes(criteria.toLowerCase());
            var ln = item.lastName.toLowerCase().includes(criteria.toLowerCase());
            return (fn||ln);
        });
    }
}