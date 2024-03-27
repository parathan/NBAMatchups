def main():
    """Takes a text file in which each line is a string that is 
    seperated by a colon, and converts it to an 2-element array
    with the first element being the string before the colon and 
    the second element being the string after the colon. This goes
    through the entire text file and outputs each conversion into 
    a new text file.
    """
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