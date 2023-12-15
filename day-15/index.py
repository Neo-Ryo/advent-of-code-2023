import re

with open("day-15/test.txt") as f:
    test = f.read()
with open("day-15/input.txt") as f:
    inputFile = f.read()


def one(i: str):
    sequences = i.split(",")
    print(sequences)
    results = []
    for seq in sequences:
        curr = 0
        for char in [*seq]:
            # print(char)
            curr+=ord(char)
            curr*=17
            curr = curr % 256
        results.append(curr)
    print(results)
    print(sum(results))

def two(i: str):
    boxes = []
    sequences = i.split(",")
    for seq in sequences:
        if "=" in seq:
            lence = seq.split("=")[0]
            val = seq.split("=")[1]
            curr_hash = 0
            for c in [*lence]:
                curr_hash+=ord(c)
                curr_hash*=17
                curr_hash = curr_hash % 256
            # print(curr_hash, lence, val)
            if not len(boxes):
                boxes.append({curr_hash: ["{} {}".format(lence, val)]})
            else:                    
                t = [i for i, box in enumerate(boxes) if curr_hash in box]
                if len(t):
                    print(boxes)
                    print(curr_hash, lence, val)
                    idx = [i for i, lc in enumerate(boxes[t[0]][curr_hash]) if lence in lc]
                    print(idx)
                    if len(idx):
                        boxes[t[0]][curr_hash][idx[0]] = "{} {}".format(lence, val)
                    else:
                        boxes[t[0]][curr_hash].append("{} {}".format(lence, val))

                else:
                    boxes.append({curr_hash: ["{} {}".format(lence, val)]})

        if "-" in seq:
            lence = seq.split("-")[0]
            curr_hash = 0
            for c in [*lence]:
                curr_hash+=ord(c)
                curr_hash*=17
                curr_hash = curr_hash % 256
            t = [i for i, box in enumerate(boxes) if curr_hash in box]
            if len(t):
                for i in boxes[t[0]][curr_hash]:
                    if lence in i:
                        boxes[t[0]][curr_hash].remove(i)

    print(boxes)
    res = []
    for box in boxes:
        for k in box:
            boxN = k
            for l in range(len(box[k])):
                lnc = box[k][l]
                focalLgt = lnc.split(" ")[1]
                print(boxN + 1,l + 1, focalLgt )
                n = (boxN + 1) * (l + 1) * int(focalLgt)
                res.append(n)

    print(res)
    print(sum(res))

# one(test)
# one(inputFile)
# two(test)
two(inputFile)