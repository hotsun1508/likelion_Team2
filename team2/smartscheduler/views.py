from wsgiref import headers
from wsgiref.util import request_uri
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect, render
from django.views.decorators.csrf import csrf_exempt
from yaml import serialize
from .models import Lecture, Student, Schedule
# from .serializers import StudentSerializer
from .serializers import PostSerializer
from rest_framework import generics
from rest_framework.response import Response
import json

def index(request):
    return render(request, 'index.html')

def split_time(lecture_time): # lecture_time: "월1월2월3"
    split_lecture_time = []
    n = len(lecture_time)
    for i in range(0, n-1, 2):
        han   = lecture_time[i]
        digit = lecture_time[i+1]
        split_lecture_time.append(han+digit)
    return split_lecture_time
'''
[06/Jun/2022 03:21:59] "POST /lecturelist/ HTTP/1.1" 200 1023
request:  <WSGIRequest: POST '/lecturelist/'>
request.method:  POST
lecturelist/POS
'''
@csrf_exempt
def lecturelist(request):
    print('33request: ', request)
    print('34req.method: ', request.method)
    print('35req.headers: ', request.headers)
    # print('36req.headers[Content-Type]: ', request.headers['Content-Type'])
    # method = request.headers['Content-Type']
    # data = json.load(request)
    # print('data after json.load: ', data)
    # if request.method == 'POST': # 원하는 조건으로 필터링된 과목정보 리스트 return
    if request.method == 'POST':
        # times 도 받짜 [6/4]
        print('lecturelist/POST')
        print('req.body: ', request.body)
        data = json.load(request) # 조건 선택 후 보낸 req
        student_number = "201700295"
        lecture_time = data['times'] # "월1월2월3월4"
        star_point = data['star_point']
        lecture_area = data['lecture_area']
        print('lecture_time: ', lecture_time, 'type of lecture_time: ', type(lecture_time))
        print('start_point: ', star_point, ', type of start_point: ', type(star_point))
        print('lecture_area: ', lecture_area, ', type of lecture_name: ', type(lecture_area))
        if lecture_time != "" and lecture_time != None: # 사용자가 원하는 시간을 선택했을 경우
            # '''times 로 넘어온 것 중복체크 추가구현'''
            lecture_time_list_input = split_time(lecture_time) # ['월1', '월2']이 저장될 것임
            n = len(lecture_time_list_input)
            for i in range(n):
                for j in range(i+1, n):
                    if lecture_time_list_input[i] == lecture_time_list_input[j]:
                        dic = {}
                        dic['duplicate'] = "true"
                        dic['code'] = '300'
                        dic['msg'] = "duplicate in selected time"
                        dic['lecture_infor'] = [None]
                        return JsonResponse(dic)
            # ['월78', '금56', '화12목3']
            # '''그 시간대에 해당하는 과목도 필터링'''
            # 과목의 시간을 ['월1', '월2' ... ] 형태로 쪼개서 lecture_time_list_input에 해당 원소가 모두 포함되는 경우에만 time_ok_lecture_list에 append한다.
            lecture_list = Lecture.objects.all().values()
            time_ok_lecture_list = []
            # test = [] # 테스트용
            for i in range(len(lecture_list)):
                lecture = lecture_list[i]
                split_lecture_time = split_time(lecture['lecture_time'])
                for t in split_lecture_time:
                    if t not in lecture_time_list_input: break
                else: # for-else 문법-> for문이 정상적으로 종료되면(모든 t가 lecture_time_list_input에 포함된다면)
                    time_ok_lecture_list.append(lecture) # time_ok_lecture_list에 추가함.
                    # test.append(lecture.lecture_name) # 월78 입력하면 -> test: ['21세기현대문화지형이해', '동양미술사입문'] 나옴
            print(f'\nlec_lis: {lecture_list}, type of lec_list: {type(lecture_list)} \n ')
            print(f'\ntime_ok_lec_lis: {time_ok_lecture_list}, type of lec_list[0]: {type(time_ok_lecture_list[0])}\n')
            duplicate_flag, duplicate_lecture_number = check_duplicate(lecture_time, student_number) # 201700295 학생의 현재 시간표와 겹치는지 check
            final_lecture_list = []
            if not duplicate_flag:
                if lecture_area == "" or lecture_area == None: # 개설영역을 선택하지 않은 경우
                    for lecture in time_ok_lecture_list:
                        if float(lecture['star_point']) >= float(star_point):
                            final_lecture_list.append(lecture)
                    # lectures = Lecture.objects.filter( star_point__gte=star_point).values() 
                    print('After/star_point/final_lec_lis: ', final_lecture_list) # [<Lecture: U76216201>]
                    # objects.get으로 하면 Queryset으로 안나와서 iteration할 수 없다
                else: # 별점은 반드시 부여해야됨
                    for lecture in time_ok_lecture_list:
                        if float(lecture['star_point']) >= float(star_point) and lecture['area'] == lecture_area:
                            final_lecture_list.append(lecture)
                    print('After/star_point&lecture_area/final_lec_lis: ', final_lecture_list)
                    # lectures = Lecture.objects.filter(star_point__gte=star_point, lecture_area=lecture_area).values()
                lectures = final_lecture_list
                dic = {}
                dic['duplicate'] = "false"
                dic['code'] = "201"
                dic['msg'] = "not duplicate, success filtering"
                dic['lecture_infor'] = lectures # 겹치는 강의 return
                print('104')
                return JsonResponse(dic)
            else: # duplicate_flag == True 즉, 입력한 시간표가 현재 수강예정인 수업과 겹치는 경우
                lecture = Lecture.objects.filter(lecture_number=duplicate_lecture_number).values()
                dic = {}
                dic['duplicate'] = "true"
                dic['code'] = "301"
                dic['msg'] = "duplicated in registered schedule"
                dic['lecture_infor'] = [lecture[0]] # 겹치는 강의 return
                return JsonResponse(dic)
        else: # 시간선택하지 않았을 경우
            if lecture_area == "" or lecture_area == None:
                lectures = Lecture.objects.filter(star_point__gte=star_point).values() 
            else:    
                lectures = Lecture.objects.filter(star_point__gte=star_point, lecture_area=lecture_area).values()
    else: # GET일 때, -> 전체과목 조회
        print('lecturelist()/GET')
        lectures = Lecture.objects.all().values()
    print('lectures: ', lectures)
    print('type of lectures:', type(lectures))
    lis = []
    for i in range(len(lectures)):
        lis.append(lectures[i])
    dic = {}
    dic['duplicate'] = 'false'
    dic['code'] = "200"
    dic['msg'] = "no duplciate"
    dic['lecture_infor'] = lis
    return JsonResponse(dic) #  전체강의페이지.js 로 잘 보내진다~
    # return HttpResponse(headers={"status": 202})
    # return render(request, 'lecturelist.html', {
    #     'lectures': lectures
    # })


