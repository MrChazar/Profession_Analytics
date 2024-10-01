from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import time
import keyboard
import json
import re
import os


def fetch_jobs_with_scroll(url, driver):

    print(f"ten {driver}")
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

        try:
            driver.find_element(By.CLASS_NAME, 'footer_youtube_link')
        except Exception as e:
            print("Nieznaleziono")
        else:
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
    edge_options.binary_location = r'C:\Program Files (x86)\Microsoft\Edge\Application\new_msedge.exe'
    driver_service = Service(
        r'C:\Users\jakub\OneDrive\Dokumenty\GitHub\Profession_Analytics\Scrappers\RocketJobs_Scrapper\edgedriver_win64\msedgedriver.exe')  # you must change to your webdriver location
    edge_options.set_capability("ms:edgeOptions", capabilities)
    driver = webdriver.Edge(service=driver_service, options=edge_options)
    return driver


def load_existing_jobs(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            try:
                return json.load(file)
            except json.JSONDecodeError:
                return []  # Zwróć pustą listę, jeśli plik jest pusty lub uszkodzony
    return []


def save_jobs(file_path, jobs):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(jobs, file, ensure_ascii=False, indent=2)


if __name__ == '__main__':

    driver = set_up_webdriver()
    url = 'https://rocketjobs.pl'

    jobs = fetch_jobs_with_scroll(url, driver)

    try:
        existing_jobs = load_existing_jobs("jobs.json")
    except:
        with open('jobs.json', 'w', encoding='utf-8') as file:
            json.dump(jobs, file, ensure_ascii=False, indent=2)
    else:
        existing_slugs = {job['slug'] for job in existing_jobs}
        existing_dates = {job['publishedAt'] for job in existing_jobs}
        for new_job in jobs:
            if new_job['slug'] not in existing_slugs and new_job['publishedAt'] not in existing_slugs:
                existing_jobs.append(new_job)  # Dodaj nową ofertę pracy do listy
        save_jobs("jobs.json", existing_jobs)

    driver.quit()

    for job in jobs:
        print(f"Oferta: {job.get('title', 'Brak tytułu')}, Firma: {job.get('companyName', 'Brak nazwy firmy')}, "
              f"Lokalizacja: {job.get('city', 'Brak lokalizacji')}, Wynagrodzenie: {job.get('employmentTypes', 'Brak informacji')}")

    print(f"Liczba ofert: {len(jobs)}")