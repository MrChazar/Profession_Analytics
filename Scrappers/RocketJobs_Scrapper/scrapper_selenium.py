from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
import time
from bs4 import BeautifulSoup


# Funkcja parsująca oferty pracy z HTML
def parse_jobs(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')

    # Znajdujemy wszystkie ogłoszenia pracy
    job_offers = soup.find_all('div', class_='MuiBox-root css-q5j1fs')
    jobs = []

    for job in job_offers:
        # Pobieranie tytułu oferty pracy
        title = job.find('h3')
        title_text = title.get_text(strip=True) if title else "Brak informacji"

        # Pobieranie lokalizacji
        location = job.find('span', class_='css-1o4wo1x')
        location_text = location.get_text(strip=True) if location else "Brak lokalizacji"

        # Pobieranie wszystkich elementów <span>
        salary_text = ""
        company_text = "Brak nazwy firmy"
        salary_company_spans = job.find_all('span')

        for span in salary_company_spans:
            span_text = span.get_text(strip=True)

            # Sprawdzanie, czy tekst jest liczbą (np. wynagrodzenie)
            if span_text.replace(' ', '').isdigit():
                salary_text += span_text + " - "
            # Sprawdzanie, czy tekst zawiera walutę (PLN, EUR)
            elif span_text in ["pln", "PLN", "eur", "EUR"]:
                salary_text += span_text
            # Jeśli to nie wynagrodzenie, przypuszczamy, że to nazwa firmy
            elif (span_text not in location_text) and (span_text not in ",Praca zdalna,") and (span_text not in "Lokalizacje,"):
                company_text = span_text

        # Sprawdzanie, czy udało się znaleźć wynagrodzenie
        if not salary_text:
            salary_text = "Brak informacji"

        # Dodawanie oferty do listy
        jobs.append({
            'title': title_text,
            'salary': salary_text.strip(),
            'location': location_text,
            'company': company_text
        })

    return jobs


def fetch_jobs_with_scroll(url, driver):
    driver.get(url)
    SCROLL_PAUSE_TIME = 50
    # Kliknięcie przycisku akceptacji plików cookie
    try:
        time.sleep(15)
        cookie_button = driver.find_element(By.ID, "cookiescript_accept")
        cookie_button.click()
    except Exception as e:
        print(f"Nie udało się kliknąć przycisku plików cookie: {e}")

    all_jobs = []
    last_height = driver.execute_script("return document.body.scrollHeight")

    while True:
        # Pobieranie zawartości strony i parsowanie ofert pracy
        page_source = driver.page_source
        jobs = parse_jobs(page_source)
        all_jobs.extend(jobs)

        # Scroll w dół strony
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

        # Czekamy na załadowanie nowych elementów
        time.sleep(SCROLL_PAUSE_TIME)

        # Sprawdzamy, czy załadowano nowe dane
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

    return all_jobs



if __name__ == '__main__':
    edge_options = Options()
    edge_options.add_argument('--headless')
    edge_options.add_argument('--no-sandbox')
    edge_options.add_argument('--disable-dev-shm-usage')
    # Wskaź do drivera Edge
    driver_service = Service(r'C:\Users\JWiesniak\Downloads\edgedriver_win64\msedgedriver.exe')

    # Uruchamiamy przeglądarkę
    driver = webdriver.Edge(service=driver_service, options=edge_options)

    # URL strony, z której chcesz pobierać oferty
    url = 'https://rocketjobs.pl'

    # Pobieranie ofert pracy
    jobs = fetch_jobs_with_scroll(url, driver)

    # Zamykamy przeglądarkę
    driver.quit()

    # Wyświetlanie ofert pracy
    for job in jobs:
        print(
            f"Oferta: {job['title']}, Firma: {job['company']}, Lokalizacja: {job['location']}, Wynagrodzenie: {job['salary']}")

    print(f"Liczba ofert: {len(jobs)}")