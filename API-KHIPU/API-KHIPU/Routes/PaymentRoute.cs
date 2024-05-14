using API_KHIPU.Service;
using Khipu.Api;
using Khipu.Model;

namespace API_KHIPU.Routes
{
    public static class PaymentRoute
    {   
        public static void Payment(WebApplication app) 
        {
            

            app.MapPost("/pruebaPayment", () =>
            {
                return "Prueba Payment";    

            });

            app.MapPost("/newPurchase", (NewPurchaseRequest purchase, PaymentService _paymentService) =>
            {

                
                return _paymentService.CreateNewPurchase(purchase);

            });
        }


    }

    public class NewPurchaseRequest
    {
        public int Id { get; set; }
        public string ReturnUrl { get; set; }
        public string CancelUrl { get; set; }
        public string NotifyUrl { get; set; }   
    }

    public class NewPurchaseResponse
    {
        public string urlPaymentKhipu { get; set; }
        public string paymentId { get; set; }
        public bool success { get; set; } = false;
    }

}
