from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
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

@csrf_exempt
def lecturelist(request):
    if request.method == 'POST':
        star_point = request.POST.get('star_point', None)
        lecture_name = request.POST.get('lecture_name', None)
        print('start_point: ', star_point, ', type of start_point: ', type(star_point))
        print('lecture_name: ', lecture_name, ', type of lecture_name: ', type(lecture_name))
        lectures = Lecture.objects.filter(star_point=star_point, lecture_name=lecture_name) # objects.get으로 하면 Queryset으로 안나와서 iteration할 수 없다
        # <QuerySet [<Lecture: U76007101>, <Lecture: U71826301>, <Lecture: U76100201>, <Lecture: U76216201>, <Lecture: Y21121101>, <Lecture: U72207401>, <Lecture: U51512201>, <Lecture: U51512202>]>

    else:
        lectures = Lecture.objects.all()
    print('lectures: ', lectures)
    return render(request, 'lecturelist.html', {
        'lectures': lectures
    })

def filter(request):
    return render(request, 'filter.html')

def schedule(request):
    schedule = Schedule.objects.filter(student_number='201700295') # user.session.get사용해야함
    # <QuerySet [<Schedule: Schedule object (1)>]>
    lecture_str = schedule.get().lecture_number_list 
    # U76007101,U71826301,U72207401
    lecture_number_list = lecture_str.split(',') # ['U76007101', 'U71826301', 'U72207401']
    lectures = []
    for lecture_number in lecture_number_list:
        lectures.append(Lecture.objects.get(lecture_number=lecture_number))
        # [<Lecture: U76007101>, <Lecture: U71826301>, <Lecture: U72207401>]
        # lectures.append(Lecture.objects.filter(lecture_number=lecture_number))
        # [<QuerySet [<Lecture: U76007101>]>, <QuerySet [<Lecture: U71826301>]>, <QuerySet [<Lecture: U72207401>]>]
        # 보낼 정보 lecture_name, professor, lecture_time, lecture_room
    idx = 0
    dic = {}
    for lecture in lectures:
        dic_temp = {}
        idx += 1
        dic_temp['lecture_number'] = lecture.lecture_number
        dic_temp['lecture_name'] = lecture.lecture_name
        dic_temp['professor'] = lecture.professor
        dic_temp['lecture_time'] = lecture.lecture_time
        dic_temp['lecture_room'] = lecture.lecture_room
        dic[idx] = dic_temp
        # dic.append(dic_temp)

    # return render(request, 'schedule.html', {
    #     'lectures': lectures
    # })
    return JsonResponse(dic) # 아래와 같이 잘 나온다
'''
{
    "1": {
        lecture_number: "U76007101",
        lecture_name: "21세기현대문화지형이해",
        professor: "김영걸",
        lecture_time: "월78",
        lecture_room: "()"
    },
    "2": {
        lecture_number: "U71826301",
        lecture_name: "디지털자료로배우는한국사",
        professor: "나유정",
        lecture_time: "금56",
        lecture_room: "()"
    },
    "3": {
        lecture_number: "U72207401",
        lecture_name: "컴퓨터프로그래밍",
        professor: "김재빈",
        lecture_time: "화12목3",
        lecture_room: "()"
    }
}
'''
# 시간표 겹치는지 check
def check_duplicate(request):
    _str = '월7월8금5금6화1화2목3'
    schedule = Schedule.objects.filter(student_number='201700295') # user.session.get사용해야함
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
    lecture_time_list_input = [] # ['월1', '월2']
    for i in range(0, len(_str), 2):
        han   = _str[i]
        digit = _str[i+1]
        lecture_time_list_input.append(han+digit)
    # ['월78', '금56', '화12목3']
    ## 사용자가 신청한 강의시간을 모두 정리 -> ['월7', '월8' ... ]
    lecture_time_list_output = []
    for lecture in lectures: # 3 -> 2, 5-> 3
        time = lecture.lecture_time # '월78' or '화12목3'
        han = time[0]
        for i in range(0, len(time)):
            digit = ''
            if time[i].isdigit():
                digit = time[i]
                lecture_time_list_output.append(han+digit) # ['월7', '월8' ... ]
            else:
                han = time[i]
    for lecture_time in lecture_time_list_input:
        if lecture_time in lecture_time_list_output:
            return JsonResponse({"alert": "duplicate"}) # 중복된 경우
    return JsonResponse({"ok": "non-duplicate"}) # 중복안된 경우

