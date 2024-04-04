
def is_number_tryexcept(s):
    """ Returns True if string is a number and False otherwise """
    try:
        float(s)
        return True
    except ValueError:
        return False

def main():
    """Takes a text file in which each line is a string with a field title and a value that are
    seperated by a colon. This converts each string by determining whether the value is a number or
    a string and replacing that value with either the string literals "number" or "string", and
    outputs the new list of lines to a new text file.
    """
    with open('fields.txt') as file:
        result = []
        lines = file.readlines()
        for line in lines:
            adder = line.strip().split(": ")
            adder[0] = adder[0].strip('\"')
            adder[1] = adder[1].strip(',')
            fieldType = "None"
            if (is_number_tryexcept(adder[1])):
                fieldType = "number"
            else:
                fieldType = "string"
            resultString = adder[0] + ": " + fieldType + ","            
            result.append(resultString)

        resultFile = open('resultFile.txt', 'w')
        for line in result:
            resultFile.write(line + "\n")
    file.close()
    resultFile.close()

if __name__ == '__main__':
    main()