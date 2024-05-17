import { Person } from "@models/Person";
import { AppDataSource } from "@database/db";
import { ResponseBase } from "@controllers/utils/Response";
import ApiKhipu, { NewPurchaseResponse } from "src/services/ApiKhipu";
import { Purchase } from "@models/Purchase";
import { PurchaseRequest } from "@dto/PurchaseRequest";
import { Ticket } from "@models/Ticket";

const purchaseRepository = AppDataSource.getRepository(Purchase);
const personRepository = AppDataSource.getRepository(Person);
const ticketRepository = AppDataSource.getRepository(Ticket);

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
    if (
      (await personRepository.findOne({ where: { rut: person.rut } })) == null
    ) {
      await personRepository.save(person);
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
const PurchaseController = { getPurchase, createNewPurchase };
export default PurchaseController;
