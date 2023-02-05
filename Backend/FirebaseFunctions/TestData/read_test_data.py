import json

def lin_func(a,b,x):
    return a*x+b

def get_lin_params(p1,p2):
    a = (p2['y']-p1['y'])/(p2['x']-p1['x'])
    b = p1['y']-p1['x']*a
    return a,b

def is_in_line(top_line,bottom_line,point):
    t = 0.005
    
    top_point = lin_func(*top_line, point['x'])
    bottom_point = lin_func(*bottom_line, point['x'])
    distance = (point['y']-bottom_point)/bottom_point
    # Distance relative to line limit
    # Negative = Inside
    # Positive = Outside
    # Closer to 0 = better
    d_line = 0.02
    return top_point*(1-t) <= point['y'] <= bottom_point*(1+t) and -d_line <= distance <= d_line, distance

def read_json_file(file_name):
    with open(f"TestData/{file_name}") as fp:
        data = json.load(fp)
        upper_line_params = None
        lower_line_params = None
        possibilities = []
        for i in data[1:]:
            if 'total' == i['description'].lower():
                points = [{'x':z['x'],'y':z['y']} for z in i["boundingPoly"]['vertices']]
                upper_line_params = get_lin_params(points[0],points[1])
                lower_line_params = get_lin_params(points[2],points[3])
                possibilities.append((upper_line_params, lower_line_params))

        for item in possibilities:
            print(item)
        # print(possibilities)
        results = []
        for i in range(len(data)-1, -1,-1):
            z = data[i]
            for possible in possibilities:
                is_inside = is_in_line(*possible, z['boundingPoly']['vertices'][3])
                if is_inside[0]:
                    try:
                        x = float(z['description'])
                        if x != 0.0:
                            results.append((x,is_inside[1]))
                    except:
                        continue
        print(sorted(results, reverse=True))
               

# for i in range(1,8):
#     read_json_file(f"test_data{i}.json")
read_json_file(f"test_data{7}.json")
