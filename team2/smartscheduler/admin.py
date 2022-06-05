from django.contrib import admin
from smartscheduler.models import Student, Lecture, Schedule

admin.site.register(Student)
admin.site.register(Lecture)
admin.site.register(Schedule)