# 강의 json으로 전달된 lecture_number에 해당하는 학수번호에 해당하는 강의 없애기
# https://velog.io/@ash3767/django-request-json.loads
@csrf_exempt    
def delete(request):
    if request.method == 'POST':
        print('req: ', request)
        data = json.loads(request.body)
        delete_lecture_number = data.get('delete_lecture_number', None)
        # delete_lecture_number = request.POST.get('lecture_number', None)
        print('d_lec_number: ', delete_lecture_number)
        # delete_lecture_number = 'U71826301'
        schedule = Schedule.objects.get(student_number="201700295")
        lecture_str = schedule.lecture_number_list # U76007101,U71826301,U72207401
        lecture_number_list = lecture_str.split(',') # ['U76007101', 'U71826301', 'U72207401']
        lecture_number_list.remove(delete_lecture_number)
        lecture_str_final = ''
        for i in range(len(lecture_number_list)):
            if i != len(lecture_number_list)-1:
                lecture_str_temp = lecture_number_list[i] + ','
                lecture_str_final += lecture_str_temp
            else:
                lecture_str_final += lecture_number_list[i]
        # schedule.lecture_number_list = lecture_str_final
        # schedule.save()
        return JsonResponse({'lecture_number_list' : lecture_str_final})
    else:
        return JsonResponse({'delete()/error msg' : "plz send POST request"})
@csrf_exempt
def delete_add(request):
    if request.method == 'POST':
        print('req: ', request)
        data = json.loads(request.body)
        delete_lecture_number = data.get('delete_lecture_number', None)
        add_lecture_number = data.get('add_lecture_number', None)
        # delete_lecture_number = request.POST.get('lecture_number', None)
        print('d_lec_number: ', delete_lecture_number)
        # delete_lecture_number = 'U71826301'
        schedule = Schedule.objects.get(student_number="201700295")
        lecture_str = schedule.lecture_number_list # U76007101,U71826301,U72207401
        lecture_number_list = lecture_str.split(',') # ['U76007101', 'U71826301', 'U72207401']
        lecture_number_list.remove(delete_lecture_number)
        lecture_str_final = ''
        for i in range(len(lecture_number_list)):
            if i != len(lecture_number_list)-1:
                lecture_str_temp = lecture_number_list[i] + ','
                lecture_str_final += lecture_str_temp
        lecture_str_final += add_lecture_number # 과목 추가하기
        # schedule.lecture_number_list = lecture_str_final
        # schedule.save()
        return JsonResponse({"lecture_number_list" : lecture_str_final})
    else:
        return JsonResponse({'delete_add()/error msg' : "plz send POST request"})
class ListPost(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    print(f'ListPost/queryset: {queryset}, type of queryset: {type(queryset)}')
    # <QuerySet [<Student: 201700295>, <Student: 201800295>]>, type of queryset: <class 'django.db.models.query.QuerySet'>
    serializer_class = PostSerializer

class DetailPost(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    print(f'DetailPost/queryset: {queryset}, type of queryset: {type(queryset)}')

    serializer_class = PostSerializer
def test(request):
    # queryset = Student.objects.all()
    students = Student.objects.all()
    lis_student_number = []
    lis_student_name = []
    lis_password = []
    print('students: ', students)
    for student in students: 
        lis_student_number.append(student.student_number)
        lis_student_name.append(student.student_name)
        lis_password.append(student.password)
    print('lis_student_name: ', lis_student_name)
    dic = {}
    dic['student_name'] = []
    dic['student_number'] = []
    dic['password'] = []
    for i in range(len(lis_student_number)):
        dic['student_name'].append()
    return dic
