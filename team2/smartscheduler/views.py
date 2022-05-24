from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import Lecture
from .models import Student

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

def hel():
    return