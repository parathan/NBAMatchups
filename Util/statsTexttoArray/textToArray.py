def main():
    with open('stats.txt') as file:
        result = []
        lines = file.readlines()
        for line in lines:
            adder = line.strip().split(': ')
            result.append(adder)

        resultFile = open('resultFile.txt', 'w')
        for line in result:
            adderString = "['" + line[0] + "','" + line[1] + "'],\n"
            resultFile.write(adderString)



if __name__ == '__main__':
    main()