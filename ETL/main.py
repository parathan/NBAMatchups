from businessLogic import *

def main():
    for i in range(2019, 2026):
        print("year: ", i)
        writeAllStats(str(i))
        # calcData(str(i))
        # rawData(str(i))

if __name__ == '__main__':
    main()