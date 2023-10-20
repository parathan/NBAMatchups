def findIndex(teamStats: list, name: str) -> int:
        """
        Finds index of object based on Name field

        Args:
            name (str): the name of the object
        
        Returns:
            int: the index of the object
        """
        if type(teamStats) is not list:
             raise TypeError("teamStats is not a list")
        if type(name) is not str:
             raise TypeError("name is not a string")

        index = -1
        for idx, team in enumerate(teamStats):
            if team["Name"] == name:
                index = idx
                break
        return index

def bbrefUrl(year: str) -> str:
    """Returns baksetball reference url from given year's page

    Args:
        year (str): year to be used within url.

    Returns:
        str: full basektballreference url with year.
    """
    if type(year) is not str:
         raise TypeError("year is not a string")

    return 'https://www.basketball-reference.com/leagues/NBA_' + year + '.html'