import requests
from bs4 import BeautifulSoup

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
            elif (span_text not in location_text) and (span_text not in ",Praca zdalna,"):
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


if __name__ == '__main__':
    url = 'https://rocketjobs.pl'  # Przykładowy URL
    response = requests.get(url)
    html_content = response.content

    jobs = parse_jobs(html_content)
    for job in jobs:
        print(f"Oferta: {job['title']}, Firma: {job['company']}, Lokalizacja: {job['location']}, Wynagrodzenie: {job['salary']}")
    print(f"Liczba ofert {len(jobs)}")

