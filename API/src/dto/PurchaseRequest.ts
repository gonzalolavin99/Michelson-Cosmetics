import { Adress } from '@models/Adress';
import { Person } from '@models/Person';
import { Purchase } from '@models/Purchase';
import { Ticket } from '@models/Ticket';

export interface PurchaseRequest 
{
    purchase: Purchase,
    person: Person,
    tickets: Ticket[],
    adress: Adress
}