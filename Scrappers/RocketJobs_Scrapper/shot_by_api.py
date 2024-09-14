from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import time
from browsermobproxy import Server
import json
import  re


def fetch_jobs_with_scroll(url, driver, proxy):
    # Startowanie serwera BrowserMobProxy i tworzenie HAR dla monitorowania
    proxy.new_har("rocketjobs")

    driver.get(url)
    SCROLL_PAUSE_TIME = 5  # Czas pauzy na załadowanie elementów po scrollowaniu

    # Skryt do Nadpisanie XMLHttpRequest do przechwytywania odpowiedzi XHR
    driver.execute_script("""
                    (function() {
                        var oldXHR = window.XMLHttpRequest;
                        function newXHR() {
                            var realXHR = new oldXHR();
                            realXHR.addEventListener("readystatechange", function() {
                                if(realXHR.readyState == 4 && realXHR.status == 200) {
                                    console.log(realXHR.responseText);
                                }
                            }, false);
                            return realXHR;
                        }
                        window.XMLHttpRequest = newXHR;
                    })();
                """)

    all_jobs = []
    
    while True:
        time.sleep(5)
        # Zbieranie logów konsoli z przeglądarki
        logs = driver.get_log('browser')

        for entry in logs:
            if entry['level'] == "INFO":
                # Usuwanie nadmiarowych znaków ucieczki
                text = entry['message']
                # Usuwanie nadmiarowych znaków ucieczki
                cleaned_text = text.replace('\\\"', '\"').replace('\\\\', '\\')

                # Ekstrakcja JSON
                json_text = re.search(r'\{.*\}', cleaned_text).group()

                # Parsowanie JSON
                data = json.loads(json_text)

                # Wyświetlanie
                print(json.dumps(data, indent=2, ensure_ascii=False))

    return all_jobs


if __name__ == '__main__':
    # Konfiguracja BrowserMobProxy
    bmp_path = r'C:\Users\kubag\Documents\GitHub\browser-mob\browsermob-proxy-2.1.4\bin\browsermob-proxy.bat'  # Zmień na ścieżkę do BrowserMobProxy
    server = Server(bmp_path)
    server.start()
    proxy = server.create_proxy()

    # Konfiguracja przeglądarki
    # enable browser logging
    capabilities = DesiredCapabilities.EDGE
    capabilities['ms:loggingPrefs'] = {'browser': 'ALL'}
    capabilities['acceptInsecureCerts'] = bool(True)

    # load the desired webpage
    edge_options = Options()
    edge_options.add_argument('--ignore-certificate-errors')
    edge_options.add_argument('--allow-running-insecure-content')
    edge_options.add_argument('--proxy-server={0}'.format(proxy.proxy))
    edge_options.use_chromium = True
    edge_options.binary_location = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    driver_service = Service(r'C:\Users\kubag\Documents\GitHub\msedgedriver.exe')
    edge_options.set_capability("ms:edgeOptions", capabilities)

    driver = webdriver.Edge(service=driver_service, options=edge_options)



    # URL strony, z której chcesz pobierać oferty
    url = 'https://rocketjobs.pl'

    # Pobieranie ofert pracy
    jobs = fetch_jobs_with_scroll(url, driver, proxy, )

    # Zamykamy przeglądarkę
    driver.quit()

    # Zatrzymywanie serwera BrowserMobProxy
    server.stop()

    # Wyświetlanie ofert pracy
    for job in jobs:
        print(f"Oferta: {job.get('title', 'Brak tytułu')}, Firma: {job.get('companyName', 'Brak nazwy firmy')}, "
              f"Lokalizacja: {job.get('city', 'Brak lokalizacji')}, Wynagrodzenie: {job.get('employmentTypes', 'Brak informacji')}")

    print(f"Liczba ofert: {len(jobs)}")
