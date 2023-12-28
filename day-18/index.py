with open("day-18/test.txt") as f:
    test = f.read()

with open("day-18/input.txt") as f:
    inputFile = f.read()

def one(inpt: str):
    lines = inpt.split("\n")
    pos = { "x": 0, "y": 0 }
    path = [(pos["y"],pos["x"])]
    for line in lines:
        [direction, lgt] = [line[0], line[2]]
        # print()
        match direction:
            case "R":
                pos["x"] += int(lgt)
                path.append((pos["y"], pos["x"]))
            case "D":
                pos["y"] -= int(lgt)
                path.append((pos["y"], pos["x"]))
            case "L":
                pos["x"] -= int(lgt)
                path.append((pos["y"], pos["x"]))
            case "U":
                pos["y"] += int(lgt)
                path.append((pos["y"], pos["x"]))
    maxX = max([xX[1] for xX in path])
    maxY = min([xY[0] for xY in path])
    result = 0
    # line_block_to_skip = 0
    # print(max([xY[0] for xY in path if xY[0] < line_block_to_skip]))
    # print("maxX: ", maxX)
    curr_x = 0
    curr_y = 0
    curr_x_lgt = 0
    curr_y_lgt = 0
    phase = "add"
    # print(path)
    for p in path:
        [ y, x ] = [p[0], p[1]]
        # print("y, x: ", y, x)
        curr_xlength = 0
        if phase == "add":
            if x == 0 and y == 0:
                continue
            #add
            if not x == curr_x:
                curr_x_lgt = x
                curr_x = x
            elif not y == curr_y:
                # print("CALC: ", abs(y) , curr_y_lgt)
                # print("X: ", curr_x_lgt)
                curr_y_lgt = abs(y) - curr_y_lgt -1
                result+= curr_x_lgt * curr_y_lgt
                curr_y = y
                if y == maxY:
                    phase="sub"
                    curr_y_lgt = 0
                    curr_x_lgt = 0
        else:
            #sub
            if not x == curr_x:
                curr_x_lgt = x
                curr_x = x
            elif not y == curr_y:
                # print("X SUB: ", curr_x_lgt)
                # print("YS SUB: ", curr_y, y)
                curr_y_lgt = abs(curr_y - y)
                # print("curr_y_lgt SUB: ", curr_y_lgt)
                result-= curr_x_lgt * curr_y_lgt
                curr_y = y + 1
                # print("RES SUB: ", result)

        # elif y < line_block_to_skip:
        #     filtered = [xY[0] for xY in path if xY[0] < line_block_to_skip]
        #     print("filter: ", max(filtered))
        #     print("x: ", x)
        #     add += ((abs(max(filtered)) - abs(line_block_to_skip)) + 1) * curr_xlength
        #     print(add)
        #     line_block_to_skip = max(filtered)
        
        
        

        
    print(result)
    
# one(test)
one(inputFile)