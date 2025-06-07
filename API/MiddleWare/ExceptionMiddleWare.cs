using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.MiddleWare;

public class ExceptionMiddleWare(RequestDelegate next, ILogger<ExceptionMiddleWare> logger,
                                 IHostEnvironment env)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var Response = env.IsDevelopment()
                ? new ApiExceptions(context.Response.StatusCode, ex.Message, ex.StackTrace)
                :  new ApiExceptions(context.Response.StatusCode, ex.Message, ex.StackTrace);
            
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };

            var json = JsonSerializer.Serialize(Response, options);

            await context.Response.WriteAsync(json);
        }
    }
}
