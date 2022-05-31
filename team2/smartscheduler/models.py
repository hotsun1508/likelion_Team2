from django.db import models


class Student(models.Model):
    student_name = models.CharField(default='', max_length=64, verbose_name='학생이름')
    student_number = models.CharField(default='', max_length=64, verbose_name='학번')
    password = models.CharField(max_length=64, verbose_name='비밀번호')

    def __str__(self):
        return self.student_number

    class Meta:
        db_table = 'student'


class Lecture(models.Model):
    area = models.CharField(default='', blank=True, null=True, max_length=64, verbose_name='개설영역')
    year = models.CharField(default='', blank=True, null=True, max_length=4, verbose_name='학년')
    lecture_number = models.CharField(default='', blank=True, null=True, max_length=64, verbose_name='학수번호')
    lecture_name = models.CharField(default='', max_length=64, verbose_name='교과목명')
    type = models.CharField(default='', blank=True, null=True, max_length=64, verbose_name='과목유형')
    professor = models.CharField(default='', blank=True, null=True, max_length=64, verbose_name='담당교수')
    credit = models.CharField(default='', blank=True, null=True, max_length=4, verbose_name='학점')
    time = models.CharField(default='', blank=True, null=True, max_length=4, verbose_name='시간')  # ex. 3
    lecture_time = models.CharField(default='', blank=True, null=True, max_length=64, verbose_name='강의시간') # ex. 월78
    lecture_room = models.CharField(default='', blank=True, null=True, max_length=64, verbose_name='강의실') # ex. (0517)
    apply_count = models.CharField(default='', blank=True, null=True, max_length=64, verbose_name='지원인원수')
    limit_count = models.CharField(default='',blank=True, null=True, max_length=64, verbose_name='제한인원수')
    note = models.CharField(default='', blank=True, null=True, max_length=64, verbose_name='비고') # ex. 비대면(학기전체)
    star_point = models.CharField(default='', blank=True, null=True, max_length=64, verbose_name='별점') # ex. 4.67
    lecture_review = models.CharField(default='', blank=True, null=True, max_length=1024, verbose_name='강의평') # 강의평

    def __str__(self):
        return self.lecture_number

    class Meta:
        db_table = 'lecture'

# 편의상 다 str타입으로 진행함
class Schedule(models.Model):
    id = models.BigAutoField(primary_key=True, null=False) # int64, AutoField와 동일하지만 AutoField보다 int범위가 크다
    student_number = models.CharField(default='', max_length=64, verbose_name='학번')
    lecture_number_list = models.CharField(default='', blank=True, null=True, max_length=2048, verbose_name='학수번호') # 'U4812, U1452, Y9012'로 저장 후 Query에서 split(',') 진행
    # 추출할 정보: lecture_name, professor, lecture_time, lecture_room
    # 교과목명, 담당교수, 강의시간(ex. 화12), 강의실(ex. (0517))

    def __int__(self):
        return self.id

    class Meta:
        db_table = 'schedule'