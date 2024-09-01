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
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace API_KHIPU.Service
{
    public class PaymentService
    {
        private readonly IConfiguration _configuration;
        PaymentsApi khipu = new PaymentsApi();
        private readonly HttpClient _httpClient;
        private readonly ILogger<PaymentService> _logger;

        public PaymentService(IConfiguration configuration, ILogger<PaymentService> logger) 
        { 
            _configuration = configuration;
            _httpClient = new HttpClient();
            _logger = logger;
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
                var newp = new NotifyRequest { paymentId = purchase.PaymentId, receiverId = (int)purchase.ReceiverId, statusPurchase = purchase.Status };
                string jsonData = System.Text.Json.JsonSerializer.Serialize(newp);

        
                var login = new LoginRequest { user = _configuration["ApiJrMichelson:user"], pass = _configuration["ApiJrMichelson:pass"] };
                string jsonDataLogin = System.Text.Json.JsonSerializer.Serialize(login);
                var contentLogin = new StringContent(jsonDataLogin, Encoding.UTF8, "application/json");
                _httpClient.DefaultRequestHeaders.Add("Origin", _configuration["ApiJrMichelson:origin"]);
                HttpResponseMessage responseLogin = await _httpClient.PostAsync(_configuration["ApiJrMichelson:url"]+"login", contentLogin);
                string responseContent = await responseLogin.Content.ReadAsStringAsync();
                _logger.LogInformation("Respuesta Login ApiJrMichelson: "+responseContent);

                ResponseBase<string> responseData = JsonConvert.DeserializeObject<ResponseBase<string>>(responseContent);
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", responseData.Data);
                var content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await _httpClient.PostAsync(_configuration["ApiJrMichelson:url"] + "purchase/notifyPurchase", content);

                // Asegurarse de que la solicitud fue exitosa
                response.EnsureSuccessStatusCode();

                // Leer la respuesta
                string responseBody = await response.Content.ReadAsStringAsync();
               


            }
            catch (Exception ex)
            {
                _logger.LogInformation("Error notify: " + ex.Message+" "+ex.InnerException.Message);
                Console.WriteLine(ex);
            }

        }
        public async Task<string> NotifyPurcharseTest(Routes.PaymentsResponse notiToken)
        {
            try
            {
                Configuration.ReceiverId = Convert.ToInt64(_configuration["ApiKhipu:recieved_id"]);
                Configuration.Secret = _configuration["ApiKhipu:secret_key"];
              
                var newp = new NotifyRequest { paymentId = "prueba", receiverId = 1, statusPurchase = "done" };
                string jsonData = System.Text.Json.JsonSerializer.Serialize(newp);
                _httpClient.DefaultRequestHeaders.Add("Origin", _configuration["ApiJrMichelson:origin"]);
                // Crear el contenido de la solicitud
                var login = new LoginRequest { user = _configuration["ApiJrMichelson:user"], pass = _configuration["ApiJrMichelson:pass"] };
                string jsonDataLogin = System.Text.Json.JsonSerializer.Serialize(login);
                var contentLogin = new StringContent(jsonDataLogin, Encoding.UTF8, "application/json");

                HttpResponseMessage responseLogin = await _httpClient.PostAsync(_configuration["ApiJrMichelson:url"] + "login", contentLogin);
                string responseContent = await responseLogin.Content.ReadAsStringAsync();
                _logger.LogInformation("Se consume ApiJrMichelson con el siguiente Origin: " + _configuration["ApiJrMichelson:origin"]);
                _logger.LogInformation("Respuesta Login ApiJrMichelson: " + responseContent);
                // Deserializar la respuesta JSON a un objeto
                ResponseBase<string> responseData = JsonConvert.DeserializeObject<ResponseBase<string>>(responseContent);
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", responseData.Data);
                
                var content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await _httpClient.PostAsync(_configuration["ApiJrMichelson:url"] + "purchase/notifyPurchase", content);

                // Asegurarse de que la solicitud fue exitosa
                response.EnsureSuccessStatusCode();

                // Leer la respuesta
                string responseBody = await response.Content.ReadAsStringAsync();
                _logger.LogInformation("Respuesta Notify ApiJrMichelson: " + responseBody);
                return responseBody;

            }
            catch (Exception ex)
            {
                _logger.LogInformation("Error notify test: " + ex.Message + " " + ex.InnerException.Message);
                Console.WriteLine(ex);
                return ex.Message;
            }

        }
    }
}
