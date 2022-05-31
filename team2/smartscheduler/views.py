from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import Lecture, Student, Schedule
# from .serializers import StudentSerializer
from .serializers import PostSerializer
from rest_framework import generics

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
        # lectures = Lecture.objects.filter(star_point >= star_point) 
        # -> [5/21] star_point가 int가 아니라서 그런가? or >= 를 지원하지 않아서 에러뜨는지 모르겠음.
        '''
        TypeError at /lecturelist/
        cannot unpack non-iterable bool object
        '''

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
    print('schedule: ', schedule) # <QuerySet [<Schedule: Schedule object (1)>]>
    lecture_str = schedule.get().lecture_number_list 
    print('lecture_str: ', lecture_str) # U76007101, U71826301, U72207401
    lecture_number_list = lecture_str.split(',') # ['U76007101', 'U71826301', 'U72207401']
    print('lecture_number_list: ', lecture_number_list) 
    lectures = []
    for lecture_number in lecture_number_list:
        lectures.append(Lecture.objects.get(lecture_number=lecture_number))
        # [<Lecture: U76007101>, <Lecture: U71826301>, <Lecture: U72207401>]
        # lectures.append(Lecture.objects.filter(lecture_number=lecture_number))
        # [<QuerySet [<Lecture: U76007101>]>, <QuerySet [<Lecture: U71826301>]>, <QuerySet [<Lecture: U72207401>]>]
    print('lectures: ', lectures) # 
    return render(request, 'schedule.html', {
        'lectures': lectures
    })

class ListPost(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    # serialize_class = StudentSerializer
    serializer_class = PostSerializer

class DetailPost(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    # serializer_class = StudentSerializer
    serializer_class = PostSerializer