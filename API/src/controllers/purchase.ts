import { Person } from "@models/Person";
import { AppDataSource } from "@database/db";
import { ResponseBase } from "@controllers/utils/Response";
import ApiKhipu, { NewPurchaseResponse } from "src/services/ApiKhipu";
import { Purchase } from "@models/Purchase";
import { PurchaseRequest } from "@dto/PurchaseRequest";
import { Ticket } from "@models/Ticket";
import { NotifyRequest } from "@dto/NotifyRequest";
import { transporter } from "env";
import { Adress } from "@models/Adress";

const purchaseRepository = AppDataSource.getRepository(Purchase);
const personRepository = AppDataSource.getRepository(Person);
const ticketRepository = AppDataSource.getRepository(Ticket);
const adressRepository = AppDataSource.getRepository(Adress);

async function getPurchase(): Promise<ResponseBase<Purchase>> {
  console.log("Hola desde tickets");
  const purchase = await purchaseRepository.find();
  console.log(purchase);
  const resp: ResponseBase<Purchase> = {
    Data: null,
    DataList: purchase,
    Message: "Compras registradas",
    Success: true,
  };
  return resp;
}

async function createNewPurchase(
  purchaseRequest: PurchaseRequest
): Promise<ResponseBase<NewPurchaseResponse>> {
  try {
    let purchase = purchaseRequest.purchase;
    let person = purchaseRequest.person;
    let adress = purchaseRequest.adress;
    //Validar existencia de la persona
    if (
      (await personRepository.findOne({ where: { rut: person.rut } })) == null
    ) {
      await personRepository.save(person);
    }
    let adressOld = await adressRepository.findOne({
      where: { rutPerson: adress.rutPerson },
    });
    //Validar direccion persona
    if (adressOld !== null) {
      await adressRepository.update(adressOld.id, adress);
    } else {
      await adressRepository.save(adress);
    }
    await purchaseRepository.save(purchase);
    const responseKhipu = await ApiKhipu.NewPurchase(purchase);

    if (responseKhipu.success) {
      purchaseRequest.tickets.map(async (a) => {
        a.idPurchase = purchase.id;
        await ticketRepository.save(a);
      });

      purchase.idtransaction = responseKhipu.paymentId;
      await purchaseRepository.save(purchase);
      const resp: ResponseBase<NewPurchaseResponse> = {
        Data: responseKhipu,
        DataList: null,
        Message: "Purchase creada",
        Success: true,
      };
      return resp;
    } else {
      purchase.state = "CANCEL";
      await purchaseRepository.save(purchase);
      throw "Problemas con la api khipu";
    }
  } catch (error) {
    console.log(error);
    const resp: ResponseBase<any> = {
      Data: null,
      DataList: null,
      Message: "Error al crear purchase: " + error,
      Success: false,
    };
    return resp;
  }
}

