
import { AppDataSource } from "@database/db";
import { ResponseBase } from "@controllers/utils/Response";
import ApiKhipu, { NewPurchaseResponse } from "src/services/ApiKhipu";
import { Purchase } from "@models/Purchase";

const purchaseRepository = AppDataSource.getRepository(Purchase)
async function getPurchase(): Promise<ResponseBase<Purchase>>{
    console.log("Hola desde tickets")
    const purchase = await purchaseRepository.find();
    console.log(purchase);
    const resp: ResponseBase<Purchase> = {
        Data: null,
        DataList: purchase,
        Message: 'Compras registradas',
        Success: true
    }
    return resp
    
} 

async function savePurchase(purchase:Purchase): Promise<ResponseBase<NewPurchaseResponse>> {
    try {
        await purchaseRepository.save(purchase);
        const responseKhipu = await ApiKhipu.NewPurchase(purchase);
       if(responseKhipu.success){
        const resp: ResponseBase<NewPurchaseResponse> = {
            Data: responseKhipu,
            DataList: null,
            Message: 'Purchase creada',
            Success: true
        }
        return resp
       }else{
        throw "Problemas con la api khipu"
       }
       
        
    } catch (error) {
        console.log(error);
        const resp: ResponseBase<any> = {
            Data: null,
            DataList: null,
            Message: "Error al crear purchase: "+error,
            Success: true
        }
        return resp
    }
   
}
const PurchaseController= {getPurchase, savePurchase}
export default PurchaseController;

