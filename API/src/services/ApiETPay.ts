// Import ETpay module
import { ETpay } from "etpay-sdk";

// Declare global vars

// Commerce identifier provided by ETpay.
const MERCHANT_CODE = "valid_code";
// Secret token used to authenticate against the API provided by ETpay.
const MERCHANT_API_TOKEN = "valid_api_key";
// Api url provided by ETpay.
const API_URL = "valid_api_url";

// Configure module
ETpay.configure(
  MERCHANT_CODE,
  MERCHANT_API_TOKEN,
  API_URL
);

const CreateTransaction = async() => 
{
    const tx = new ETpay.Transaction(ETpay.options);

    // Create Transaction process
    const response = await tx.create({
      merchant_order_id: "oc123456",
      order_amount: 1000,
      customer_email: "mail@example.com",
      payment_completed_url: "<valid-completed-url>",
      payment_cancellation_url: "<valid-cancellation-url>",
      metadata: [
        {
          name: "Cuenta",
          value: "1111",
          show: true,
        },
      ],
    });
    return response;
}
const ApiETPay = {CreateTransaction}
export default ApiETPay;
