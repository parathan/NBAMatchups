from posixpath import basename
from bs4 import BeautifulSoup
import requests
from PIL import Image

def main():
    """The function uses the BeautifulSoup to scrape the given URL and
    download the images there into a folder. The names of the images
    are based on the text under the image.

    Raises:
        Exception: Error connecting to the URUL through the requests library
        Exception: request returns a status code that is not 200, in which the URL won't provide data
    """
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