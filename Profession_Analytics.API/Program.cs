using Profession_Analytics.Application.Interfaces;
using Profession_Analytics.Application.Services;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddSingleton<IMongoClient>(s =>
{
    return new MongoClient("mongodb://localhost:27017/Job_Analytics");
});

builder.Services.AddScoped<IJobService, JobService>();
builder.Services.AddScoped<IChartService, ChartService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy => policy.AllowAnyHeader()
        .AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000"));
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseAuthorization();

app.UseHttpsRedirection();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();