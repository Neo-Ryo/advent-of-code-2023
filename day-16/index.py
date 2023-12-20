with open("day-16/test.txt") as f:
    test = f.read()

with open("day-16/input.txt") as f:
    inputFile = f.read()


## try new approch by duplicating beams rather than recursive calls
class Beam:
    x = 0
    y = 0
    direction = "E"
    def move(self):
        if self.direction == "E":
            self.x+=1
        if self.direction == "W":
            self.x-=1
        if self.direction == "N":
            self.y-=1
        if self.direction == "S":
            self.y+=1
    def change_direction(self, direction):
        self.direction = direction
        if direction == "N":
            self.y-=1
        if direction == "S":
            self.y+=1
        if direction == "E":
            self.x+=1
        if direction == "W":
            self.x-=1
    def is_out(self, grid):
        if self.y < 0 or self.x < 0 or self.y > len(grid) - 1 or self.x > len(grid[0]) - 1:
             return True
        else:
            return False



def add_energized(beam, energized):
    nrgz = "{}|{}{}".format(beam.y, beam.x, beam.direction)
    if not nrgz in energized:
        energized.append(nrgz)
        return False
    else:
        return True
                       
def del_beam(beam, beams):
        beamHash = beam.__hash__()
        for i in range(len(beams)):
            if beams[i].__hash__() == beamHash:
                del beams[i]
                break

def make_new_beam(beam, direction, beams):
    newBeam = Beam()
    if direction == "N":
        newBeam.y = beam.y-1
        newBeam.x = beam.x
    if direction == "S":
        newBeam.y = beam.y+1
        newBeam.x = beam.x
    if direction == "E":
        newBeam.x = beam.x+1
        newBeam.y = beam.y
    if direction == "W":
        newBeam.x = beam.x-1
        newBeam.y = beam.y
    newBeam.direction = direction
    beams.append(newBeam)
    return newBeam

def one(file: str, start: { "x": int, "y": int, "direction": str}):
    print(start)
    grid = []
    beams = []
    energized = [];
    for l in file.split("\n"):
        grid.append([*l])
    beam = Beam()
    beam.x = start["x"]
    beam.y = start["y"]
    beam.direction = start["direction"]
    beams.append(beam)

    while len(beams):
        for bm in beams:
            if bm.is_out(grid):
                del_beam(bm, beams)
                continue
            else:
                is_already_nrgz = add_energized(bm, energized)
                if is_already_nrgz:
                    del_beam(bm, beams)
                    continue
                else:
                    # print(bm.y, bm.x)
                    # print(len(grid))
                    spot = grid[bm.y][bm.x]
                    match bm.direction:
                        case "E":
                            if spot == "/":
                                bm.change_direction("N")
                            elif spot == "\\":
                                bm.change_direction("S")
                            elif spot == "|":
                                bm.change_direction("N")
                                make_new_beam(bm, "S", beams)
                            else:
                                bm.move()
                        case "S":
                            if spot == "/":
                                bm.change_direction("W")
                            elif spot == "\\":
                                bm.change_direction("E")
                            elif spot == "-":
                                bm.change_direction("W")
                                make_new_beam(bm, "E", beams)
                            else:
                                bm.move()
                        case "W":
                            if spot == "/":
                                bm.change_direction("S")
                            elif spot == "\\":
                                bm.change_direction("N")
                            elif spot == "|":
                                bm.change_direction("S")
                                make_new_beam(bm, "N", beams)
                            else:
                                bm.move()
                        case "N":
                            if spot == "/":
                                bm.change_direction("E")
                            elif spot == "\\":
                                bm.change_direction("W")
                            elif spot == "-":
                                bm.change_direction("E")
                                make_new_beam(bm, "W", beams)
                            else:
                                bm.move()
    # print(energized)
    single_points = []
    for nrgz in energized:
        x = nrgz[:-1]
        if not x in single_points:
            single_points.append(x)
    # print(single_points)
    print(len(single_points))
    return len(single_points)
    # new_grid = []
    # for i in range(len(grid)):
    #     new_grid.append([])
    #     for j in range(len(grid[i])):
    #         if "{}{}".format(i, j) in single_points:
    #             new_grid[i].append("#")
    #         else:
    #             new_grid[i].append(".")
    # lines = ["".join(i) for i in new_grid]
    # print("\n".join(lines))
    

def two(file: str):
    grid = []
    for l in file.split("\n"):
        grid.append([*l])
    
    #TOP left ->
    #TOP right <-
    #BOTTOM left ->
    #BOTTOM right <-
    top_left = [{ "x": 0, "y": 0, "direction": "E" }, { "x": 0, "y": 0, "direction": "S" }]
    top_right = [{ "x": len(grid[0]) - 1, "y": 0, "direction": "W" }, { "x": len(grid[0]) - 1, "y": 0, "direction": "S" }]
    bot_left = [{ "x": 0, "y": len(grid) - 1, "direction": "E" }, { "x": 0, "y": len(grid) - 1, "direction": "N" }]
    bot_right = [{ "x": len(grid[0]) - 1, "y": len(grid) - 1, "direction": "W" }, { "x": len(grid[0]) - 1, "y": len(grid) - 1, "direction": "N" }]
    res = []
    for i in range(len(grid[0])):
        #TOP
        if i == 0:
            for t in top_left:
                res.append(one(file, t))
        elif i == len(grid[0]) - 1:
            for t in top_right:
                res.append(one(file, t))
        else:
            res.append(one(file, { "x": i, "y": 0, "direction": "S" }))
    for i in range(len(grid[len(grid) - 1])):
        #BOT
        if i == 0:
            for t in bot_left:
                res.append(one(file, t))
        elif i == len(grid[0]) - 1:
            for t in bot_right:
                res.append(one(file, t))
        else:
            res.append(one(file, { "x": i, "y": len(grid[len(grid) - 1]) - 1, "direction": "N" }))

    print(res)
    print(max(res))   

# one(test, { "x": 0, "y": 0, "direction": "S"})
# one(inputFile)
# two(test)
two(inputFile)