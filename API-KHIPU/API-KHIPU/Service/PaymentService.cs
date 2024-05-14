using API_KHIPU.Routes;
using Khipu.Api;
using Khipu.Client;
using Khipu.Model;

namespace API_KHIPU.Service
{
    public class PaymentService
    {
        private readonly IConfiguration _configuration;
        PaymentsApi khipu = new PaymentsApi();
    

        public PaymentService(IConfiguration configuration) 
        { 
            _configuration = configuration;
        }

        public async Task<NewPurchaseResponse> CreateNewPurchase(NewPurchaseRequest purchase)
        {
            try
            {
              
                Configuration.ReceiverId = Convert.ToInt64(_configuration["ApiKhipu:recieved_id"]);
                Configuration.Secret = _configuration["ApiKhipu:secret_key"];
                DateTime dt = DateTime.Now;
                dt = dt.AddHours(2);
                PaymentsCreateResponse response = khipu.PaymentsPost(
                    "Compra de prueba de la API",
                    "CLP",
                    100.0,
                    transactionId: purchase.Id.ToString(),
                    expiresDate: dt,
                    body: "Descripción de la compra",
                    pictureUrl: "http://mi-ecomerce.com/pictures/foto-producto.jpg",
                    returnUrl: purchase.ReturnUrl,
                    cancelUrl: purchase.CancelUrl,
                    notifyUrl: purchase.NotifyUrl,
                    notifyApiVersion: "1.3"
                 );

                return new NewPurchaseResponse
                {
                    paymentId = response.PaymentId,
                    urlPaymentKhipu = response.PaymentUrl,
                    success = true
                };

            }
            catch (Exception ex)
            {
                
               return (NewPurchaseResponse)Results.BadRequest(ex.Message);
            }

        }
    }
}
