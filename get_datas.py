# !/usr/bin/python

"""
Created by : bi-kay web solution
Created at : 18/11/2016
Updated at : 07/12/2016
Version	   : 1.0

"""
# _*_ coding:utf-8 _*_

import os, sys, re
from imp import reload
# reload(sys)
# sys.setdefaultencoding()
fr = open("lynda.csv", "r", encoding="utf-8", errors="ignore")
tmp_datas = fr.read()
sptlist = tmp_datas.split("\n")
sptlist.pop()
sptlist.pop(0)
fr.close()

ffr = open("file_write.csv", "r", encoding="utf-8", errors="ignore")
to_search = ffr.read()
list_to_search = to_search.split('\n')
list_to_search.pop()
ffr.close()
for lists in list_to_search:
	print(str(lists).encode("utf-8"))

fw_vi = open("videos.csv", "w+", encoding="utf-8", errors="ignore")

v_id = 0
arr_courses = []
arr_cates = []
arr_videos = []
for each_list in sptlist:
	v_id += 1
	cate_name = ""
	course_name = ""
	videos_name = ""
	subtitle = ""
	author = ""
	duration = ""
	view = ""
	level = ""
	date_of_release = ""
	desc = ""
	tag = ""
	get_code = ""
	list_ = each_list.replace("./","")
	get_sep_lists = list_.split("/")
	if len(get_sep_lists) > 2:
		cate_name = get_sep_lists[0]
		course_name = get_sep_lists[1]
		videos_name = get_sep_lists[2]
	if len(get_sep_lists) < 3:
		course_name = get_sep_lists[0]
		videos_name = get_sep_lists[1]
	if cate_name != "":
		arr_cates.append(cate_name)
	get_code = re.search("\d+\.mp4", videos_name, re.I)
	if get_code:
		get_code = get_code.group()
		get_code = re.sub("\.mp4", "", get_code, re.I)
	fw_vi.write(str(v_id) + ";"+str(videos_name) + ";" + str(subtitle) + ";" + str(cate_name) + ";" + str(course_name) + ";" + str(author) + ";" + str(duration) + ";" + str(view) + ";" + str(level) + ";" + str(date_of_release) + ";" + str(desc) + ";" + str(tag) + " ;" +str(get_code) + ";\n")
print((arr_cates))
fw_vi.close()


