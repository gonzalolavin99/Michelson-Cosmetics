using API_KHIPU.Routes;
using Khipu.Api;
using Khipu.Client;
using Khipu.Model;
using System.Net.Mail;
using System.Net;
using System.Text.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Net.Http;
using System.Text;
using System;

namespace API_KHIPU.Service
{
    public class PaymentService
    {
        private readonly IConfiguration _configuration;
        PaymentsApi khipu = new PaymentsApi();
        private readonly HttpClient _httpClient;

        public PaymentService(IConfiguration configuration) 
        { 
            _configuration = configuration;
            _httpClient = new HttpClient();
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
                    purchase.Amount,
                    transactionId: purchase.Id.ToString(),
                    expiresDate: dt,
                    body: "Descripción de la compra",
                    pictureUrl: "https://i.pinimg.com/736x/5e/d2/a9/5ed2a9b6c9fe57781e34612b80af0aee.jpg",
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
        public async Task NotifyPurcharse(Routes.PaymentsResponse notiToken)
        {
            try
            {
                Configuration.ReceiverId = Convert.ToInt64(_configuration["ApiKhipu:recieved_id"]);
                Configuration.Secret = _configuration["ApiKhipu:secret_key"];
                Khipu.Model.PaymentsResponse purchase =  khipu.PaymentsGet(notiToken.notification_token);
                var newp = new { pass = purchase.PaymentId, idPurchase = purchase.ReceiverId };
                string jsonData = JsonSerializer.Serialize(newp);

                // Crear el contenido de la solicitud
                var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                // Enviar la solicitud POST
                HttpResponseMessage response = await _httpClient.PostAsync("http://35.183.244.41/ticket", content);

                // Asegurarse de que la solicitud fue exitosa
                response.EnsureSuccessStatusCode();

                // Leer la respuesta
                string responseBody = await response.Content.ReadAsStringAsync();
               





            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
            }

        }
    }
}
