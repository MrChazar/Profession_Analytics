from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import time
import keyboard
import json
import re



def fetch_jobs_with_scroll(url, driver):

    driver.get(url)

    # Script that will print content of a call to offers api that will alow me to intercept data
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

    # When the page is loaded a cookie pop up will appear
    try:
        time.sleep(15)
        cookie_button = driver.find_element(By.ID, "cookiescript_accept")
        cookie_button.click()
    except Exception as e:
        print(f"Cookie button is not found {e}")

    while True:
        driver.execute_script("window.scrollBy(0, 500);")
        time.sleep(1)
        logs = driver.get_log('browser')

        for entry in logs:
            if entry['level'] == "INFO" and 'slug' in entry['message']:
                text = entry['message']
                cleaned_text = text.replace('\\\"', '\"').replace('\\\\', '\\')
                json_text = re.search(r'\{.*\}', cleaned_text).group()

                data = json.loads(json_text)
                for job_data in data['data']:
                    job = {}
                    for key, value in job_data.items():
                        job[key] = value if value is not None else 'brak informacji'
                    all_jobs.append(job)
        if keyboard.is_pressed('|'):
            break
    return all_jobs


def set_up_webdriver(binary_location=None, driver_location=None):
    # Enabling browser logging
    capabilities = DesiredCapabilities.EDGE
    capabilities['ms:loggingPrefs'] = {'browser': 'ALL'}
    capabilities['acceptInsecureCerts'] = bool(True)

    # Setting up our webdriver
    edge_options = Options()
    edge_options.add_argument('--ignore-certificate-errors')
    edge_options.add_argument('--allow-running-insecure-content')
    edge_options.use_chromium = True
    edge_options.binary_location = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    driver_service = Service(
        r'C:\Users\kubag\Documents\GitHub\msedgedriver.exe')  # you must change to your webdriver location
    edge_options.set_capability("ms:edgeOptions", capabilities)

    driver = webdriver.Edge(service=driver_service, options=edge_options)
    return driver

if __name__ == '__main__':

    driver = set_up_webdriver()
    url = 'https://rocketjobs.pl'

    jobs = fetch_jobs_with_scroll(url, driver)

    driver.quit()

    for job in jobs:
        print(f"Oferta: {job.get('title', 'Brak tytułu')}, Firma: {job.get('companyName', 'Brak nazwy firmy')}, "
              f"Lokalizacja: {job.get('city', 'Brak lokalizacji')}, Wynagrodzenie: {job.get('employmentTypes', 'Brak informacji')}")

    print(f"Liczba ofert: {len(jobs)}")

    with open('jobs.json', 'w', encoding='utf-8') as file:
        json.dump(jobs, file, ensure_ascii=False, indent=2)
