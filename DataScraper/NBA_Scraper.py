import pandas as pd
import os
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select, WebDriverWait
options = webdriver.ChromeOptions()

options.add_experimental_option('excludeSwitches', ['enable-logging'])

Seasons = ["2022-23", "2021-22"]
dfData = pd.DataFrame()

for season in Seasons:
    url = f"https://www.nba.com/stats/teams/boxscores?Season={season}&dir=A&sort=Playoffs"
    browser = webdriver.Chrome(options=options)
    browser.maximize_window()
    browser.get(url)
    select = Select(browser.find_element(By.CSS_SELECTOR, "div.Pagination_pageDropdown__KgjBU select.DropDown_select__4pIg9"))
    select.select_by_index(0)
    table = WebDriverWait(browser, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, 'Crom_table__p1iZz')))
    soup = BeautifulSoup(table.get_attribute('outerHTML'), 'html.parser')
    dfData = pd.concat([dfData, pd.read_html(str(soup))[0]])

# determining the name of the file
file_name = 'NBAScores.xlsx'
file_path = os.path.join(os.path.dirname(__file__), file_name)
 
# saving the excel
dfData.to_excel(file_path)