with open("day-14/test.txt") as f:
    test = f.read()
with open("day-14/input.txt") as f:
    inputFile = f.read()


def one(inputFile: str):
    grid = []
    for line in inputFile.split("\n"):
        grid.append([*line])
    
    for i in range(len(grid)):
        print(grid[i])
        for j in range(0, len(grid[i])):
            n = 1
            if i > 0 and grid[i][j] == "O" and grid[i - n][j] == ".":
                while grid[i - n][j] == ".":
                    if i - n >= 0:
                        grid[i-n][j] = "O"
                        grid[i+1-n][j] = "."
                        n+=1
                    else:
                        break
                   
    
    value_of_fall = 0
    print("-")
    for i in range(len(grid)):
        print(grid[i])
        for char in grid[i]:
            if char == "O":
                value_of_fall+= len(grid) - i
                
    print(value_of_fall)

def tilt_to(grid: [[str]], dir: str) -> [[str]]:
    nGrid = grid
    match dir:
        case "north": 
            for i in range(len(nGrid)):
                for j in range(0, len(nGrid[i])):
                    n = 1
                    if i > 0 and nGrid[i][j] == "O" and nGrid[i - n][j] == ".":
                        while nGrid[i - n][j] == ".":
                            if i - n >= 0:
                                nGrid[i-n][j] = "O"
                                nGrid[i+1-n][j] = "."
                                n+=1
                            else:
                                break
        case "west":
            for i in range(len(nGrid)):
                for j in range(0, len(nGrid[i])):
                    n = 1
                    if j > 0 and nGrid[i][j] == "O" and nGrid[i][j-n] == ".":
                            while nGrid[i][j-n] == ".":
                                if j - n >= 0:
                                    nGrid[i][j-n] = "O"
                                    nGrid[i][j+1-n] = "."
                                    n+=1
                                else:
                                    break
                           
        case "south":
            nGrid.reverse()
            for i in range(len(nGrid)):
                for j in range(0, len(nGrid[i])):
                    n = 1
                    if i > 0 and nGrid[i][j] == "O" and nGrid[i - n][j] == ".":
                        while nGrid[i - n][j] == ".":
                            if i - n >= 0:
                                nGrid[i-n][j] = "O"
                                nGrid[i+1-n][j] = "."
                                n+=1
                            else:
                                break
            nGrid.reverse()                 
        case "east":
            for i in range(len(nGrid)):
                for j in range(0, len(nGrid[i])):
                    nGrid[i].reverse()
                    n = 1
                    if j > 0 and nGrid[i][j] == "O" and nGrid[i][j-n] == ".":
                            while nGrid[i][j-n] == ".":
                                if j - n >= 0:
                                    nGrid[i][j-n] = "O"
                                    nGrid[i][j+1-n] = "."
                                    n+=1
                                else:
                                    break
                    nGrid[i].reverse()
                
    return nGrid

def two(inputFile: str):
    # init_grid = []
    grid = []
    for line in inputFile.split("\n"):
        # init_grid.append([*line])
        grid.append([*line])
    directions = ["north", "west", "south", "east"]
    # init_grid = tilt_to(init_grid, "north")
    # while not [tuple(x) for x in grid] == [tuple(x) for x in init_grid] or n < 4: 
    for _ in range(1000): 
        for drct in directions:
            grid = tilt_to(grid, drct)
        
        # for l in grid:     
            # print(l)
        value_of_fall = 0
        for i in range(len(grid)):
            # print(grid[i])
            for char in grid[i]:
                if char == "O":
                    value_of_fall+= len(grid) - i
                    
        print(value_of_fall)


        

# one(test)
# one(inputFile)
# two(test)
two(inputFile)

##
# arr1 = [["O", ".", "#"], ["O", ".", "."]]
# arr2 = [["O", ".", "#"], ["O", ".", "."]]
# # print(arr1)
# # print(arr2)

# diff = set([tuple(x) for x in arr1]) - set([tuple(x) for x in arr2])
# if diff:
#     print(diff)
# else:
#     print("None")
    