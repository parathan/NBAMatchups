from businessLogic import *

def main():
    testCalc()

def testCalc():
    calcData("2023")

def useScraper():
    rawData("2023")
    rawData("2022")
    rawData("2021")
    rawData("2020")
    rawData("2019")

if __name__ == '__main__':
    main()