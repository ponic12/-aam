export class Movement {
  id?:string;
  idClient:string;
  idTicket?:string;
  fullName?:string;
  cp:string = "EF";
  datetime:number= new Date().getTime();
  type:string='D';
  amount:number = 0;
}

