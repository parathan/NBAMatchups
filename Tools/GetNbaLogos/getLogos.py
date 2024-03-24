from posixpath import basename
from bs4 import BeautifulSoup
import requests
from PIL import Image

def main():
    url = "https://loodibee.com/nba/"
    try:
        res = requests.get(url)
    except:
        raise Exception(f"Error connecting to url:{url}")
    
    if res.status_code != 200:
        raise Exception("Non 200 status code when retrieving webpage")
    
    soup = BeautifulSoup(res.content, 'lxml')
    list = soup.find_all("figure", class_="wp-caption alignnone")

    for item in list:
        linkName = item.text + ".png"
        linkName = linkName.replace(" ", "_")
        lnk = item.find('img').get('src')
        lnk = 'https://loodibee.com' + lnk
        img = Image.open(requests.get(lnk, stream=True).raw)

        img.save('NBALogos/' + linkName)



if __name__ == '__main__':
    main()