# New File
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

COPY ["Profession_Analytics.API/Profession_Analytics.API.csproj", "Profession_Analytics.API/"]
COPY ["Profession_Analytics.Domain/Profession_Analytics.Domain.csproj", "Profession_Analytics.Domain/"]
COPY ["Profession_Analytics.Infrastructure/Profession_Analytics.Infrastructure.csproj", "Profession_Analytics.Infrastructure/"]
COPY ["Profession_Analytics.Application/Profession_Analytics.Application.csproj", "Profession_Analytics.Application/"]
RUN dotnet restore "Profession_Analytics.API/Profession_Analytics.API.csproj"
COPY . ../
WORKDIR /Profession_Analytics.API
RUN dotnet build "Profession_Analytics.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish --no-restore -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
ENV ASPNETCORE_HTTP_PORTS=5001
EXPOSE 5001
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Profession_Analytics.API.dll"]



