def filter(request):
    return render(request, 'filter.html')

def schedule(request): # 현재 수강중인
    student_number = "201700295" # user.session.get사용해야함
    schedule = Schedule.objects.filter(student_number=student_number) # <QuerySet [<Schedule: Schedule object (1)>]>
    lecture_str = schedule.get().lecture_number_list  # 'U76007101,U71826301,U72207401'
    lecture_number_list = lecture_str.split(',') # ['U76007101', 'U71826301', 'U72207401']
    lectures = []
    for lecture_number in lecture_number_list:
        lectures.append(Lecture.objects.get(lecture_number=lecture_number))
        # [<Lecture: U76007101>, <Lecture: U71826301>, <Lecture: U72207401>]
        # lectures.append(Lecture.objects.filter(lecture_number=lecture_number))
        # [<QuerySet [<Lecture: U76007101>]>, <QuerySet [<Lecture: U71826301>]>, <QuerySet [<Lecture: U72207401>]>]
        # 보낼 정보 lecture_name, professor, lecture_time, lecture_room
    dic = {}
    temp = []
    for lecture in lectures:
        dic_temp = {}
        dic_temp['lecture_number'] = lecture.lecture_number
        dic_temp['lecture_name'] = lecture.lecture_name
        dic_temp['professor'] = lecture.professor
        dic_temp['lecture_time'] = lecture.lecture_time
        dic_temp['lecture_room'] = lecture.lecture_room
        temp.append(dic_temp)
    dic['lecture_infor'] = temp
    # return render(request, 'schedule.html', {
    #     'lectures': lectures
    # })
    # return JsonResponse(dic) # 아래와 같이 잘 나온다
    return JsonResponse(dic)
    
