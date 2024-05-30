using API_KHIPU.Service;
using Khipu.Api;
using Khipu.Model;
using System.Text.Json;
using System.Runtime.Serialization;
using System.Text;
using Newtonsoft.Json;
using System.Text.Json.Nodes;

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

            app.MapPost("/newPurchase", async (NewPurchaseRequest purchase, PaymentService _paymentService) =>
            {

                
                return await _paymentService.CreateNewPurchase(purchase);

            });

            app.MapPost("/notifyPurchase", async (HttpRequest request, PaymentService _paymentService) =>
            {
                

                
                var form = await request.ReadFormAsync();
                PaymentsResponse paymentsResponse = new PaymentsResponse() { 
                    notification_token = form["notification_token"].ToString(),
                    api_version = form["api_version"].ToString()
                };
                _paymentService.NotifyPurcharse(paymentsResponse);

                return Results.Ok();            });

            app.MapPost("/notifyPurchaseTest", async (HttpRequest request, PaymentService _paymentService) =>
            {



                var form = await request.ReadFormAsync();
                PaymentsResponse paymentsResponse = new PaymentsResponse()
                {
                    notification_token = form["notification_token"].ToString(),
                    api_version = form["api_version"].ToString()
                };

                return await _paymentService.NotifyPurcharseTest(paymentsResponse);

            });
        }


    }

    public class NewPurchaseRequest
    {
        public int Id { get; set; }
        public string ReturnUrl { get; set; }
        public string CancelUrl { get; set; }
        public string NotifyUrl { get; set; }
        public int Amount { get; set; }
    }

    public class NewPurchaseResponse
    {
        public string urlPaymentKhipu { get; set; }
        public string paymentId { get; set; }
        public bool success { get; set; } = false;
    }
    public class PaymentsResponse
    {
        public string notification_token { get; set; }
        public string api_version { get; set; }
    }
    public class NotifyRequest
    {
        public int receiverId { get; set; }
        public string paymentId { get; set; }
        public string statusPurchase { get; set; } 
    }

    public class LoginRequest 
    {
        public string user { get; set; }
        public string pass { get; set; }
    }
    public class ResponseBase<T>
    {
        public string Message { get; set; }
        public T Data { get; set; }
        public List<T> DataList { get; set; }
        public bool Success { get; set; }

 
    }
}
