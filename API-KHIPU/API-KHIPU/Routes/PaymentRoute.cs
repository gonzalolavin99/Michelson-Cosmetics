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

            app.MapPost("/newPurchase", (NewPurchaseRequest purchase, PaymentService _paymentService) =>
            {

                
                return _paymentService.CreateNewPurchase(purchase);

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
        public class PaymentsResponse3
    {
    
        public string payment_id { get; set; }

        public string payment_url { get; set; }

        public string simplified_transfer_url { get; set; }

  
        public string transfer_url { get; set; }

        public string webpay_url { get; set; }


        public string hites_url { get; set; }


        public string payme_url { get; set; }

        public string app_url { get; set; }

        
        public bool? ready_for_terminal { get; set; }


        public string notification_token { get; set; }

        public long? receiver_id { get; set; }

        public DateTime? conciliation_date { get; set; }
        public string subject { get; set; }

        public double? amount { get; set; }
        public string currency { get; set; }
        public string status { get; set; }
        public string status_detail { get; set; }
        public string body { get; set; }
        public string picture_url { get; set; }
        public string receipt_url { get; set; }
        public string return_url { get; set; }
        public string cancel_url { get; set; }
        public string notify_url { get; set; }
        public string notify_api_version { get; set; }
        public DateTime? expires_date { get; set; }
        public List<string> attachment_urls { get; set; }
        public string bank { get; set; }
        public string bank_id { get; set; }
        public string payer_name { get; set; }
        public string payer_email { get; set; }
        public string personal_identifier { get; set; }
        public string bank_account_number { get; set; }
        public bool? out_of_date_conciliation { get; set; }
        public string transaction_id { get; set; }
        public string custom { get; set; }
        public string responsible_user_email { get; set; }
        public bool? send_reminders { get; set; }
        public bool? send_email { get; set; }
        public string payment_method { get; set; }
        public string funds_source { get; set; }
       
    }
}
