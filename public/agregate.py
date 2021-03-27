#!/usr/bin/python3
# -*- coding: utf-8 -*-
"""
Agregate a json patterns list in a single json file.

- Scan json files in public/template directory that have attribute "type" equal
to "origamiPattern" and an "patternName" attribute.

- Creates agregated.json, a file that contain 'fileName' and 'patternName'
attributes of every corresponding file.

"""

from os.path import isfile, join
from os import listdir
from json import load, dump

# check if file has attribute 'type': 'Origami-pattern'
def is_origami_pattern(filename):
    try:
        with open(filename) as filetext:
            datas = load(filetext)
            if 'type' in datas and \
               datas['type'].lower() == 'origamipattern' and \
               'patternName' in datas:
                return datas['patternName']
    except:
        print(f'Unrecognized json content, skip file "{filename}"')
    return None


if __name__ == '__main__':
    # Search for json files in template path with correct attribute.
    tp = "./patterns/"
    files = [f for f in listdir(tp)
               if isfile(join(tp, f))
               and f[-5:]=='.json']
    files  = filter(lambda f: f[1]!=None,
                    [(f, is_origami_pattern(tp+f)) for f in files])

    # Agregate them into a json file
    with open('agregated.json', 'w') as dest:
        agreg = {'INFO':[" ----- DO NOT MANUALLY EDIT THIS FILE ----- ",
                         "This file contains a list of all origami pattern",
                         "files contained in public/patterns.",
                         "Each json file defines 'type': 'origamiPattern'",
                         "and a 'patternName' attribute.",
                         "Use public/agregate.py to generate this file when",
                         "new patterns have to be concatenated here."],
                 "patterns":[{"fileName":f, "patternName":p} for f,p in files]
                            }
        dump(agreg, dest, indent='\t')
