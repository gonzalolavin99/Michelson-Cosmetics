using API_KHIPU.Routes;
using API_KHIPU.Service;
using NLog;
using NLog.Web;

var builder = WebApplication.CreateBuilder(args);
var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("Init log");
try
{
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Host.UseNLog();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    //Services

    builder.Services.AddScoped<PaymentService>();

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();


    PaymentRoute.Payment(app);

    app.Run();
}
catch (Exception ex)
{
    logger.Error(ex, "Se detuvo API Tricahue ME, hubo una excepcion");

    throw;
}

finally
{
    LogManager.Shutdown();
}

