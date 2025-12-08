using ChatVideo.Application.Interfaces.Caching;
using ChatVideo.Application.Interfaces.Hub;
using ChatVideo.Application.Interfaces.Repositories;
using ChatVideo.Application.Interfaces.Services;
using ChatVideo.Application.Services;
using ChatVideo.Infrastructure;
using ChatVideo.Infrastructure.Caching;
using ChatVideo.Infrastructure.Repositories.NoSQL;
using ChatVideo.Infrastructure.Repositories.SQL;
using ChatVideoAPI.Hub;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
using MongoDB.Driver;

namespace ChatVideoApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddSignalR();

            builder.Services.AddMemoryCache();

            //CORS Policy
            var allowedOrigins = builder.Configuration["AllowedOrigins"]
                       ?.Split(",", StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins", policy =>
                {
                    policy.WithOrigins(allowedOrigins!)
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials();
                });
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "My API",
                    Version = "v1"
                });
            });

            builder.Services.AddDbContextPool<ChatVideoSQLDbContext>(
                o => o.UseSqlServer(builder.Configuration.GetConnectionString("ChatVideoCS")));

            builder.Services.AddSingleton<IMongoClient>(sp =>
                new MongoClient(builder.Configuration.GetConnectionString("ChatVideoMongoDb")));

            builder.Services.AddScoped<IMongoDatabase>(sp =>
            {
                var client = sp.GetRequiredService<IMongoClient>();
                return client.GetDatabase(builder.Configuration.GetConnectionString("MongoDBName"));
            });

            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            builder.Services.AddScoped<IMessagesRepository, MessagesRepository>();

            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IConversationService, ConversationService>();
            builder.Services.AddScoped<IMessageService, MessageService>(); 
            builder.Services.AddScoped<ISignalRMessageNotifier, SignalRMessageNotifier>();
            builder.Services.AddSingleton<ICachingService, CachingService>();
            builder.Services.AddSingleton<UserConnectionService>();

            var app = builder.Build();

            app.UseCors("AllowSpecificOrigins");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapHub<ChatVideoHub>("/chatvideohub");

            app.MapControllers();

            app.Run();
        }
    }
}
