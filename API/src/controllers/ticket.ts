
import { AppDataSource } from "@database/db";
import { Ticket } from "@models/Ticket";
import { ResponseBase } from "@controllers/utils/Response";

const ticketRepository = AppDataSource.getRepository(Ticket)
async function getTicket(): Promise<ResponseBase<Ticket>>{
    const ticket = await ticketRepository.find();
    console.log(ticket);
    const resp: ResponseBase<Ticket> = {
        Data: null,
        DataList: ticket,
        Message: 'Tickets registrados',
        Success: true
    }
    return resp
    
} 

async function saveTicket(ticket:Ticket): Promise<ResponseBase<Ticket>> {
    try {
        ticketRepository.save(ticket);
        const resp: ResponseBase<Ticket> = {
            Data: ticket,
            DataList: null,
            Message: 'Ticket guardado',
            Success: true
        }
        return resp
    } catch (error) {
        console.log(error);
        const resp: ResponseBase<Ticket> = {
            Data: ticket,
            DataList: null,
            Message: "Error al guardar ticker: "+error,
            Success: true
        }
        return resp
    }
   
}
const TicketController= {getTicket, saveTicket}
export default TicketController;

