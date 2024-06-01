import { Adress } from "./adress";
import { Person } from "./person";
import { Ticket } from "./ticket";

export interface Purchase  {
  
    id: number;
  
    rutPerson: string;

    idtransaction: string;

    date: Date;

    amount: number;

    state: 'PENDING' | 'CANCEL' | 'DONE' ;


  }
  
export interface PurchaseRequest 
{
    purchase: Purchase,
    person: Person,
    tickets: Ticket[],
    adress: Adress
}