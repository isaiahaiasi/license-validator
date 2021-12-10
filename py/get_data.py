from bs4 import BeautifulSoup
import requests
import json
from unicodedata import normalize

def get_html(path):
    return requests.get(path).text


def get_data(html):
    bs = BeautifulSoup(html, 'html.parser')
    data = []

    for tr in bs.tbody.find_all('tr'):
        tds = get_tds(tr)
        if len(tds):
            data.append(get_state(tds))

    return data


def get_tds(tr):
    return [td for td in tr.find_all('td') if normalize("NFKD", td.text).strip() != '']


def get_state(tds):
    state, abbr = get_state_text(tds[3])
    return {
        'state': state,
        'abbr': abbr,
        'regexp': get_regex_list(tds[2])
    }


def clean_regex_str(regstr: str):
    return regstr.replace("\\\\", "\\")


def get_regex_list(td):
    return [rs.replace("\"", "").strip() for rs in clean_regex_str(td.text).split('\",')]


def get_state_text(td):
    lis = [li.text for li in td.find_all('li')]
    full = lis[0]
    # there are bs ones, & order isn't consistent
    abbr = [li for li in lis if len(li) == 2][0]
    return full, abbr


def save_as_json(data, outputPath):
    with open(outputPath, "w") as fp:
        json.dump(data, fp)


if __name__ == "__main__":
    url = 'https://success.myshn.net/Policy/Data_Identifiers/U.S._Driver%27s_License_Numbers'
    data = get_data(get_html(url))
    save_as_json(data, "out.json")