'''
{
    {
        lecture_number: "U76007101",
        lecture_name: "21세기현대문화지형이해",
        professor: "김영걸",
        lecture_time: "월78",
        lecture_room: "()"
    },
    {
        lecture_number: "U71826301",
        lecture_name: "디지털자료로배우는한국사",
        professor: "나유정",
        lecture_time: "금56",
        lecture_room: "()"
    },
    {
        lecture_number: "U72207401",
        lecture_name: "컴퓨터프로그래밍",
        professor: "김재빈",
        lecture_time: "화12목3",
        lecture_room: "()"
    }
}
'''
# 시간표 겹치는지/안겹치는지 -> T, {겹치는과목의 학수번호} / F, None
def check_duplicate(_str, student_number):
    # _str = '월7월8금5금6화1화2목3'
    schedule = Schedule.objects.filter(student_number=student_number) # user.session.get사용해야함
    # <QuerySet [<Schedule: Schedule object (1)>]>
    lecture_str = schedule.get().lecture_number_list # U76007101,U71826301,U72207401
    lecture_number_list = lecture_str.split(',') # ['U76007101', 'U71826301', 'U72207401']
    # .split()으로 다 쪼개고 뒤에서 부터 탐색하면서 non digit인거 찾아서 index리턴
    # 화12목3 
    lectures = []
    for lecture_number in lecture_number_list:
        lectures.append(Lecture.objects.get(lecture_number=lecture_number))
        # [<Lecture: U76007101>, <Lecture: U71826301>, <Lecture: U72207401>]
        # lectures.append(Lecture.objects.filter(lecture_number=lecture_number))
        # [<QuerySet [<Lecture: U76007101>]>, <QuerySet [<Lecture: U71826301>]>, <QuerySet [<Lecture: U72207401>]>]
        # 보낼 정보 lecture_name, professor, lecture_time, lecture_room
    lecture_time_list_input = split_time(_str) # ['월1', '월2']
    # ['월78', '금56', '화12목3']
    ## 사용자가 신청한 강의시간을 모두 정리 -> ['월7', '월8' ... ]
    lecture_time_list_output = [] # ['월7', '월8' ... ]
    lecture_number_list_output = [] # ['U76007101', 'U76007101', ... ] # 각시간대에 해당하는 학수번호를 저장함 -> 겹치는 과목 알아내기위함
    for lecture in lectures: # 3 -> 2, 5-> 3
        time = lecture.lecture_time # '월78' or '화12목3'
        current_lecture_number = lecture.lecture_number
        han = time[0] # '월' 뽑아냄
        for i in range(1, len(time)):
            digit = ''
            if time[i].isdigit(): # 숫자형인지 확인
                digit = time[i] # 7 or 8과 같은 숫자 하나 뽑아냄
                lecture_time_list_output.append(han+digit) # ['월7', '월8' ... ]
                lecture_number_list_output.append(current_lecture_number)
            else: # '화12목3' 중 '목'에 해당함
                han = time[i]
    # for lecture_time in lecture_time_list_input:
    #     if lecture_time in lecture_time_list_output:
    for i in range(len(lecture_time_list_input)):
        for j in range(len(lecture_time_list_output)):
            if lecture_time_list_input[i] == lecture_time_list_output[j]:
                return True, lecture_number_list_output[j] # 중복된 경우
    return False, None # 중복안된 경우

