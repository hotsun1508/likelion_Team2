# Generated by Django 3.1.2 on 2022-05-16 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Lecture',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('area', models.CharField(default='', max_length=64, null=True, verbose_name='개설영역')),
                ('year', models.CharField(default='', max_length=4, null=True, verbose_name='학년')),
                ('lecture_number', models.CharField(default='', max_length=64, null=True, verbose_name='학수번호')),
                ('lecture_name', models.CharField(default='', max_length=64, verbose_name='교과목명')),
                ('type', models.CharField(default='', max_length=64, null=True, verbose_name='과목유형')),
                ('professor', models.CharField(default='', max_length=64, null=True, verbose_name='담당교수')),
                ('credit', models.CharField(default='', max_length=4, null=True, verbose_name='학점')),
                ('time', models.CharField(default='', max_length=4, null=True, verbose_name='시간')),
                ('lecture_time', models.CharField(default='', max_length=64, null=True, verbose_name='강의시간')),
                ('lecture_room', models.CharField(default='', max_length=64, null=True, verbose_name='강의실')),
                ('apply_count', models.CharField(default='', max_length=64, null=True, verbose_name='지원인원수')),
                ('limit_count', models.CharField(default='', max_length=64, null=True, verbose_name='제한인원수')),
                ('note', models.CharField(default='', max_length=64, null=True, verbose_name='비고')),
                ('star_point', models.CharField(default='', max_length=64, null=True, verbose_name='별점')),
            ],
            options={
                'db_table': 'lecture',
            },
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('student_name', models.CharField(default='', max_length=64, verbose_name='학생이름')),
                ('student_number', models.CharField(default='', max_length=64, verbose_name='학번')),
                ('password', models.CharField(max_length=64, verbose_name='비밀번호')),
            ],
            options={
                'db_table': 'student',
            },
        ),
    ]