async function notifyPurchase(
  notifyRequest: NotifyRequest
): Promise<ResponseBase<boolean>> {
  try {
    if (notifyRequest.statusPurchase == "done") {
      var purchase: Purchase | null = await purchaseRepository.findOne({
        where: { idtransaction: notifyRequest.paymentId },
      });
      if (purchase != null) {
        purchase.state = "DONE";
        purchaseRepository.save(purchase);
        var persona: Person | null = await personRepository.findOne({
          where: { rut: purchase.rutPerson },
        });
        var direccion: Adress | null = await adressRepository.findOne({
          where: { rutPerson: purchase.rutPerson },
        });
        if (persona != null && direccion !== null) {
          const ticket = await ticketRepository.find({
            where: { idPurchase: purchase.id },
          });
          const mailOptions = {
            from: "notificaciones@jrmichelson.cl",
            to: persona.email,
            subject: "Pago realizado",
            html: `<!DOCTYPE html>
              <html>
                <head>
                  <title>Compra de Tickets</title>
                  <style>
                    body {
                      color: #000000;
                      display: block;
                      font-family: "Roboto", sans-serif;
                      margin: 30px;
                      max-width: 90%;
                    }
                    h1 {
                      text-align: center;
                      color: #ffc0c7;
                    }
                    p,
                    li {
                      font-size: 18px;
                    }
                    .logo {
                      display: block;
                      margin: auto;
                      width: 200px;
                    }
                    .header{
                      display: flex;
                      justify-content: center;
                      gap: 2em;
                    }
                    .ticket-info,
                    .user-info {
                      
                      background-color: #ffc0c7;
                      color: #000000;
                      padding: 20px;
                      border-radius: 5px;
                      margin-bottom: 20px;
                    }
                    .logoJr {
                      width: 5vw;
                    }
                  </style>
                </head>
                <body>
                  <div class="header">
                  <img
                  class="logoJr"
                  src="https://i.pinimg.com/736x/5e/d2/a9/5ed2a9b6c9fe57781e34612b80af0aee.jpg"
                  alt="Logo JrMichelson"
                />
                  
                    <h1>JrMichelson SPA</h1>
                    
                  </div>
                  <p>Estimado/a ${persona.name},</p>
                  <p>
                    Gracias por tu compra. A continuación, encontrarás los detalles de tu
                    ticket:
                  </p>
              
                  <div class="user-info">
                    <p>Nombre: ${persona.name}</p>
                    <p>RUT: ${persona.rut}</p>
                    <p>Correo electrónico: ${persona.email}</p>
                    <p>Número de teléfono: ${persona.phone}</p>
                    <p>Región: ${direccion.region}</p>
                    <p>Comuna: ${direccion.commune}</p>
                    <p>Calle: ${direccion.street}</p>
                    <p>Número de casa: ${direccion.houseNumber}</p>
                    <p>Departamento: ${direccion.detail}</p>
                  </div>
              
                  <div class="ticket-info">
                    <p>Cantidad de tickets: ${ticket.length}</p>
                    <ul>
                      ${ticket.map(a=>{
                        return "<li>Ticket HASH: "+a.pass+" </li>"
                      })}
                      
                    </ul>
                    <p>Monto total: ${purchase.amount}</p>
                  </div>
              
                  <h3>Ya estás participando en el sorteo, recuerda estar atento a nuestras redes sociales!</h3>
              
                  <p>Atentamente,</p>
                  <p>JrMichelson SPA</p>
                 
                  <img
                    class="banner"
                    src="https://files.s3.amazonaws.com/assets/email-template-footer-.png"
                    alt="Banner My company"
                  />
                </body>
              </html>
              `,
          };

          await transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
              const resp: ResponseBase<boolean> = {
                Data: true,
                DataList: null,
                Message: "Se notifico al usuario ",
                Success: true,
              };
              return resp;
            } else {
              console.log(info);
              const resp: ResponseBase<boolean> = {
                Data: false,
                DataList: null,
                Message: "Error al enviar correo",
                Success: false,
              };
              return resp;
            }
          });
          const resp: ResponseBase<boolean> = {
            Data: true,
            DataList: null,
            Message: "Se notifico al usuario ",
            Success: true,
          };
          return resp;
        } else {
          const resp: ResponseBase<boolean> = {
            Data: false,
            DataList: null,
            Message: "No se encontro a la persona",
            Success: false,
          };
          return resp;
        }
      } else {
        const resp: ResponseBase<boolean> = {
          Data: false,
          DataList: null,
          Message: "No se encontro la orden de compra",
          Success: false,
        };
        return resp;
      }
    } else {
      const resp: ResponseBase<boolean> = {
        Data: false,
        DataList: null,
        Message: "Estado orden cancelado",
        Success: false,
      };
      return resp;
    }
  } catch (error) {
    console.log(error);
    const resp: ResponseBase<boolean> = {
      Data: false,
      DataList: null,
      Message: "Error al notificar purchase: " + error,
      Success: false,
    };
    return resp;
  }
}
const PurchaseController = { getPurchase, createNewPurchase, notifyPurchase };
export default PurchaseController;
