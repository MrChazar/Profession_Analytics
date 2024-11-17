# Build Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS build
workdir /source
COPY ../ ./
RUN dotnet restore "./Profession_Analytics.API/Profession_Analytics.API.csproj" -- disable-parallel
RUN dotnet publish "./Profession_Analytics.API/Profession_Analytics.API.csproj" -c Release -o /app/publish  --no-restore

# Serve Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app ./

EXPOSE 5000

ENTRYPOINT ["dotnet", "Profession_Analytics.API.dll"]