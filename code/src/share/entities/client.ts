export class Client {
  id?:string;
  firstName:string;
  lastName:string;
  fullName:string;
  address?:string;
  email?:string;
  telephone?:string;
  balance:number = 0;
  sales:number = 0;
  lastDatePaid?:number = new Date().getTime();
  birthday?:number = new Date().getTime();
}