# 강의 json으로 전달된 lecture_number에 해당하는 학수번호에 해당하는 강의 없애기
# https://velog.io/@ash3767/django-request-json.loads
@csrf_exempt    
def delete(request): # DB에 save() 반영할려면 밑에 주석 지우자!!
    if request.method == 'POST':
        print('req: ', request)
        student_number = "201700295"
        data = json.loads(request.body)
        # delete_lecture_name = data.get('delete_lecture_name', None)
        delete_lecture_name = data['delete_lecture_name'][0]
        # delete_lecture_time = data.get('delete_lecture_time', None) 
        # delete_lecture_time = data['delete_lecture_time']
        # '수1' or '수2' 의 형태로 온다. # 과목명이 같은 순 있지만 시간대까지 같진 않을 것이기 때문에
        # 강의 명과 강의시간을 가지고 삭제할 과목의 학수번호를 찾아서 schedule 테이블에서 삭제할 것임
        print('delete_lecture_name: ', delete_lecture_name)
        # print('dele_lec_time: ', delete_lecture_time)
        lectures = Lecture.objects.filter(lecture_name=delete_lecture_name)
        print('lectures: ', lectures)
        for delete_lecture_number in lectures:
            print('delete_lecture_number: ', delete_lecture_number)
        # delete_lecture_number = request.POST.get('lecture_number', None)
        # print('d_lec_name: ', delete_lecture_name, 'type of delete_lec_num: ', type(delete_lecture_number))
        # delete_lecture_number = 'U71826301'

        schedule = Schedule.objects.get(student_number=student_number)
        lecture_str = schedule.lecture_number_list # U76007101,U71826301,U72207401
        lecture_number_list = lecture_str.split(',') # ['U76007101', 'U71826301', 'U72207401']
        print('Before/lecture_number_list: ', lecture_number_list)
        lecture_number_list.remove(str(delete_lecture_number))
        print('After/lecture_number_list: ', lecture_number_list)
        lecture_str_final = '' # DB에 Schedule테이블에 저장할 정보

        for i in range(len(lecture_number_list)):
            if i != len(lecture_number_list)-1:
                lecture_str_temp = lecture_number_list[i] + ','
                lecture_str_final += lecture_str_temp
            else:
                lecture_str_final += lecture_number_list[i]
        print('lecture_str_final: ', lecture_str_final)
        '''DB에 변경사항을 반영하려면 아래의 두줄의 주석을 지우세요'''
        schedule.lecture_number_list = lecture_str_final
        schedule.save()
        # return 할 정보 만들기 schedule()과 동일함.
        lectures = []
        for lecture_number in lecture_number_list:
            lectures.append(Lecture.objects.get(lecture_number=lecture_number))
            # [<Lecture: U76007101>, <Lecture: U71826301>, <Lecture: U72207401>]
            # lectures.append(Lecture.objects.filter(lecture_number=lecture_number))
            # [<QuerySet [<Lecture: U76007101>]>, <QuerySet [<Lecture: U71826301>]>, <QuerySet [<Lecture: U72207401>]>]
            # 보낼 정보 lecture_name, professor, lecture_time, lecture_room
        print('lectures: ', lectures)
        dic = {}
        temp = []
        for lecture in lectures:
            dic_temp = {}
            dic_temp['lecture_number'] = lecture.lecture_number
            dic_temp['lecture_name'] = lecture.lecture_name
            dic_temp['professor'] = lecture.professor
            dic_temp['lecture_time'] = lecture.lecture_time
            dic_temp['lecture_room'] = lecture.lecture_room
            temp.append(dic_temp)
        dic['lecture_infor'] = temp
        # '''_str형태로 주지말고 '전체강의리스트'페이지로 넘어갈것을 고려해서 삭제된 후 사용자의 남아있는 과목정보들을 return하자'''
        return JsonResponse(dic)
    else:
        return JsonResponse({'delete()/error msg' : "plz send POST request"})

