import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name:'filterSales'
})

export class FilterSales implements PipeTransform {
    transform(items:any, criteria:any) : any {
        if (!criteria) return items;
        return items.filter(function(item){
            var a = item.amount.includes(criteria.toLowerCase());
            var t = item.idTicket.includes(criteria.toLowerCase());
            return (a||t);
        });
    }
}