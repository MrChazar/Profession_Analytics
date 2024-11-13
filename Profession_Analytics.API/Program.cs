using Profession_Analytics.Application.Extensions;
using Profession_Analytics.Application.Interfaces;
using Profession_Analytics.Application.Services;
using Profession_Analytics.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplication(builder.Configuration);

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