# 체크박스 선택 후 "추가" 버튼 클릭했을때 사용자 Schedule에 선택한 과목 추가하기
@csrf_exempt
def add(request): # DB에 save() 반영할려면 밑에 주석 지우자!!
    if request.method == 'POST':
        print('req: ', request)
        data = json.loads(request.body)
        add_lecture_number_list = data.get('add_lecture_number', None) # ['U76100201,U51512201']
        add_lecture_number = add_lecture_number_list[0]
        print('add_lec_num: ', add_lecture_number)
        schedule = Schedule.objects.get(student_number="201700295")
        lecture_str = schedule.lecture_number_list # U76007101,U71826301,U72207401
        print('Before/lec_num_list: ', lecture_str)
        lecture_str_final = ''
        if len(lecture_str) == 0: # 현재 신청한 과목이 없다면
            lecture_str_final += add_lecture_number
        else: #  현재 이미 신청한 과목이 있다면
            add_lecture_number = ',' + add_lecture_number
            lecture_str += add_lecture_number
        lecture_str_final = lecture_str

        '''DB에 변경사항 반영하고 싶으면 아래 2줄의 주석을 지워야함'''
        schedule.lecture_number_list = lecture_str_final
        schedule.save()

        lecture_str_final_list = lecture_str_final.split(',')
        for lecture_number in lecture_str_final_list:
            lecture = Lecture.objects.filter(lecture_number=lecture_number).values()
            # 어차피 "내 시간표보기" 페이지로 넘어가니까 더이상의 코딩은 생략한다...

        print('After/lecture_num_list:', lecture_str_final)
        return JsonResponse({"lecture_number_list" : lecture_str_final})
    else:
        return JsonResponse({'add()/error msg-Bad Request' : "plz send POST request not GET"})
class ListPost(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    print(f'ListPost/queryset: {queryset}, type of queryset: {type(queryset)}')
    # <QuerySet [<Student: 201700295>, <Student: 201800295>]>, type of queryset: <class 'django.db.models.query.QuerySet'>
    serializer_class = PostSerializer

class DetailPost(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    print(f'DetailPost/queryset: {queryset}, type of queryset: {type(queryset)}')

    serializer_class = PostSerializer
@csrf_exempt
def test(request):
    if request.method == 'POST': # 원하는 조건으로 필터링된 과목정보 리스트 return
        data = json.load(request) # 조건 선택 후 보낸 req
        student_number = "201700295"
        lecture_time = data['times'] # "월1월2월3월4"
        star_point = data['star_point']
        lecture_area = data['lecture_area']
        lectures = Lecture.objects.all().values()
        print('lectures: ', lectures)
        print('type of lectures:', type(lectures))
        print('test')
        lis = []
        for i in range(len(lectures)):
            lis.append(lectures[i])
        dic = {}
        dic['duplicate'] = 'false'
        dic['code'] = "200"
        dic['msg'] = "no duplciate"
        dic['lecture_infor'] = lis
        print(f'\nlis[0]: {lis[0]}\n')
        temp = Lecture.objects.filter(lecture_number="U76007101") # <QuerySet [<Lecture: U76007101>]>
        print(f'\ntemp: {temp}') 
        # print(f'temp.lecture_name: ', temp.lecture_name, '\n') -> AttributeError: 'QuerySet' object has no attribute 'lecture_name'
        temp_get = Lecture.objects.get(lecture_number="U76007101") # 
        print(f'\ntemp_get: {temp_get}')
        print(f'temp_get.lecture_name: {temp_get.lecture_name}\n')
        return JsonResponse(dic) 

'''
{
"lecture_infor": [
        {
            "id": 1,
            "area": "역사와철학",
            "year": "전학년",
            "lecture_number": "U76007101",
            "lecture_name": "21세기현대문화지형이해",
            "type": null,
            "professor": "김영걸",
            "credit": "2",
            "time": "2",
            "lecture_time": "월78",
            "lecture_room": "()",
            "apply_count": "60",
            "limit_count": "60",
            "note": "비대면(학기 전체)",
            "star_point": "4",
            "lecture_review": null
        },
        {
            "id": 2,
            "area": "역사와철학",
            "year": "전학년",
            "lecture_number": "U71826301",
            "lecture_name": "디지털자료로배우는한국사",
            "type": null,
            "professor": "나유정",
            "credit": "2",
            "time": "2",
            "lecture_time": "금56",
            "lecture_room": "()",
            "apply_count": "16",
            "limit_count": "60",
            "note": "비대면(학기 전체)",
            "star_point": "2.57",
            "lecture_review": null
        }
    ]
}
'''