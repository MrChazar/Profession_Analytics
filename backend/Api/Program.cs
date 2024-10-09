using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using backend.Infrastructure.Data;
using backend.Domain.Entities;
using backend.Application.Interfaces;
using backend.Application.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();


builder.Services.AddSingleton<IMongoClient>(s =>
{
    return new MongoClient("mongodb://localhost:27017/Job_Analytics");
});

builder.Services.AddScoped<IJobService, JobService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy => policy.AllowAnyHeader()
        .AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000"));
});

builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseCors();

app.UseAuthorization();

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
