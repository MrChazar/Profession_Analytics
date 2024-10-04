using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using backend.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSingleton<IMongoClient>(s =>
{
    return new MongoClient(builder.Configuration.GetConnectionString("MongoDB"));
});

builder.Services.AddScoped(s =>
{
    var mongoClient = s.GetRequiredService<IMongoClient>();
    var mongoDatabase = mongoClient.GetDatabase("Job_Analytics"); 
    return DatabaseContext.Create(mongoDatabase);
});

builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
