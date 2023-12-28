import itertools

x = [(0, 0), (0, 6), (-5, 6), (-5, 4), (-7, 4), (-7, 6), (-9, 6), (-9, 1), (-7, 1), (-7, 0), (-5, 0), (-5, 2), (-2, 2), (-2, 0), (0, 0)]
def get_y(tpl: tuple):
    print(tpl[0])
    return tpl[0]
t = max([xs[0] for xs in x if not xs[0] == 0])
print(t)